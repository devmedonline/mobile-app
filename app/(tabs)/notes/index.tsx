import { Header } from '@/components/header';
import { ModuleCardLink } from '@/components/module-card-link';
import { colors } from '@/constants/colors';
import { useModulesQuery } from '@/hooks/use-modules-query';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function NotesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const modulesQuery = useModulesQuery();

  if (modulesQuery.isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (modulesQuery.isError) {
    return <Text>Ocorreu um erro</Text>;
  }

  if (typeof modulesQuery.data === 'undefined') {
    return <Text>Nenhum módulo encontrado</Text>;
  }

  const filteredModules = modulesQuery.data.filter((module) =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Header
        title="Módulos"
        subtitle="Aqui você encontra todos os módulos"
        onSearch={setSearchQuery}
      />

      <FlatList
        style={{ paddingHorizontal: 10, marginTop: 10 }}
        data={filteredModules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ModuleCardLink module={item} />}
      />

      {filteredModules.length === 0 && (
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <FontAwesome name="question" size={24} color={colors.primary} />
            <FontAwesome name="question" size={24} color={colors.primary} />
            <FontAwesome name="question" size={24} color={colors.primary} />
          </View>
          <Text>Nenhum módulo encontrado</Text>
        </View>
      )}
    </View>
  );
}
