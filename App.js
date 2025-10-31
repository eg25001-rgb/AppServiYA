import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Importamos las pantallas ---
import NewsScreen from './screens/NewsScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
// --- 1. Importa la nueva pantalla ---
import AllServicesScreen from './screens/AllServicesScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="News" 
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* --- 2. Añade la nueva pantalla al Stack --- */}
        <Stack.Screen name="AllServices" component={AllServicesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}