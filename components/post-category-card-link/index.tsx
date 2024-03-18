import { PostCategoryEssentialData } from '@/types/post-category/post-category-essential-data';
import { cn } from '@/utils/cn';
import { formatDateToRelativeTime } from '@/utils/date-format';
import { MaterialIcons } from '@expo/vector-icons';
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
import { PostCardLink } from '../post-card-link';

type PostCategoryCardLinkProps = { postCategory: PostCategoryEssentialData };

export function PostCategoryCardLink({
  postCategory,
}: PostCategoryCardLinkProps) {
  const updatedAt = formatDateToRelativeTime(postCategory.updatedAt);

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
      overflow: 'hidden',
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
    <View className="flex-1 rounded-lg shadow-md overflow-hidden min-h-[180px]">
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
                Atualizado {updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          style={{ position: 'absolute', width: '100%', top: 0 }}
          ref={listRef}
        >
          {postCategory.posts.map((post, idx, arr) => {
            const isLast = idx === arr.length - 1;
            const isFirst = idx === 0;

            return (
              <PostCardLink
                key={post.id}
                post={post}
                className={cn(
                  isFirst && 'rounded-t-lg mt-3',
                  isLast && 'rounded-b-lg mb-0'
                )}
              />
            );
          })}
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
