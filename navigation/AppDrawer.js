import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons } from '@expo/vector-icons';
// importar screens del menu lateral
import NewsScreen from '../screens/NewsScreen';
import RegisterScreen from  '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';


// crear menu lateral
const Drawer = createDrawerNavigator();

// exportar menu lateral
export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="News" component={NewsScreen} 
  options={{ 
    title: "Menu", 
    drawerIcon: ({ color, size }) => <Ionicons name="key-outline" size={size} color={color} />,
  }} />

<Drawer.Screen name="Login" component={LoginScreen} 
options={{ 
  title: "Iniciar sesion", 
  drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
}} />

      <Drawer.Screen name="Register" component={RegisterScreen} 
  options={{ 
    title: "Registrar", 
    drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
  }} />
    </Drawer.Navigator>
  );
}