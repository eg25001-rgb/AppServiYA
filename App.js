import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import NewsScreen from './screens/NewsScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import AllServicesScreen from './screens/AllServicesScreen.js';
import ServicesDetail from './components/ServicesDetail.js';

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
        {/* --- Pantalla de todos los servicios --- */}
        <Stack.Screen name="AllServices" component={AllServicesScreen} />
        {/* --- Pantalla de detalles del servicio --- */}
        <Stack.Screen name="ServicesDetail" component={ServicesDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}