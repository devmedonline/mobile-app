import { StackScreenHeader } from '@/components/header';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import '../assets/css/global.css';
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
    PoppinsSemiBold: Poppins_600SemiBold,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName="(tabs)/index/">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="posts/[id]/index"
          options={{
            headerShown: true,
            animation: 'slide_from_right',
            header: (props) => (
              <StackScreenHeader>
                <View className="flex flex-row items-center gap-2">
                  {props.back && (
                    <Pressable
                      accessibilityLabel="Voltar para a lista de módulos"
                      className="flex flex-row items-center gap-2 active:opacity-50 focus:outline-none"
                      onPress={props.navigation.goBack}
                    >
                      <FontAwesome
                        name="chevron-left"
                        size={20}
                        color="white"
                        onPress={props.navigation.goBack}
                      />
                      <Text className="text-primary-foreground text-lg">
                        Voltar
                      </Text>
                    </Pressable>
                  )}
                </View>
              </StackScreenHeader>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
