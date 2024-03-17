import { getLocaleName } from '@/constants/locale-mapper';
import { PostPreview } from '@/types/post/post';
import { cn } from '@/utils/cn';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

type PostCardLinkProps = {
  post: PostPreview;
  className?: string;
};

export function PostCardLink({ post, className }: PostCardLinkProps) {
  const updatedAt = post.updatedAt.toLocaleDateString(post.locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/posts/${post.id.toString()}/`} asChild>
      <Pressable
        key={post.id}
        className={cn([
          'p-2 border-t flex flex-row border-gray-200 bg-white shadow-md',
          className,
        ])}
      >
        <Image
          source={{ uri: post.thumbnail }}
          className="w-1/6 aspect-square rounded-lg"
        />

        <View className="w-5/6 pl-2 flex flex-col justify-between">
          <Text
            className="text-xl font-bold"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {post.title}
          </Text>

          <View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Postado por {post.author.name} em {updatedAt}
            </Text>

            <View className="flex items-center gap-2 flex-row">
              <Text
                className="text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Leitura de {post.readingTime.toString().padStart(2, '0')}{' '}
                minutos em {getLocaleName(post.locale)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
