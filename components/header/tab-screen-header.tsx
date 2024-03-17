import { colors } from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type TabScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
};

export function TabScreenHeader({
  title,
  subtitle,
  onSearch,
}: TabScreenHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <View className="p-4 flex flex-col gap-2 text-brand-50 border border-brand-100 mx-2 my-2 rounded-xl overflow-hidden">
      <LinearGradient
        colors={[colors.brand[300], colors.brand[400], colors.brand[500]]}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <View className="flex flex-col">
        <Text className="text-2xl font-bold text-brand-50">{title}</Text>

        {subtitle && (
          <Text className="text-lg font-light text-brand-50">{subtitle}</Text>
        )}
      </View>

      {onSearch && (
        <View className="flex flex-row items-center bg-secondary p-1 h-14 border border-brand-100 rounded-lg overflow-hidden">
          <TextInput
            className="flex-1 p-2 text-lg text-brand-700 bg-transparent"
            placeholder="Busque por um módulo"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity
            className="p-2 bg-brand-400 rounded-md h-full aspect-square flex items-center justify-center"
            accessibilityLabel="Buscar por um módulo"
            activeOpacity={0.75}
            onPress={() => {
              if (onSearch) {
                onSearch(searchQuery);
              }
            }}
          >
            <FontAwesome name="search" size={20} color={colors.brand[50]} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
