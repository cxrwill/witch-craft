import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { TEST_QUESTIONS } from '../../src/data/testQuestions';
import { useTest } from '../../src/theme/TestContext';
import { ParticleBackground } from '../../src/components/ParticleBackground';
import { Icon, IconName } from '../../src/components/Icon';
import { WitchTypeId } from '../../src/data/witchTypes';

const { width: SW } = Dimensions.get('window');

// 12 decorative phase icons for each question
const QUESTION_ICONS: IconName[] = [
  'crescent', 'orb', 'lightning', 'eye', 'crystal', 'flame',
  'sun', 'moon', 'star', 'cat', 'key', 'pentagram',
];

export default function TestQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionIndex = parseInt(id || '1', 10) - 1;
  const question = TEST_QUESTIONS[questionIndex];
  const totalQuestions = TEST_QUESTIONS.length;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const { addScore } = useTest();

  useEffect(() => {
    setSelectedOption(null);
    setIsTransitioning(false);
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

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null || isTransitioning) return;
    setSelectedOption(optionIndex);
    setIsTransitioning(true);

    const option = question.options[optionIndex];
    if (option?.scores) {
      (Object.entries(option.scores) as [WitchTypeId, number][]).forEach(([typeId, score]) => {
        addScore(typeId, score);
      });
    }

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -40, duration: 350, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        if (questionIndex + 1 < totalQuestions) {
          router.push(`/test/${questionIndex + 2}`);
        } else {
          router.push('/test/result');
        }
      }, 80);
    });
  };

  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const questionIcon = QUESTION_ICONS[questionIndex] || 'crescent';

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0618' }}>
      <ParticleBackground color="#C9A84C" density={0.25} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 64, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress section */}
        <View style={{ marginBottom: 40 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Icon name="crescent" size={12} color="#C9A84C" strokeWidth={1.5} />
              <Text style={{ color: '#8B7B9B', fontSize: 11, letterSpacing: 3 }}>
                {String(questionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
              </Text>
            </View>
            <Text style={{ color: '#6B5B7B', fontSize: 11, letterSpacing: 1 }}>
              {Math.round(progress)}%
            </Text>
          </View>

          {/* Ornamental progress bar */}
          <View style={{ height: 2, borderRadius: 1, backgroundColor: 'rgba(201,168,76,0.1)', overflow: 'hidden' }}>
            <Animated.View
              style={{
                height: '100%',
                borderRadius: 1,
                width: `${progress}%`,
                backgroundColor: '#C9A84C',
                shadowColor: '#C9A84C',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
              }}
            />
          </View>

          {/* Phase dots */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 4 }}>
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: i <= questionIndex ? '#C9A84C' : 'rgba(201,168,76,0.15)',
                }}
              />
            ))}
          </View>
        </View>

        {/* Question card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
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
              fontSize: 24,
              textAlign: 'center',
              lineHeight: 36,
              marginBottom: 36,
              paddingHorizontal: 8,
            }}
          >
            {question.question}
          </Text>

          {/* Options */}
          <View style={{ gap: 12 }}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isOther = selectedOption !== null && selectedOption !== index;
              return (
                <Pressable
                  key={index}
                  onPress={() => handleSelect(index)}
                  disabled={selectedOption !== null}
                  style={{
                    borderRadius: 14,
                    padding: 18,
                    borderWidth: 1,
                    opacity: isOther ? 0.3 : 1,
                    backgroundColor: isSelected
                      ? 'rgba(201,168,76,0.08)'
                      : 'rgba(30,17,56,0.35)',
                    borderColor: isSelected
                      ? 'rgba(201,168,76,0.5)'
                      : 'rgba(201,168,76,0.1)',
                    transform: [{ scale: isSelected ? 1.02 : 1 }],
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
                    {/* Option letter */}
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
                      <Text
                        style={{
                          color: isSelected ? '#C9A84C' : '#8B7B9B',
                          fontSize: 12,
                          fontFamily: 'serif',
                        }}
                      >
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 4,
                          color: isSelected ? '#C9A84C' : '#D8D0E8',
                          lineHeight: 22,
                        }}
                      >
                        {option.text}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 18,
                          color: isSelected ? 'rgba(201,168,76,0.6)' : '#6B5B7B',
                        }}
                      >
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* Bottom ornament */}
        <View style={{ alignItems: 'center', marginTop: 32 }}>
          <Icon name="divider" size={60} color="rgba(201,168,76,0.15)" strokeWidth={1} />
        </View>
      </ScrollView>
    </View>
  );
}
