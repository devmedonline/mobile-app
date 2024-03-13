import { Header } from '@/components/header';
import { TabBarIcon } from '@/components/tab-bar-icon';
import { colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type TabBarLabelProps = {
  children: React.ReactNode;
};

function TabBarLabel(props: TabBarLabelProps) {
  return <Text style={styles.tabBarLabel}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    height: 60,
  },
  tabItem: {
    paddingVertical: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    color: colors.primaryForeground,
  },
});

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          headerShadowVisible: false,
          header(props) {
            return <Header title={props.options.title ?? 'Tela sem nome'} />;
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Resumos',
            headerShown: false,
            tabBarItemStyle: styles.tabItem,
            tabBarLabel: TabBarLabel,
            tabBarIcon: (props) => <TabBarIcon name="book" {...props} />,
          }}
        />

        <Tabs.Screen
          name="simulations/index"
          options={{
            title: 'Simulações',
            tabBarItemStyle: styles.tabItem,
            tabBarLabel: TabBarLabel,
            tabBarIcon: (props) => <TabBarIcon name="calculator" {...props} />,
          }}
        />

        <Tabs.Screen
          name="quizzes/index"
          options={{
            title: 'Testes',
            tabBarItemStyle: styles.tabItem,
            tabBarLabel: TabBarLabel,
            tabBarIcon: (props) => <TabBarIcon name="question" {...props} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
