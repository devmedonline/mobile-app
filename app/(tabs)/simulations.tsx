import { TabScreenHeader } from '@/components/header';
import { LoadingIndicator } from '@/components/loading-indicator';
import { colors } from '@/constants/colors';
import { useSimulationsSectionsQuery } from '@/hooks/use-simulations-sections-query/use-simulations-sections-query';
import {
  FullPanelSimulationSection,
  SimulationPreview,
  SimulationSection,
} from '@/types/simulation/simulation-section';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Fragment, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import twColors from 'tailwindcss/colors';

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
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-white rounded-lg shadow-md">
        <FontAwesome name="exclamation" size={32} color={twColors.red[400]} />
        <Text className="text-red-400 font-bold text-lg">
          Algo deu errado! {simulationSectionsQuery.error.message}
        </Text>
      </View>
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

function SimulationCardLink({ simulation }: { simulation: SimulationPreview }) {
  return (
    <View className="w-44 h-64 border border-muted bg-card rounded-lg shadow overflow-hidden flex-col">
      <Image
        source={{ uri: simulation.thumbnail }}
        className="w-full aspect-square"
      />
      <View className="px-2 pb-2 py-1 flex-1 justify-between">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-base font-medium text-card-foreground h-12"
        >
          {simulation.title}
        </Text>
        <Text className="text-xs text-muted-foreground">
          {simulation.contentCount} simulações
        </Text>
      </View>
    </View>
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
        <View
          className="rounded-lg overflow-hidden relative"
          style={{ width: width - 8 * 4 }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full aspect-video"
          />

          <View className="absolute bottom-2 left-2 right-2 p-2 rounded-md bg-card-foreground bg-opacity-50">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-card text-lg font-bold"
            >
              {item.title}
            </Text>
            <Text className="text-card text-sm">
              {item.contentCount} simulações
            </Text>
          </View>
        </View>
      )}
      estimatedItemSize={300}
    />
  );
}

function SimplePanelSection({ section }: { section: SimulationSection }) {
  return (
    <View className="flex-1 bg-white rounded-lg shadow-md p-2 justify-between">
      <Text className="text-lg font-bold">{section.title}</Text>

      <FlashList
        horizontal
        ItemSeparatorComponent={() => <View className="w-2" />}
        data={section.simulations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SimulationCardLink simulation={item} />}
        estimatedItemSize={300}
      />
    </View>
  );
}

function GridPanelSection({ section }: { section: SimulationSection }) {
  return (
    <View className="flex-1 bg-white rounded-lg shadow-md p-2 justify-between">
      <Text className="text-lg font-bold">{section.title}</Text>

      <FlashList
        numColumns={3}
        ItemSeparatorComponent={() => <View className="h-2" />}
        data={section.simulations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SimulationCardLink simulation={item} />}
        estimatedItemSize={300}
      />
    </View>
  );
}
