// importar menu lateral
import AppDrawer from './navigation/AppDrawer';

// importar screens que no se usan en el menu lateral
import NewScreen from './screens/NewScreen';
import ViewNewScreen from './screens/ViewNewScreen';

// importar react navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// crear Stack
const Stack = createStackNavigator();

// exportar App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="New" component={NewScreen} options={{ title: "Noticias" }}  />
        <Stack.Screen name="ViewNew" component={ViewNewScreen} options={{ title: "Ver Noticia" }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}