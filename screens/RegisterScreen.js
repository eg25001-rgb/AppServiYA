import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import { Alert } from 'react-native';



export default function RegisterScreen({navigation}){
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    function entrar(){
    // logica 
    navigation.navigate('Register'); // ir a screen especifica
}

    return (
        <Layout>
            <Input 
                label="Nombre"
                placeholder="Juan Perez"
                type="default"
                value={nombre}
                onChangeText={setNombre} />
            <Input 
                label="Genero"
                placeholder="Femenino/Masculino"
                type="default"
                value={genero}
                onChangeText={setGenero} />                  
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
            <Input 
                label="Confirmar constraseña"
                placeholder="*****"
                hideText={true}
                value={confirmarClave}
                onChangeText={setConfirmarClave} />

           <ButtonRounded 
  title="Confirmar" 
  onPress={() => {
    alert("Registro exitoso ✅ Tu cuenta ha sido creada correctamente.");
    navigation.navigate('Login');
  }}
/>
   
            <ButtonRounded title="Iniciar sesion" isPrimary={false} 
            onPress={() => navigation.navigate('News') } />   
               
        </Layout>
    );
}