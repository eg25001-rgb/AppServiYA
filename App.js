import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Layout, Input, ButtonRounded } from './components';

export default function App() {
  return (
    <Layout title="Contacto" >
      <Input label="Email:" placeholder="name@mail.com" type="email-address" />
      <Input label="Asunto:" placeholder="Consulta" />
      <Input label="Mensaje:" placeholder="Escribir aqui..." lines={4}/>
      <ButtonRounded
        title="Enviar"
        onPress={() => Alert.alert('Enviado', 'Mensaje enviado correctamente')}
      />
      <ButtonRounded
        title="Cancelar"
        isPrimary={false}
        onPress={() => Alert.alert('Cancelado', 'Envio cancelado')}
      />
    </Layout>
  );
}