import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { auth, firestore } from '../api/firebase.js'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// --- (Esquemas y Componentes de Formulario - SIN CAMBIOS) ---
const employerSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  phone: z.string().min(8, 'Ingresa un número de teléfono válido.'),
  department: z.string().min(3, 'Ingresa un departamento.'),
  municipality: z.string().min(3, 'Ingresa un municipio.'),
  address: z.string().min(5, 'Ingresa una dirección.'),
  termsAndConditions: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos y condiciones.' }),
  }),
});
const workerSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  phone: z.string().min(8, 'Ingresa un número de teléfono válido.'),
  dateOfBirth: z.string().min(10, 'Ingresa una fecha válida (YYYY-MM-DD).'), 
  dui: z.string().min(9, 'El DUI debe ser válido (00000000-0).'),
  department: z.string().min(3, 'Ingresa un departamento.'),
  municipality: z.string().min(3, 'Ingresa un municipio.'),
  address: z.string().min(5, 'Ingresa una dirección.'),
  biography: z.string().min(10, 'La biografía debe tener al menos 10 caracteres.'),
  yearsOfExperience: z.coerce.number().min(0, 'Debe ser un número positivo.'),
  hourlyRate: z.coerce.number().min(0, 'Debe ser un número positivo.'),
  termsAndConditions: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos y condiciones.' }),
  }),
});
const FormInput = ({ control, name, label, error, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholderTextColor="#888"
          {...props}
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);
const FormCheckbox = ({ control, name, label, error }) => (
  <View style={styles.inputContainer}>
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => onChange(!value)}>
          <Ionicons 
            name={value ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={value ? '#7B61FF' : '#888'} // Morado principal
          />
          <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

// --- FORMULARIO PARA CLIENTE ---
function EmployerForm({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employerSchema),
    defaultValues: { /* ... */ },
  });
  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const { password, termsAndConditions, ...profileData } = data;
      await setDoc(doc(firestore, 'users', user.uid), { 
        userType: 'employer', uid: user.uid, email: data.email, fullName: data.fullName,
      });
      await setDoc(doc(firestore, 'employers', user.uid), {
        ...profileData, uid: user.uid, accountStatus: 'pending_verification',
      });
      Alert.alert('¡Éxito!', 'Tu cuenta de Cliente ha sido creada.');
      navigation.navigate('News', { displayName: data.fullName });
    } catch (error) {
      console.error("Error Registro Cliente:", error.message); 
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View>
      <FormInput control={control} name="fullName" label="Nombre Completo" error={errors.fullName} />
      <FormInput control={control} name="email" label="Correo Electrónico" error={errors.email} keyboardType="email-address" autoCapitalize="none" />
      <FormInput control={control} name="password" label="Contraseña" error={errors.password} secureTextEntry />
      <FormInput control={control} name="phone" label="Teléfono" error={errors.phone} keyboardType="phone-pad" />
      <View style={styles.row}>
        <View style={styles.column}><FormInput control={control} name="department" label="Departamento" error={errors.department} /></View>
        <View style={styles.column}><FormInput control={control} name="municipality" label="Municipio" error={errors.municipality} /></View>
      </View>
      <FormInput control={control} name="address" label="Dirección" error={errors.address} />
      <FormCheckbox control={control} name="termsAndConditions" label="Acepto los términos y condiciones." error={errors.termsAndConditions} />
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonPrimaryText}>Crear Cuenta de Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- FORMULARIO PARA PROVEEDOR ---
function WorkerForm({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(workerSchema),
    defaultValues: { /* ... */ },
  });
  const onSubmit = async (data) => {
     try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const { password, termsAndConditions, ...profileData } = data;
      await setDoc(doc(firestore, 'users', user.uid), { 
        userType: 'worker', uid: user.uid, email: data.email, fullName: data.fullName, 
      });
      await setDoc(doc(firestore, 'workers', user.uid), {
        ...profileData, uid: user.uid, accountStatus: 'pending_verification',
      });
      Alert.alert('¡Éxito!', 'Tu cuenta de Proveedor ha sido creada.');
      navigation.navigate('News', { displayName: data.fullName });
    } catch (error) {
      console.error("Error Registro Proveedor:", error.message); 
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View>
      <FormInput control={control} name="fullName" label="Nombre Completo" error={errors.fullName} />
      <FormInput control={control} name="email" label="Correo Electrónico" error={errors.email} keyboardType="email-address" autoCapitalize="none" />
      <FormInput control={control} name="password" label="Contraseña" error={errors.password} secureTextEntry />
      <FormInput control={control} name="phone" label="Teléfono" error={errors.phone} keyboardType="phone-pad" />
      <View style={styles.row}>
        <View style={styles.column}><FormInput control={control} name="dateOfBirth" label="Fecha de Nacimiento" error={errors.dateOfBirth} placeholder="YYYY-MM-DD" /></View>
        <View style={styles.column}><FormInput control={control} name="dui" label="DUI" error={errors.dui} placeholder="00000000-0" /></View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}><FormInput control={control} name="department" label="Departamento" error={errors.department} /></View>
        <View style={styles.column}><FormInput control={control} name="municipality" label="Municipio" error={errors.municipality} /></View>
      </View>
      <FormInput control={control} name="address" label="Dirección" error={errors.address} />
      <FormInput control={control} name="biography" label="Biografía" error={errors.biography} multiline={true} numberOfLines={4} placeholder="Cuéntanos sobre tu experiencia..." />
      <View style={styles.row}>
        <View style={styles.column}><FormInput control={control} name="yearsOfExperience" label="Años de Experiencia" error={errors.yearsOfExperience} keyboardType="numeric" /></View>
        <View style={styles.column}><FormInput control={control} name="hourlyRate" label="Tarifa por Hora (USD)" error={errors.hourlyRate} keyboardType="numeric" /></View>
      </View>
      <FormCheckbox control={control} name="termsAndConditions" label="Acepto los términos para proveedores." error={errors.termsAndConditions} />
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonPrimaryText}>Crear Cuenta de Proveedor</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- COMPONENTE PRINCIPAL DE LA PANTALLA ---
export default function RegisterScreen({ navigation }) {
  const [userType, setUserType] = useState('employer'); 

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Crear una Cuenta</Text>
      <Text style={styles.subtitle}>
        Elige si buscas un servicio o si quieres ofrecer tus habilidades.
      </Text>

      {/* Selector de Tipo de Usuario (Tabs) */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, userType === 'employer' && styles.tabActive]}
          onPress={() => setUserType('employer')}
        >
          <Text style={[styles.tabText, userType === 'employer' && styles.tabTextActive]}>
            Soy Cliente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, userType === 'worker' && styles.tabActive]}
          onPress={() => setUserType('worker')}
        >
          <Text style={[styles.tabText, userType === 'worker' && styles.tabTextActive]}>
            Soy Proveedor
          </Text>
        </TouchableOpacity>
      </View>

      {userType === 'employer' ? (
        <EmployerForm navigation={navigation} />
      ) : (
        <WorkerForm navigation={navigation} />
      )}

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonSecondaryText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- ESTILOS UNIFICADOS (MODO CLARO) ---
const styles = StyleSheet.create({
  scrollContainer: { 
    flex: 1, 
    backgroundColor: '#F9F9F9' // Fondo claro
  },
  container: { 
    padding: 20, 
    paddingTop: 80, 
    paddingBottom: 40 
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    color: '#333' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#555', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  tabsContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#E0E0E0', // Fondo de pestañas más sutil
    borderRadius: 10, 
    marginBottom: 20,
  },
  tab: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF', // Pestaña activa blanca
    borderRadius: 8, 
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 5 },
      android: { elevation: 3 },
      web: { boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    }),
  },
  tabText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#555' 
  },
  tabTextActive: { 
    color: '#7B61FF' // Morado principal
  },
  inputContainer: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5, 
    fontWeight: '500' 
  },
  input: { 
    height: 50, 
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderColor: '#E0E0E0', // Borde sutil
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 16,
    color: '#333',
  },
  inputError: { 
    borderColor: '#D9534F' 
  },
  errorText: { 
    color: '#D9534F', 
    fontSize: 12, 
    marginTop: 5 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  column: { 
    width: '48%' 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10 
  },
  checkboxLabel: { 
    marginLeft: 10, 
    fontSize: 14, 
    color: '#333' 
  },
  buttonPrimary: { 
    backgroundColor: '#7B61FF', // Morado principal
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10, 
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