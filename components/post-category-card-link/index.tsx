import { PostCategoryEssentialData } from '@/types/post-category/post-category-essential-data';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

type PostCategoryCardLinkProps = { postCategory: PostCategoryEssentialData };

export function PostCategoryCardLink({
  postCategory,
}: PostCategoryCardLinkProps) {
  const updatedAt = postCategory.updatedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handlePress = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpanded(open);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  const expandedView = (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      <Text className="p-2 px-4">Conteúdo</Text>

      <FlatList
        data={postCategory.posts}
        renderItem={({ item }) => (
          <Link href={`/posts/${item.id.toString()}/`} className="p-2 px-4">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-gray-500">
              {item.readingTime} min de leitura
            </Text>
          </Link>
        )}
      />
    </Animated.View>
  );

  return (
    <View className="flex-1 gap-2 bg-white rounded-lg shadow-md mb-2">
      <Pressable
        onPress={handlePress}
        className="flex-row p-2 bg-white rounded-lg shadow-md mb-2"
      >
        <Image
          source={{ uri: postCategory.thumbnail }}
          className="w-1/3 aspect-square rounded-lg"
        />

        <View className="flex-1 justify-between ml-2">
          <View>
            <Text
              className="text-2xl font-bold"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {postCategory.title}
            </Text>

            <Text
              className="text-gray-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {postCategory.contentCount} submódulos
            </Text>
          </View>

          <View className="flex-row items-center">
            <Image
              source={{ uri: postCategory.author.avatar }}
              className="w-14 h-14 rounded-md rounded-bl-sm mr-2"
            />

            <View>
              <Text
                className="text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Criado por {postCategory.author.name}
              </Text>

              <Text
                className="text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Atualizado em {updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {expanded && expandedView}
    </View>
  );
}
