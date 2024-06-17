import { cn } from '@/utils/cn';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import twColors from 'tailwindcss/colors';

type SimulationTypeBadgeProps = {
  type: 'chemical' | 'physical' | 'biological';
  className?: string;
};

export function SimulationTypeBadge({
  type,
  className,
}: SimulationTypeBadgeProps) {
  const typeLabel = {
    chemical: 'Química',
    physical: 'Física',
    biological: 'Biológica',
  };

  const typeToColor = {
    chemical: twColors.red[400],
    physical: twColors.blue[400],
    biological: twColors.green[400],
  };

  const typeIcon = {
    chemical: <MaterialIcons name="science" size={16} color="white" />,
    physical: <MaterialIcons name="bolt" size={16} color="white" />,
    biological: <MaterialIcons name="eco" size={16} color="white" />,
  };

  return (
    <View
      className={cn(
        'rounded-sm rounded-t-lg rounded-r-lg self-start flex-row py-1 px-2 flex items-center justify-center',
        className
      )}
      style={{ backgroundColor: typeToColor[type] }}
    >
      {typeIcon[type]}
      <Text className="text-white text-xs font-bold leading-none h-2.5 pr-2">
        {typeLabel[type].toUpperCase()}
      </Text>
    </View>
  );
}
