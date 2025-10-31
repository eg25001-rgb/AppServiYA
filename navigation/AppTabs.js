import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- CORRECCIÓN DE RUTAS ---
// Desde config/navigation/ -> ../../screens/
import NewsScreen from '../../screens/NewsScreen.js';
import ProfileScreen from '../../screens/ProfileScreen.js'; 

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0051CA',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'NewsFeed') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="NewsFeed" 
        component={NewsScreen} 
        options={{ title: "Noticias" }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: "Mi Perfil" }} 
      />
    </Tab.Navigator>
  );
}