import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View } from 'react-native';

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean;
  color: string;
};

export function TabBarIcon({ name, focused, color }: TabBarIconProps) {
  return (
    <View>
      <FontAwesome name={name} size={18} color={color} />
    </View>
  );
}
