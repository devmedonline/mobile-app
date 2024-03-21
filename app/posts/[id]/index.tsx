import { SimpleErrorWarningMessage } from '@/components/error-warning-message';
import { LoadingIndicator } from '@/components/loading-indicator';
import { RichTextContentRenderer } from '@/components/rich-text-content-renderer';
import { usePostByIdQuery } from '@/hooks/use-post-by-id-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';

export default function PostScreen() {
  const searchParams = useLocalSearchParams<{ id: string }>();

  const postByIdQuery = usePostByIdQuery({
    id: searchParams.id,
  });

  if (postByIdQuery.isFetching) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-background rounded-lg shadow-md">
        <LoadingIndicator />
      </View>
    );
  }

  if (postByIdQuery.isError) {
    return (
      <SimpleErrorWarningMessage
        message={'Erro ao carregar o conteúdo: ' + postByIdQuery.error.message}
      />
    );
  }

  if (typeof postByIdQuery.data === 'undefined') {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-background rounded-lg shadow-md">
        <Text>Conteúdo não encontrado</Text>
      </View>
    );
  }

  const post = postByIdQuery.data;

  const publishedAt = postByIdQuery.data.createdAt.toLocaleDateString(
    post.locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const modifiedAt = postByIdQuery.data.updatedAt.toLocaleDateString(
    post.locale,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <ScrollView className="flex-1 gap-2">
      <LinearGradient colors={['#FFF', 'transparent']} style={{ height: 6 }} />

      <View className="relative w-full px-2 flex flex-1">
        <Image
          src="https://picsum.photos/seed/696/3000/2000"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />

        <View className="p-2 absolute bg-card shadow-sm bottom-2 left-4 right-4 rounded-md">
          <Text className="text-sm text-foreground">
            Tempo de leitura: {post.readingTime} minutos
          </Text>

          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-2xl font-black text-foreground"
          >
            {post.title}
          </Text>

          <View className="flex flex-row gap-2 items-center">
            <Image src={post.author.avatar} className="w-8 h-8 rounded-full" />

            <Text className="text-sm font-medium text-foreground">
              Publicado em {publishedAt} por {post.author.name}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-2">
        <View className="p-4 bg-card rounded-lg border border-border shadow-sm">
          <RichTextContentRenderer data={post.content} />
        </View>
      </View>

      <View className="p-4">
        <Text className="text-sm text-foreground">
          Última modificação em {modifiedAt}
        </Text>
      </View>

      <View className="p-4 flex flex-row gap-2">
        <Text>Tags:</Text>
        {post.tags.filter(Boolean).map((tag) => (
          <Text
            key={tag}
            className="leading-none text-sm px-2 py-1 flex items-center justify-center bg-brand-300 text-brand-500 rounded-full"
          >
            {tag}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
