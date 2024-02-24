import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: colors.primary,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  title: {
    fontSize: 24,
    color: colors.primaryForeground,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryForeground,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primaryForeground,
    borderRadius: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: colors.primaryForeground,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    color: colors.primary,
  },
});
