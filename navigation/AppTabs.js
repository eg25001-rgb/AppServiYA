import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons } from '@expo/vector-icons';

// importar screens de los tabs
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from  '../screens/RegisterScreen';

// crear tabs
const Tab = createBottomTabNavigator();

// exportar tabs
export default function AppTabs() {
  return (
    <Tab.Navigator>
     screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#0051CA', // color tabs
    tabBarInactiveTintColor: 'gray',

    // configurar icono segun name
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;

      if (route.name === 'Login') {
        iconName = focused ? 'key' : 'key-outline';
      } else if (route.name === 'Register') {
        iconName = focused ? 'person' : 'person-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}  
    </Tab.Navigator>
  );
}