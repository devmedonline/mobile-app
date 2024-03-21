import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import twColors from 'tailwindcss/colors';

export function SimpleErrorWarningMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View className="flex-1 justify-center items-center gap-14 my-2 mx-2 px-20 py-10 bg-background rounded-lg shadow-md">
      <View className="flex-1 justify-center items-center gap-10">
        <FontAwesome name="exclamation" size={32} color={twColors.red[400]} />
        <Text className="text-destructive font-bold text-lg">{message}</Text>
      </View>

      {onRetry && (
        <Pressable
          className="bg-destructive rounded-md py-2 px-3"
          onPress={onRetry}
        >
          <Text className="text-destructive-foreground">Tentar novamente</Text>
        </Pressable>
      )}
    </View>
  );
}
