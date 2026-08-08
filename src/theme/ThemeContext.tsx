import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WitchTypeId, WITCH_TYPES, WitchType } from '../data/witchTypes';

const WITCH_TYPE_KEY = '@witch_type';

interface ThemeContextType {
  witchTypeId: WitchTypeId | null;
  witchType: WitchType | null;
  setWitchType: (id: WitchTypeId) => Promise<void>;
  isTestCompleted: boolean;
  completeTest: (typeId: WitchTypeId) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  witchTypeId: null,
  witchType: null,
  setWitchType: async () => {},
  isTestCompleted: false,
  completeTest: async () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [witchTypeId, setWitchTypeId] = useState<WitchTypeId | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(WITCH_TYPE_KEY).then((stored) => {
      if (stored && stored in WITCH_TYPES) {
        setWitchTypeId(stored as WitchTypeId);
      }
    });
  }, []);

  const setWitchType = useCallback(async (id: WitchTypeId) => {
    setWitchTypeId(id);
    await AsyncStorage.setItem(WITCH_TYPE_KEY, id);
  }, []);

  const completeTest = useCallback(async (typeId: WitchTypeId) => {
    await setWitchType(typeId);
  }, [setWitchType]);

  const witchType = witchTypeId ? WITCH_TYPES[witchTypeId] : null;

  return (
    <ThemeContext.Provider
      value={{
        witchTypeId,
        witchType,
        setWitchType,
        isTestCompleted: witchTypeId !== null,
        completeTest,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
