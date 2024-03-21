import { SimpleErrorWarningMessage } from '@/components/error-warning-message';
import { LoadingIndicator } from '@/components/loading-indicator';
import { RichTextContentRenderer } from '@/components/rich-text-content-renderer';
import { SimulationTypeBadge } from '@/components/simulation-type-badge';
import { useSimulationByIdQuery } from '@/hooks/use-simulation-by-id-query';
import { SimulationPhase } from '@/types/simulation/simulation';
import { cn } from '@/utils/cn';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function SimulationScreen() {
  const searchParams = useLocalSearchParams<{ id: string }>();

  const simulationByIdQuery = useSimulationByIdQuery({
    id: searchParams.id,
  });

  const [currentPhase, setCurrentPhase] = useState<number>(() => {
    return simulationByIdQuery.data?.initialPhase || 0;
  });

  if (simulationByIdQuery.isFetching) {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-background rounded-lg shadow-md">
        <LoadingIndicator />
      </View>
    );
  }

  if (simulationByIdQuery.isError) {
    return (
      <SimpleErrorWarningMessage
        onRetry={simulationByIdQuery.refetch}
        message={
          'Erro ao carregar o conteúdo: ' + simulationByIdQuery.error.message
        }
      />
    );
  }

  if (typeof simulationByIdQuery.data === 'undefined') {
    return (
      <View className="flex-1 justify-center items-center gap-10 my-2 mx-2 px-20 py-10 bg-background rounded-lg shadow-md">
        <Text>Conteúdo não encontrado</Text>
      </View>
    );
  }

  const simulation = simulationByIdQuery.data;

  const publishedAt = simulationByIdQuery.data.createdAt.toLocaleDateString(
    'pt-BR',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const modifiedAt = simulationByIdQuery.data.updatedAt.toLocaleDateString(
    'pt-BR',
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

        <SimulationTypeBadge
          className="rounded-md top-2 right-4 absolute"
          type={simulation.type}
        />

        <View className="p-2 absolute bg-card shadow-sm bottom-2 left-4 right-4 rounded-md">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-2xl font-black text-foreground"
          >
            {simulation.title}
          </Text>

          <View className="flex flex-row gap-2 items-center">
            <Image
              src={simulation.author.avatar}
              className="w-8 h-8 rounded-full"
            />

            <Text className="text-sm font-medium text-foreground">
              Publicado em {publishedAt} por {simulation.author.name}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-2 flex-1 gap-2 flex-col">
        <View className="flex flex-row gap-2 items-center">
          <Pressable
            className={cn(
              'rounded-lg p-2 bg-brand-500 shadow-sm border border-brand-500',
              currentPhase === 0 && 'bg-muted border-muted-foreground/50'
            )}
            onPress={() =>
              setCurrentPhase((prev) => {
                const value = prev - 1;
                return value < 0 ? 0 : value;
              })
            }
          >
            <Text
              className={cn(
                'text-brand-50 font-bold min-w-36 text-center',
                currentPhase === 0 && 'text-muted-foreground'
              )}
            >
              Retroceder
            </Text>
          </Pressable>

          <View className="flex-1">
            <Text className="text-foreground text-center font-bold">
              {currentPhase + 1} de {simulation.phases.length}
            </Text>
          </View>

          <Pressable
            className={cn(
              'rounded-lg p-2 bg-brand-500 shadow-sm border border-brand-500',
              currentPhase === simulation.phases.length - 1 &&
                'bg-muted border-muted-foreground/50'
            )}
            onPress={() =>
              setCurrentPhase((prev) => {
                const value = prev + 1;
                return value >= simulation.phases.length
                  ? simulation.phases.length - 1
                  : value;
              })
            }
          >
            <Text
              className={cn(
                'text-brand-50 font-bold min-w-36 text-center',
                currentPhase === simulation.phases.length - 1 &&
                  'text-muted-foreground'
              )}
            >
              Avançar
            </Text>
          </Pressable>
        </View>
        <SimulationPhaseView show={currentPhase} phases={simulation.phases} />
      </View>

      <View className="p-4">
        <Text className="text-sm text-foreground">
          Última modificação em {modifiedAt}
        </Text>
      </View>
    </ScrollView>
  );
}

function SimulationPhaseView({
  phases,
  show,
}: {
  show: number;
  phases: SimulationPhase[];
}) {
  const phase = phases[show];

  return (
    <>
      <View className="p-4 bg-card rounded-lg border border-border shadow-sm">
        <Text className="text-xl font-bold text-foreground mb-2">
          {phase.title}
        </Text>
        <Text className="text-sm text-foreground">{phase.description}</Text>

        <View className="h-2 w-full bg-muted rounded my-4" />

        <RichTextContentRenderer data={phase.content} />
      </View>
    </>
  );
}
