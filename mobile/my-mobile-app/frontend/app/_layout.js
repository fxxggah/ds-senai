import { Stack } from 'expo-router';

// =========================================================
// LAYOUT DE NAVEGAÇÃO PRINCIPAL (STACK NAVIGATOR)
// Gerencia a pilha de telas da raiz do aplicativo
// =========================================================

export default function LayoutRaiz() {
  return (
    <Stack>
      {/* Tela 1: Login / Autenticação (Ponto de entrada do App) */}
      <Stack.Screen name="index" options={{ title: 'InfoEstoque - Login' }} />

      {/* Tela 2: Cadastro de Novos Produtos no Estoque */}
      <Stack.Screen name="produto" options={{ title: 'Nova Mercadoria' }} />
      
      {/* Tela 3: Cadastro de Novos Integrantes da Equipe */}
      <Stack.Screen name="cadastro" options={{ title: 'Cadastrar Equipe' }} />

      {/* Tela 4: Solicitação de Suporte / Recuperação de Senha */}
      <Stack.Screen name="suporte" options={{ title: 'suporte Senha' }} />
    </Stack>
  );
}