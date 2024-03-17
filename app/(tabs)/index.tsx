import { TabScreenHeader } from '@/components/header';
import { LoadingIndicator } from '@/components/loading-indicator';
import { PostCategoryCardLink } from '@/components/post-category-card-link';
import { colors } from '@/constants/colors';
import { usePostCategoriesQuery } from '@/hooks/use-post-categories-query';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import twColors from 'tailwindcss/colors';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="flex-1">
      <TabScreenHeader
        title="Módulos"
        subtitle="Aqui você encontra todos os módulos"
        onSearch={setSearchQuery}
      />
      <PostCategoriesSearchList query={searchQuery} />
    </View>
  );
}

function PostCategoriesSearchList({ query }: { query?: string }) {
  const postCategoriesQuery = usePostCategoriesQuery({ query });

  if (postCategoriesQuery.isFetching) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <LoadingIndicator />
      </View>
    );
  }

  if (postCategoriesQuery.isError) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <FontAwesome name="exclamation" size={32} color={twColors.red[400]} />
        <Text className="text-red-400 font-bold text-lg">
          Algo deu errado! {postCategoriesQuery.error.message}
        </Text>
      </View>
    );
  }

  if (postCategoriesQuery.data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <View className="flex flex-row justify-center items-center gap-2">
          <FontAwesome name="question" size={32} color={colors.primary} />
          <FontAwesome name="question" size={32} color={colors.primary} />
          <FontAwesome name="question" size={32} color={colors.primary} />
        </View>
        <Text>Nenhum módulo encontrado</Text>
      </View>
    );
  }

  if (process.env.USE_FLASH_LIST === 'true') {
    return (
      <FlashList
        className="px-1 py-2"
        data={postCategoriesQuery.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Fragment>
            <PostCategoryCardLink postCategory={item} />
            <View className="h-2" />
          </Fragment>
        )}
        estimatedItemSize={188}
      />
    );
  }

  return (
    <ScrollView className="px-1 py-2">
      {postCategoriesQuery.data.map((module) => (
        <Fragment key={module.id}>
          <PostCategoryCardLink postCategory={module} />
          <View className="h-2" />
        </Fragment>
      ))}
    </ScrollView>
  );
}
