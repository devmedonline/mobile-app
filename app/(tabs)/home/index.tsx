import { Header } from '@/components/header';
import { LoadingIndicator } from '@/components/loading-indicator';
import { PostCategoryCardLink } from '@/components/post-category-card-link';
import { colors } from '@/constants/colors';
import { usePostCategoriesQuery } from '@/hooks/use-post-categories-query';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const postCategoriesQuery = usePostCategoriesQuery();

  if (postCategoriesQuery.isLoading) {
    return <LoadingIndicator />;
  }

  if (postCategoriesQuery.isError) {
    return <Text>Ocorreu um erro</Text>;
  }

  if (typeof postCategoriesQuery.data === 'undefined') {
    return <Text>Nenhum módulo encontrado</Text>;
  }

  const filteredPostCategories = postCategoriesQuery.data.filter((module) =>
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
        data={filteredPostCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCategoryCardLink postCategory={item} />}
      />

      {filteredPostCategories.length === 0 && (
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
