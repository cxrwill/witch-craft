import React, { createContext, useContext, useState, useCallback } from 'react';
import { WitchTypeId, WITCH_TYPES } from '../data/witchTypes';

type ScoreMap = Partial<Record<WitchTypeId, number>>;

interface TestContextType {
  scores: ScoreMap;
  addScore: (typeId: WitchTypeId, score: number) => void;
  getResults: () => WitchTypeId;
  resetScores: () => void;
}

const TestContext = createContext<TestContextType>({
  scores: {},
  addScore: () => {},
  getResults: () => 'green',
  resetScores: () => {},
});

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [scores, setScores] = useState<ScoreMap>({});

  const addScore = useCallback((typeId: WitchTypeId, score: number) => {
    setScores((prev) => ({
      ...prev,
      [typeId]: (prev[typeId] || 0) + score,
    }));
  }, []);

  const getResults = useCallback((): WitchTypeId => {
    let maxScore = 0;
    let winner: WitchTypeId = 'green';
    (Object.entries(scores) as [WitchTypeId, number][]).forEach(([typeId, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winner = typeId;
      }
    });
    return winner;
  }, [scores]);

  const resetScores = useCallback(() => {
    setScores({});
  }, []);

  return (
    <TestContext.Provider value={{ scores, addScore, getResults, resetScores }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  return useContext(TestContext);
}
