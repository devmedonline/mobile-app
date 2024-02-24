import { ModuleEssentialData } from '@/types/module/module-essential-data';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { moduleCardLinkStyles } from './styles';

type ModuleCardLinkProps = { module: ModuleEssentialData };

export function ModuleCardLink({ module }: ModuleCardLinkProps) {
  const updatedAt = module.updatedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/simulations`} style={moduleCardLinkStyles.link}>
      <View style={moduleCardLinkStyles.container}>
        <Image
          source={{ uri: module.thumbnail }}
          style={moduleCardLinkStyles.thumbnail}
        />
        <View style={moduleCardLinkStyles.content}>
          <View>
            <Text style={moduleCardLinkStyles.title}>{module.title}</Text>
            <Text style={moduleCardLinkStyles.submodulesCount}>
              {module.contentCount} submódulos
            </Text>
          </View>

          <View style={moduleCardLinkStyles.authorContainer}>
            <Image
              source={{ uri: module.author.avatar }}
              style={moduleCardLinkStyles.authorAvatar}
            />

            <View>
              <Text style={moduleCardLinkStyles.authorName}>
                Criado por {module.author.name}
              </Text>

              <Text style={moduleCardLinkStyles.updatedAt}>
                Atualizado em {updatedAt}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );
}
