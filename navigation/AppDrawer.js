import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// --- ¡Importamos los TABS y la pantalla de Perfil! ---
import AppTabs from './AppTabs'; // ¡Importamos el navegador de Tabs completo!
import ProfileScreen from '../screens/ProfileScreen';
// Ya no importamos Login ni Register aquí

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      {/* Esta es la pantalla principal, que CONTIENE los tabs */}
      <Drawer.Screen 
        name="Home" 
        component={AppTabs} // ¡Los tabs están anidados aquí!
        options={{
          title: "Inicio (Noticias)",
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }} 
      />
      
      {/* Esta es una pantalla separada en el Drawer */}
      <Drawer.Screen 
        name="ProfileDrawer" // Nombre diferente a la del Tab para evitar conflictos
        component={ProfileScreen} 
        options={{
          title: "Mi Perfil",
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }} 
      />
      
      {/* Aquí puedes agregar "Configuración", "Mis Contratos", etc. */}

    </Drawer.Navigator>
  );
}