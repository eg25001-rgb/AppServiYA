// ========================= RegisterScreen.js =========================
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EmployerForm from '../components/EmployerForm';
import WorkerForm from '../components/WorkerForm';
import { auth, firestore } from '../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [userType, setUserType] = useState('employer'); // employer | worker

  // Función para crear usuario y guardar datos en Firestore
  const handleRegister = async (userData) => {
    // userData debe incluir { email, password, fullName, ...otros campos }
    const { email, password, fullName } = userData;

    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      // 1️⃣ Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Guardar datos en Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        fullName,
        email,
        userType,
        createdAt: new Date(),
      });

      // 3️⃣ Mostrar alerta de éxito
      Alert.alert('¡Registro exitoso!', `Bienvenido, ${fullName}`, [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario. Revisa los datos e intenta de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Botón de atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="person-add-outline" size={50} color="#7B61FF" />
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Selecciona el tipo de cuenta que deseas crear</Text>
      </View>

      {/* Selector de tipo de usuario */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, userType === 'employer' && styles.activeButton]}
          onPress={() => setUserType('employer')}
        >
          <Text style={[styles.toggleText, userType === 'employer' && styles.activeText]}>
            Cliente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, userType === 'worker' && styles.activeButton]}
          onPress={() => setUserType('worker')}
        >
          <Text style={[styles.toggleText, userType === 'worker' && styles.activeText]}>
            Proveedor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Formulario dinámico */}
      {userType === 'employer' ? (
        <EmployerForm navigation={navigation} onRegister={handleRegister} />
      ) : (
        <WorkerForm navigation={navigation} onRegister={handleRegister} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F9FC',
    paddingTop: Platform.OS === 'android' ? 60 : 80,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDEAFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#7B61FF',
  },
  toggleText: {
    color: '#7B61FF',
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    color: '#7B61FF',
    fontSize: 14,
    marginTop: 20,
  },
});
