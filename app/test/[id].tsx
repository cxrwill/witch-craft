import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, Animated, Easing, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import { TEST_QUESTIONS } from '../../src/data/testQuestions';
import { useTest } from '../../src/theme/TestContext';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { Icon, IconName } from '../../src/components/Icon';
import { WitchTypeId } from '../../src/data/witchTypes';

const { width: SW } = Dimensions.get('window');

const QUESTION_ICONS: IconName[] = [
  'crescent', 'orb', 'lightning', 'eye', 'crystal', 'flame',
  'sun', 'moon', 'star', 'cat', 'key', 'pentagram',
];

// Persist scores across navigation
const SCORE_STORAGE_KEY = '@witch_test_scores';

async function loadScores(): Promise<Record<WitchTypeId, number>> {
  try {
    const raw = await AsyncStorage.getItem(SCORE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {} as Record<WitchTypeId, number>;
  } catch { return {} as Record<WitchTypeId, number>; }
}
function saveScores(scores: Record<WitchTypeId, number>) {
  AsyncStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
}

export default function TestQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionIndex = parseInt(id || '1', 10) - 1;
  const question = TEST_QUESTIONS[questionIndex];
  const totalQuestions = TEST_QUESTIONS.length;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scores, setScores] = useState<Record<WitchTypeId, number>>(() => ({} as Record<WitchTypeId, number>));

  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const { addScore, getResults } = useTest();

  // Load persisted scores
  useEffect(() => {
    (async () => {
      const saved = await loadScores();
      setScores(saved);
      const savedSelection = await AsyncStorage.getItem(`@witch_test_q_${questionIndex}`);
      if (savedSelection !== null) {
        setSelectedOption(parseInt(savedSelection, 10));
      }
    })();
  }, [questionIndex]);

  // Animate in
  useEffect(() => {
    slideAnim.setValue(30);
    fadeAnim.setValue(0);
    glowAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]).start();
  }, [id]);

  if (!question) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0618', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#8B7B9B' }}>问题加载失败</Text>
      </View>
    );
  }

  // Recalculate scores when changing selection
  const handleSelect = useCallback((optionIndex: number) => {
    if (isTransitioning) return;

    // Remove old scores if changing answer
    if (selectedOption !== null && selectedOption !== optionIndex) {
      const oldOption = question.options[selectedOption];
      if (oldOption?.scores) {
        (Object.entries(oldOption.scores) as [WitchTypeId, number][]).forEach(([typeId, score]) => {
          setScores(prev => ({ ...prev, [typeId]: (prev[typeId] || 0) - score }));
        });
      }
      AsyncStorage.removeItem(`@witch_test_q_${questionIndex}`);
    }

    setSelectedOption(optionIndex);
    AsyncStorage.setItem(`@witch_test_q_${questionIndex}`, String(optionIndex));

    // Add new scores
    const option = question.options[optionIndex];
    if (option?.scores) {
      (Object.entries(option.scores) as [WitchTypeId, number][]).forEach(([typeId, score]) => {
        setScores(prev => ({ ...prev, [typeId]: (prev[typeId] || 0) + score }));
        addScore(typeId, score);
      });
    }
    saveScores(scores);
  }, [selectedOption, isTransitioning, question, questionIndex, scores, addScore]);

  const handleNext = () => {
    if (selectedOption === null) return;
    if (isTransitioning) return;
    setIsTransitioning(true);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 40, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      if (questionIndex + 1 < totalQuestions) {
        router.push(`/test/${questionIndex + 2}`);
      } else {
        router.push('/test/result');
      }
    });
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      router.push(`/test/${questionIndex}`);
    }
  };

  const handleJumpTo = (index: number) => {
    router.push(`/test/${index + 1}`);
  };

  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const questionIcon = QUESTION_ICONS[questionIndex] || 'crescent';
  const answeredCount = TEST_QUESTIONS.filter((_, i) =>
    AsyncStorage.getItem(`@witch_test_q_${i}`) !== null
  ).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color="#C9A84C" density={0.25} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress section */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Pressable onPress={handlePrev} disabled={questionIndex === 0} style={{ opacity: questionIndex === 0 ? 0.3 : 1 }}>
                <Icon name="arrow-left" size={16} color="#C9A84C" strokeWidth={1.5} />
              </Pressable>
              <Text style={{ color: '#8B7B9B', fontSize: 12, letterSpacing: 2 }}>
                {String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
              </Text>
              <Pressable onPress={handleNext} disabled={selectedOption === null}>
                <Icon name="arrow-right" size={16} color={selectedOption === null ? '#6B5B7B' : '#C9A84C'} strokeWidth={1.5} />
              </Pressable>
            </View>
            <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 1 }}>
              {answeredCount}/{totalQuestions} 已答
            </Text>
          </View>

          {/* Progress bar */}
          <View style={{ height: 2, borderRadius: 1, backgroundColor: 'rgba(201,168,76,0.1)', overflow: 'hidden', marginBottom: 12 }}>
            <Animated.View
              style={{
                height: '100%',
                borderRadius: 1,
                width: `${progress}%`,
                backgroundColor: '#C9A84C',
              }}
            />
          </View>

          {/* Question dots - clickable */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2 }}>
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const isAnswered = AsyncStorage.getItem(`@witch_test_q_${i}`) !== null;
              const isCurrent = i === questionIndex;
              return (
                <Pressable
                  key={i}
                  onPress={() => handleJumpTo(i)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCurrent ? 'rgba(201,168,76,0.2)' : isAnswered ? 'rgba(201,168,76,0.08)' : 'transparent',
                    borderWidth: 1,
                    borderColor: isCurrent ? '#C9A84C' : isAnswered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)',
                  }}
                >
                  <Text style={{
                    color: isCurrent ? '#C9A84C' : isAnswered ? 'rgba(201,168,76,0.7)' : '#6B5B7B',
                    fontSize: 10,
                    fontFamily: 'serif',
                  }}>
                    {i + 1}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Question card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Question emblem */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Animated.View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                borderWidth: 1,
                borderColor: 'rgba(201,168,76,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: glowAnim,
              }}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: 'rgba(201,168,76,0.05)',
                  opacity: glowAnim,
                }}
              />
              <Icon name={questionIcon} size={36} color="#C9A84C" strokeWidth={1.2} />
            </Animated.View>
          </View>

          {/* Question text */}
          <Text
            style={{
              color: '#E0D8F0',
              fontFamily: 'serif',
              fontSize: 22,
              textAlign: 'center',
              lineHeight: 34,
              marginBottom: 32,
              paddingHorizontal: 8,
            }}
          >
            {question.question}
          </Text>

          {/* Options */}
          <View style={{ gap: 12 }}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => handleSelect(index)}
                  style={{
                    borderRadius: 14,
                    padding: 18,
                    borderWidth: 1,
                    backgroundColor: isSelected
                      ? 'rgba(201,168,76,0.1)'
                      : 'rgba(30,17,56,0.35)',
                    borderColor: isSelected
                      ? '#C9A84C'
                      : 'rgba(201,168,76,0.15)',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        borderWidth: 1,
                        borderColor: isSelected ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 2,
                      }}
                    >
                      <Text style={{ color: isSelected ? '#C9A84C' : '#8B7B9B', fontSize: 12, fontFamily: 'serif' }}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, marginBottom: 4, color: isSelected ? '#C9A84C' : '#D8D0E8', lineHeight: 22 }}>
                        {option.text}
                      </Text>
                      <Text style={{ fontSize: 12, lineHeight: 18, color: isSelected ? 'rgba(201,168,76,0.6)' : '#6B5B7B' }}>
                        {option.description}
                      </Text>
                    </View>
                    {isSelected && (
                      <Icon name="check" size={18} color="#C9A84C" strokeWidth={2} />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* Bottom navigation */}
        <View style={{ marginTop: 32, gap: 12 }}>
          <Pressable
            onPress={handlePrev}
            disabled={questionIndex === 0}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingVertical: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: questionIndex === 0 ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.3)',
              backgroundColor: questionIndex === 0 ? 'transparent' : 'rgba(201,168,76,0.05)',
              opacity: questionIndex === 0 ? 0.4 : 1,
            })}
          >
            <Icon name="arrow-left" size={14} color="#C9A84C" strokeWidth={1.5} />
            <Text style={{ color: '#C9A84C', fontSize: 14, fontFamily: 'serif', letterSpacing: 2 }}>上一题</Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            disabled={selectedOption === null}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingVertical: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selectedOption === null ? 'rgba(201,168,76,0.15)' : '#C9A84C',
              backgroundColor: selectedOption === null ? 'transparent' : 'rgba(201,168,76,0.08)',
              opacity: selectedOption === null ? 0.5 : 1,
            })}
          >
            <Text style={{ color: '#C9A84C', fontSize: 14, fontFamily: 'serif', letterSpacing: 2 }}>
              {questionIndex === totalQuestions - 1 ? '查看结果' : '下一题'}
            </Text>
            <Icon name="arrow-right" size={14} color="#C9A84C" strokeWidth={1.5} />
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Icon name="divider" size={60} color="rgba(201,168,76,0.15)" strokeWidth={1} />
        </View>
      </ScrollView>
    </View>
  );
}
