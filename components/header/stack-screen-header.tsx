import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

type StackScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function StackScreenHeader({
  title,
  subtitle,
  children,
}: StackScreenHeaderProps) {
  return (
    <View className="p-4 flex flex-col gap-2 text-brand-50 border border-brand-100 mx-2 my-2 rounded-xl overflow-hidden">
      <LinearGradient
        colors={[colors.brand[300], colors.brand[400], colors.brand[500]]}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      {title && (
        <View className="flex flex-col">
          <Text className="text-2xl font-bold text-brand-50">{title}</Text>

          {subtitle && (
            <Text className="text-lg font-light text-brand-50">{subtitle}</Text>
          )}
        </View>
      )}

      {children}
    </View>
  );
}
