import { Header } from '@/components/header';
import { Text, View } from 'react-native';

export default function SubModulesScreen(props: any) {
  return (
    <View>
      <Header
        title="Sub Módulos"
        subtitle="Aqui você encontra todos os sub módulos"
      />
      <Text>Nenhum módulo encontrado</Text>
      <Text>{JSON.stringify(props, null, 2)}</Text>
    </View>
  );
}
