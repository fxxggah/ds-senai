import { Tabs } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F3F4F6", 
        tabBarInactiveTintColor: "#6B7280", 
        
        tabBarStyle: {
          backgroundColor: "#09090B",
          borderTopColor: "#27272A",
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          elevation: 0,
        },

        headerStyle: { 
          backgroundColor: "#09090B",
          borderBottomColor: "#27272A",
          borderBottomWidth: 1,
          elevation: 0, 
          shadowOpacity: 0 
        },

        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
          color: '#FAFAFA',
          letterSpacing: -0.5,
        },
        
        headerTintColor: "#E31D1D", 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'H ome',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="theBestTeam"
        options={{
          title: 'The best team',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="award" size={20} color={color} /> 
          ),
        }}
      />

      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "settings-sharp" : "settings-outline"} size={22} color={color} />
          ),
        }}
      />
  
      <Tabs.Screen
        name="testes"
        options={{
          title: 'Lab',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "flask" : "flask-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
