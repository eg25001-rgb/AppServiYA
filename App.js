// importar menu lateral
import AppDrawer from './navigation/AppDrawer';

// importar screens que no se usan en el menu lateral
import NewScreen from './screens/NewsScreen';
import ViewNewScreen from './screens/ViewNewScreen';

// importar react navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// crear Stack
const Stack = createStackNavigator();

// exportar App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={AppDrawer} options={{ title: "ServiYA", headerShown: false  }} />
        <Stack.Screen name="New" component={NewScreen} options={{ title: "Busca la profesion" }}  />
        <Stack.Screen name="ViewNew" component={ViewNewScreen} options={{ title: "Ver Noticia" }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}