import { PostCategoryEssentialData } from '@/types/post-category/post-category-essential-data';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { postCategoryCardLinkStyles } from './styles';

type PostCategoryCardLinkProps = { postCategory: PostCategoryEssentialData };

export function PostCategoryCardLink({
  postCategory,
}: PostCategoryCardLinkProps) {
  const updatedAt = postCategory.updatedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/post/${postCategory.id.toString()}`} asChild>
      <Pressable style={postCategoryCardLinkStyles.container}>
        <Image
          source={{ uri: postCategory.thumbnail }}
          style={postCategoryCardLinkStyles.thumbnail}
        />
        <View style={postCategoryCardLinkStyles.content}>
          <View>
            <Text style={postCategoryCardLinkStyles.title}>
              {postCategory.title}
            </Text>
            <Text style={postCategoryCardLinkStyles.submodulesCount}>
              {postCategory.contentCount} submódulos
            </Text>
          </View>

          <View style={postCategoryCardLinkStyles.authorContainer}>
            <Image
              source={{ uri: postCategory.author.avatar }}
              style={postCategoryCardLinkStyles.authorAvatar}
            />

            <View>
              <Text style={postCategoryCardLinkStyles.authorName}>
                Criado por {postCategory.author.name}
              </Text>

              <Text style={postCategoryCardLinkStyles.updatedAt}>
                Atualizado em {updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
