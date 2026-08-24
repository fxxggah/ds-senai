import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// =========================================================
// LAYOUT DE NAVEGAÇÃO POR ABAS (TAB BAR)
// Configura a barra inferior de navegação do aplicativo Expo
// =========================================================

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        // Estilização global da Tab Bar e dos Cabeçalhos
        tabBarActiveTintColor: '#003366',   // Cor dos ícones e textos ativos
        tabBarInactiveTintColor: '#cccccc', // Cor dos ícones e textos inativos
        headerStyle: { backgroundColor: '#003366' }, // Cor de fundo do topo da tela
        headerTintColor: '#ffffff',         // Cor do título e botões no topo
      }}
    >
      {/* 
        =========================================================
        ABA 1: HOME / DASHBOARD
        Mapeia o arquivo: app/(tabs)/home.js
        =========================================================
      */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />

      {/* 
        =========================================================
        ABA 2: STATUS / PERFIL DO OPERADOR
        Mapeia o arquivo: app/(tabs)/status.js
        =========================================================
      */}
      <Tabs.Screen
        name="status"
        options={{
          title: 'Meu Status',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={24} color={color} />,
        }}
      />

      {/* NOVA ABA: MAPA E LOCALIZAÇÃO */}
      <Tabs.Screen
        name="localizacao"
        options={{
          title: 'Posto de Trabalho',
          tabBarIcon: ({ color, size }) => <Ionicons name="location" color={color} size={size} />
        }}
      />


      {/* 
        =========================================================
        ABA 3: CONFIGURAÇÕES / AJUSTES E LOGOUT
        Mapeia o arquivo: app/(tabs)/config.js
        =========================================================
      */}
      <Tabs.Screen
        name="config"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}