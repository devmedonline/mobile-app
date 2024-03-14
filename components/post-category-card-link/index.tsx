import { getLocaleName } from '@/constants/locale-mapper';
import { PostCategoryEssentialData } from '@/types/post-category/post-category-essential-data';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PostCategoryCardLinkProps = { postCategory: PostCategoryEssentialData };

export function PostCategoryCardLink({
  postCategory,
}: PostCategoryCardLinkProps) {
  const updatedAt = postCategory.updatedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);

  const expanded = useSharedValue(false);

  const onPress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        heightValue.value = measure(listRef)?.height || 0;
      })();
    }

    expanded.value = !expanded.value;
  };

  const progress = useDerivedValue(() => {
    return expanded.value ? withTiming(1) : withTiming(0);
  });

  const heightAnimationStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        progress.value,
        [0, 1],
        [0, heightValue.value],
        Extrapolation.CLAMP
      ),
    };
  });

  const [userProfilePicture, setUserProfilePicture] = useState(
    postCategory.author.avatar
  );

  return (
    <View className="flex-1 gap-2 bg-white rounded-lg shadow-md mb-2">
      <Pressable
        onPress={onPress}
        className="flex-row p-2 bg-white rounded-lg shadow-md"
      >
        <Image
          source={{ uri: postCategory.thumbnail }}
          className="w-1/3 aspect-square rounded-lg"
        />

        <View className="flex-1 justify-between ml-2">
          <View>
            <View className="flex flex-row justify-between">
              <Text
                className="text-2xl font-bold w-5/6"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {postCategory.title}
              </Text>

              <View className="w-10 h-10 rounded border border-gray-100 flex items-center justify-center">
                <AnimatedChevron progress={progress} />
              </View>
            </View>

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
              source={{ uri: userProfilePicture }}
              className="w-14 h-14 rounded-md rounded-bl-sm mr-2"
              onError={(e) => {
                console.log(e);
                setUserProfilePicture(
                  'https://www.lucasrego.tech/_app/immutable/assets/cat.d43d11a3.jpg'
                );
              }}
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

      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            top: 0,
          }}
          ref={listRef}
        >
          {postCategory.posts.map((post) => (
            <Link href={`/posts/${post.id.toString()}/`} asChild>
              <View
                key={post.id}
                className="p-2 border-t flex flex-row border-gray-200 bg-white rounded-b-lg shadow-md"
              >
                <Image
                  source={{ uri: post.thumbnail }}
                  className="w-1/6 aspect-square rounded-lg"
                />

                <View className="ml-2 flex flex-col justify-between">
                  <Text
                    className="text-xl font-bold"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {post.title}
                  </Text>

                  <View>
                    <Text
                      className="text-gray-500"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      Postado por {post.author.name} em{' '}
                      {post.updatedAt.toLocaleDateString(post.locale, {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>

                    <View className="flex items-center gap-2 flex-row">
                      <Text
                        className="text-gray-500"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        Leitura de{' '}
                        {post.readingTime.toString().padStart(2, '0')} minutos
                        em {getLocaleName(post.locale)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Link>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function AnimatedChevron({ progress }: { progress: SharedValue<number> }) {
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * -180}deg` }],
    };
  });

  return (
    <Animated.View style={iconStyle}>
      <MaterialIcons name="expand-more" size={24} color="black" />
    </Animated.View>
  );
}
