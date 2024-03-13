import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const tabBarIconStyles = StyleSheet.create({
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
  tabIconFocused: {
    color: colors.primary,
  },
});
