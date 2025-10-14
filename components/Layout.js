import { StyleSheet, Text,StatusBar, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

//Componente Layout
export default function Layout({ title, children}) {
    return (
     <SafeAreaProvider>
       <SafeAreaView style={styles.container} >
        <StatusBar barStyle="light-content" backgroundColor="#0051caff" />
        <Text style={styles.title} >{title}</Text>
        <View style={styles.body} >
            {children}
        </View>
       </SafeAreaView>
     </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
  flex: 1, // Ocupa todo el espacio.
  backgroundColor: "#f5f5f5", // Fondo gris claro.
  justifyContent: "center", // Centra el contenido verticalmente.
  alignItems: "stretch", // estira el contenido horizontalmente.
},
title: {
  color: "#000", // Texto blanco.
  fontSize: 20, // Tamaño de fuente grande.
  fontWeight: "bold", // Texto en negrita.
  paddingVertical: 10, // relleno
},
body: {
  flex: 1, // Ocupa el espacio restante.
  justifyContent: "top", // Alinea el contenido arriba.
  alignItems: "left", // Alinea el contenido a la izquierda.
  padding: 5, // Agrega un relleno de 5px.
},

});