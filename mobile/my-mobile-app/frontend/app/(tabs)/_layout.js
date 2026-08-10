import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones já inclusa no Expo

export default function LayoutAbas() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#003366', // Cor do ícone quando selecionado
        tabBarInactiveTintColor: '#cccccc', // Cor quando inativo
        headerStyle: { backgroundColor: '#003366' }, // Fundo do cabeçalho
        headerTintColor: '#ffffff', // Cor do texto do cabeçalho
      }}
    >
      {/* Aba 1: Tela Principal / Dashboard */}
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }} 
      />
      
      {/* Aba 2: Tela de Status / Perfil */}
      <Tabs.Screen 
        name="status" 
        options={{
          title: 'Meu Status',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={24} color={color} />,
        }} 
      />

      {/* Aba 3: Tela de Configurações (Logout) */}
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