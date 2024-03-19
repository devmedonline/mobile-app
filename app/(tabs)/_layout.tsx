import { TabScreenHeader } from '@/components/header';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { colors } from '@/constants/colors';
import { cn } from '@/utils/cn';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type TabBarLabelProps = {
  focused: boolean;
  children: string;
};

function TabBarLabel({ children, focused }: TabBarLabelProps) {
  return (
    <Text
      className={cn(
        'text-base text-white',
        focused ? 'font-bold' : 'font-normal'
      )}
    >
      {children}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.primary },
          headerShadowVisible: false,
          header: (props) => (
            <TabScreenHeader title={props.options.title ?? 'Tela sem nome'} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Resumos',
            headerShown: false,
            tabBarLabel: TabBarLabel,
            tabBarActiveTintColor: colors.primaryForeground,
            tabBarInactiveTintColor: colors.mutedForeground,
            tabBarIcon: (props) => <TabBarIcon name="book" {...props} />,
          }}
        />

        <Tabs.Screen
          name="simulations"
          options={{
            title: 'Simulações',
            tabBarLabel: TabBarLabel,
            tabBarActiveTintColor: colors.primaryForeground,
            tabBarInactiveTintColor: colors.mutedForeground,
            tabBarIcon: (props) => <TabBarIcon name="calculator" {...props} />,
          }}
        />

        <Tabs.Screen
          name="quizzes"
          options={{
            title: 'Testes',
            tabBarLabel: TabBarLabel,
            tabBarActiveTintColor: colors.primaryForeground,
            tabBarInactiveTintColor: colors.mutedForeground,
            tabBarIcon: (props) => <TabBarIcon name="question" {...props} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
