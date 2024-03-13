import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View } from 'react-native';
import { tabBarIconStyles } from './styles';

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean;
};

export function TabBarIcon({ name, focused }: TabBarIconProps) {
  return (
    <View
      style={[
        tabBarIconStyles.tabIconWrapper,
        focused && tabBarIconStyles.tabIconWrapperFocused,
      ]}
    >
      <FontAwesome
        name={name}
        size={18}
        style={[
          tabBarIconStyles.tabIcon,
          focused && tabBarIconStyles.tabIconFocused,
        ]}
      />
    </View>
  );
}
