import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useTheme } from '../../src/theme/ThemeContext';
import { Icon, IconName } from '../../src/components/Icon';

function TabIcon({ icon, focused, color }: { icon: IconName; focused: boolean; color: any }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
      <Icon name={icon} size={24} color={String(color)} strokeWidth={focused ? 1.5 : 1} fill={focused} />
    </View>
  );
}

export default function TabLayout() {
  const { witchType } = useTheme();
  const palette = witchType?.palette;
  const accent = palette?.accent || '#C9A84C';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0618',
          borderTopColor: 'rgba(201,168,76,0.1)',
          borderTopWidth: 1,
          height: 76,
          paddingBottom: 16,
          paddingTop: 6,
        },
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: '#6B5B7B',
        tabBarLabelStyle: {
          fontFamily: 'serif',
          fontSize: 10,
          letterSpacing: 2,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '秘境',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="altar"
        options={{
          title: '祭坛',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="candle" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tarot"
        options={{
          title: '塔罗',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="cards" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: '手账',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="book" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
