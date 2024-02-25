import { Header } from '@/components/header';
import { colors } from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean;
};

function TabBarIcon({ name, focused }: TabBarIconProps) {
  return (
    <View
      style={[styles.tabIconWrapper, focused && styles.tabIconWrapperFocused]}
    >
      <FontAwesome
        name={name}
        size={18}
        style={[styles.tabIcon, focused && styles.TabIconFocused]}
      />
    </View>
  );
}

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
  tabIconWrapper: {
    marginBottom: -3,
    width: 30,
    height: 30,
    backgroundColor: colors.primaryForeground + '33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 14,
  },
  tabIconWrapperFocused: {
    backgroundColor: colors.primaryForeground,
  },
  tabIcon: {
    color: colors.primaryForeground,
  },
  TabIconFocused: {
    color: colors.primary,
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
          name="notes/index"
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
