import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { View } from 'react-native-web';

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    function entrar(){
        //Logica
        navigation.navigate('New'); // Ir a screen de Login
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
            <ButtonRounded title="Entrar" onPress={entrar} />    
            <ButtonRounded title="Registrarse" isPrimary={false}
            onPress={() => navigation.navigate('Register') } />    
        </Layout>
    );
}