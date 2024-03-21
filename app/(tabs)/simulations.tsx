import { SimpleErrorWarningMessage } from '@/components/error-warning-message';
import { TabScreenHeader } from '@/components/header';
import { LoadingIndicator } from '@/components/loading-indicator';
import { SimulationTypeBadge } from '@/components/simulation-type-badge';
import { colors } from '@/constants/colors';
import { useSimulationsSectionsQuery } from '@/hooks/use-simulations-sections-query/use-simulations-sections-query';
import { SimulationPreview } from '@/types/simulation/simulation';
import {
  FullPanelSimulationSection,
  SimulationSection,
} from '@/types/simulation/simulation-section';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Fragment, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

export default function SimulationsScreen() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  return (
    <ScrollView className="flex-1">
      <TabScreenHeader title="Simulações" onSearch={setSearchQuery} />
      <SimulationsSectionList query={searchQuery} />
    </ScrollView>
  );
}

function SimulationsSectionList({ query }: { query?: string }) {
  const simulationSectionsQuery = useSimulationsSectionsQuery({ query });

  if (simulationSectionsQuery.isFetching) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <LoadingIndicator />
      </View>
    );
  }

  if (simulationSectionsQuery.isError) {
    return (
      <SimpleErrorWarningMessage
        onRetry={simulationSectionsQuery.refetch}
        message={
          'Erro ao carregar simulações: ' +
          simulationSectionsQuery.error.message
        }
      />
    );
  }

  if (simulationSectionsQuery.data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <View className="flex flex-row justify-center items-center gap-2">
          <FontAwesome name="question" size={32} color={colors.primary} />
          <FontAwesome name="question" size={32} color={colors.primary} />
          <FontAwesome name="question" size={32} color={colors.primary} />
        </View>
        <Text>Nenhuma seção de simulações encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView className="px-1 py-2">
      {simulationSectionsQuery.data.map((section) => (
        <Fragment key={section.id}>
          <SimulationsSection section={section} />
          <View className="h-2" />
        </Fragment>
      ))}
    </ScrollView>
  );
}

function SimulationsSection({ section }: { section: SimulationSection }) {
  switch (section.type) {
    case 'full-panel':
      return (
        <SimulationsSectionContainer>
          <FullPanelSection section={section} />
        </SimulationsSectionContainer>
      );
    case 'simple-panel':
      return (
        <SimulationsSectionContainer>
          <SimplePanelSection section={section} />
        </SimulationsSectionContainer>
      );
    case 'grid-panel':
      return (
        <SimulationsSectionContainer>
          <GridPanelSection section={section} />
        </SimulationsSectionContainer>
      );
  }
}

function SimulationsSectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View className="flex-1 w-full min-h-80 px-2">{children}</View>;
}

const SimulationCardLinkWidth = 182;
const SimulationCardLinkHeight = 252;
function SimulationCardLink({ simulation }: { simulation: SimulationPreview }) {
  return (
    <Link asChild href={`/simulations/${simulation.id.toString()}/`}>
      <Pressable className="w-52 h-72 border border-muted bg-card rounded-lg shadow overflow-hidden flex-col">
        <Image
          source={{ uri: simulation.thumbnail }}
          className="w-full aspect-square"
        />

        <View className="px-2 pb-2 py-1 flex-1 justify-between">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-base leading-tight font-medium text-card-foreground h-10"
          >
            {simulation.title}
          </Text>

          <View className="flex-1">
            <SimulationTypeBadge type={simulation.type} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

function FullPanelSection({
  section,
}: {
  section: FullPanelSimulationSection;
}) {
  const { width } = useWindowDimensions();
  return (
    <FlashList
      horizontal
      ItemSeparatorComponent={() => <View className="w-2" />}
      data={section.simulations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link asChild href={`/simulations/${item.id.toString()}/`}>
          <Pressable
            className="rounded-lg overflow-hidden relative"
            style={{ width: width - 8 * 4 }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              className="w-full aspect-video"
            />

            <View className="absolute bottom-2 left-2 right-2 p-2 rounded-md bg-card">
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-card-foreground text-lg font-bold"
              >
                {item.title}
              </Text>
              <SimulationTypeBadge type={item.type} />
            </View>
          </Pressable>
        </Link>
      )}
      estimatedItemSize={width - 8 * 4}
    />
  );
}

function SimplePanelSection({ section }: { section: SimulationSection }) {
  return (
    <View className="flex-1 bg-white rounded-lg shadow-md pt-2 px-3 pb-3 gap-3 justify-between">
      <Text className="text-lg font-bold">{section.title}</Text>

      <FlashList
        horizontal
        ItemSeparatorComponent={() => <View className="w-2" />}
        data={section.simulations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SimulationCardLink simulation={item} />}
        estimatedItemSize={SimulationCardLinkWidth}
      />
    </View>
  );
}

function GridPanelSection({ section }: { section: SimulationSection }) {
  return (
    <View className="flex-1 bg-white rounded-lg shadow-md pt-2 px-3 pb-3 gap-3 justify-between">
      <Text className="text-lg font-bold">{section.title}</Text>

      <FlashList
        numColumns={3}
        ItemSeparatorComponent={() => <View className="h-2" />}
        data={section.simulations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SimulationCardLink simulation={item} />}
        estimatedItemSize={SimulationCardLinkHeight}
      />
    </View>
  );
}
