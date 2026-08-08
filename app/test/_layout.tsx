import { Stack } from 'expo-router';
import { TestProvider } from '../../src/theme/TestContext';

export default function TestLayout() {
  return (
    <TestProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="result" />
      </Stack>
    </TestProvider>
  );
}
