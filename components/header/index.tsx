import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { headerStyles } from './styles';

type HeaderProps = {
  title: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
};

export function Header({ title, subtitle, onSearch }: HeaderProps) {
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
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>{title}</Text>

      {subtitle && <Text style={headerStyles.subtitle}>{subtitle}</Text>}

      {onSearch && (
        <View style={headerStyles.searchContainer}>
          <TextInput
            style={headerStyles.searchInput}
            placeholder="Busque por um módulo"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity
            style={headerStyles.searchButton}
            activeOpacity={0.75}
            onPress={() => {
              if (onSearch) {
                onSearch(searchQuery);
              }
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              style={headerStyles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
