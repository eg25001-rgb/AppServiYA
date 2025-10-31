import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '../api/firebase.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      let userName = email; 
      if (userDoc.exists()) {
        userName = userDoc.data().fullName; 
      }

      Alert.alert('¡Bienvenido!', `Has iniciado sesión como ${userName}.`);
      navigation.navigate('News', { displayName: userName });

    } catch (error) {
      console.error(error);
      Alert.alert('Error de inicio de sesión', 'Email o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.logo}>
        Servi<Text style={styles.logoHighlight}>YA</Text>
      </Text>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" 
        placeholderTextColor="#888"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
        <Text style={styles.buttonPrimaryText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonSecondaryText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- ESTILOS UNIFICADOS (MODO CLARO) ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#F9F9F9' // Fondo claro de NewsScreen
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  logoHighlight: {
    color: '#7B61FF', // Morado principal
  },
  title: { 
    fontSize: 22, 
    fontWeight: '600',
    textAlign: 'center', 
    marginBottom: 40, 
    color: '#555' // Texto secundario
  },
  input: { 
    height: 50, 
    backgroundColor: '#FFFFFF', // Fondo blanco de input
    borderColor: '#E0E0E0', // Borde sutil
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 15, 
    paddingHorizontal: 15, 
    fontSize: 16,
    color: '#333',
  },
  buttonPrimary: { 
    backgroundColor: '#7B61FF', // Morado principal
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 15 
  },
  buttonPrimaryText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  buttonSecondary: { 
    alignItems: 'center' 
  },
  buttonSecondaryText: { 
    color: '#7B61FF', // Morado principal
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});

export default LoginScreen;