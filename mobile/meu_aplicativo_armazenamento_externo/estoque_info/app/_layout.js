import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'InfoEstoque - Login' }} />
      <Stack.Screen name="produto" options={{ title: 'Nova Mercadoria' }} />
      
      {/* Adicione estas duas linhas: */}
      <Stack.Screen name="cadastro" options={{ title: 'Cadastrar Equipe' }} />
      <Stack.Screen name="recuperar" options={{ title: 'Recuperar Senha' }} />
    </Stack>
  );
}