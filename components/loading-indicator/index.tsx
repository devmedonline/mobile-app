import { colors } from '@/constants/colors';
import { ActivityIndicator, View } from 'react-native';

export function LoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
