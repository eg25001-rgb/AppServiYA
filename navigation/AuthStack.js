import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- CORRECCIÓN DE RUTAS ---
// Desde config/navigation/ -> ../../screens/
import LoginScreen from '../../screens/LoginScreen.js';
import RegisterScreen from '../../screens/RegisterScreen.js';
import ServicesDetail from '../components/ServicesDetail.js';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ServicesDetail" component={ServicesDetail} />
    </Stack.Navigator>
  );
}