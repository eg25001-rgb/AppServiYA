import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons } from '@expo/vector-icons';
// importar screens del menu lateral
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from  '../screens/RegisterScreen';

// crear menu lateral
const Drawer = createDrawerNavigator();

// exportar menu lateral
export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} 
  options={{ 
    title: "Inicio", 
    drawerIcon: ({ color, size }) => <Ionicons name="key-outline" size={size} color={color} />,
  }} />
      <Drawer.Screen name="Home" component={HomeScreen} 
  options={{ 
    title: "Registrar", 
    drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
  }} />
    </Drawer.Navigator>
  );
}