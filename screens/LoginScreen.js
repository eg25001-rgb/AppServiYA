import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { View } from 'react-native-web';

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

 function entrar() {
  // lógica de login
  navigation.navigate('News');
}


    return (
        <Layout>
            <Input 
                label="Correo electronico"
                placeholder="codigo@esfe.agape.edu.sv"
                type="email-address"
                value={email}
                onChangeText={setEmail} />
            <Input 
                label="Constraseña"
                placeholder="*****"
                hideText={true}
                value={clave}
                onChangeText={setClave} />
            <ButtonRounded title="Confirmar" onPress={() => navigation.navigate('News')} /> 
            <ButtonRounded title="Registrarse" isPrimary={false} />    
        </Layout>
        
    );
}