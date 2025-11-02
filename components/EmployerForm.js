// ========================= EmployerForm.js =========================
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { auth, firestore } from '../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// ✅ Función personalizada para mostrar alertas (funciona en web y móvil)
const showAlert = (title, message, onAccept) => {
  if (Platform.OS === 'web') {
    // En web, usar window.alert y luego ejecutar callback
    const accepted = window.confirm(`${title}\n\n${message}`);
    if (accepted && onAccept) {
      onAccept();
    }
  } else {
    // En móvil, usar Alert nativo
    Alert.alert(title, message, [
      { text: 'Aceptar', onPress: onAccept }
    ], { cancelable: false });
  }
};

// --- VALIDACIÓN ZOD ---
const employerSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Correo electrónico no válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  phone: z.string().min(8, 'Número de teléfono inválido.'),
  department: z.string().min(3, 'Departamento requerido.'),
  municipality: z.string().min(3, 'Municipio requerido.'),
  address: z.string().min(5, 'Dirección requerida.'),
  termsAndConditions: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos y condiciones.' }),
  }),
});

// --- COMPONENTE INPUT ---
const FormInput = ({ control, name, label, error, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          onChangeText={onChange}
          value={value || ''}
          placeholderTextColor="#888"
          {...props}
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

// --- CHECKBOX ---
const FormCheckbox = ({ control, name, label, error }) => (
  <View style={styles.checkboxWrapper}>
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => onChange(!value)} style={styles.checkboxButton}>
            <Ionicons
              name={value ? 'checkbox' : 'square-outline'}
              size={24}
              color={value ? '#7B61FF' : '#888'}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>{label}</Text>
        </View>
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

// --- MODAL DE ÉXITO PERSONALIZADO ---
const SuccessModal = ({ visible, onClose, userName }) => {
  if (!visible) return null;
  
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        <Text style={styles.modalTitle}>¡Registro Exitoso! 🎉</Text>
        <Text style={styles.modalMessage}>
          Bienvenido {userName}.{'\n'}
          Tu cuenta de cliente ha sido creada correctamente.
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- FORMULARIO CLIENTE ---
export default function EmployerForm({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUserName, setRegisteredUserName] = useState('');
  const [registeredUserId, setRegisteredUserId] = useState('');

  const { control, handleSubmit, formState: { errors }, reset } = useForm({ 
    resolver: zodResolver(employerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      department: '',
      municipality: '',
      address: '',
      termsAndConditions: false
    }
  });

  const onSubmit = async (data) => {
    console.log('🟢 ========== INICIO DE REGISTRO ==========');
    
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      console.log('🟢 Paso 1: Creando usuario en Auth...');

      // 1️⃣ Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      console.log('✅ Usuario creado:', user.uid);

      // 2️⃣ Preparar datos para Firestore
      const { password, termsAndConditions, ...profileData } = data;
      
      const employerData = { 
        ...profileData, 
        uid: user.uid, 
        accountStatus: 'pending_verification',
        createdAt: new Date().toISOString(),
        role: 'employer'
      };

      console.log('🟢 Paso 2: Guardando en Firestore...');

      // 3️⃣ Guardar en Firestore
      await setDoc(doc(firestore, 'employers', user.uid), employerData);
      
      console.log('✅ Datos guardados exitosamente!');

      // 4️⃣ Resetear formulario
      reset();

      // 5️⃣ Guardar datos para el modal
      setRegisteredUserName(data.fullName);
      setRegisteredUserId(user.uid);

      console.log('🟢 Paso 3: Mostrando modal de éxito...');

      // 6️⃣ Mostrar modal de éxito
      setShowSuccessModal(true);

      console.log('✅ Proceso completado exitosamente!');

    } catch (error) {
      console.error('❌ Error:', error);
      
      let errorMessage = 'Ocurrió un error al crear la cuenta.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está registrado.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil (mínimo 8 caracteres).';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Verifica tu internet.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
      
      // Mostrar error con la función personalizada
      showAlert('Error al Registrar', errorMessage, null);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    console.log('🟢 Cerrando modal y navegando...');
    setShowSuccessModal(false);
    
    // Navegar a la pantalla principal
    if (navigation && navigation.replace) {
      navigation.replace('News', { 
        displayName: registeredUserName,
        userId: registeredUserId 
      });
      console.log('✅ Navegación ejecutada');
    } else {
      console.error('❌ Navigation no disponible');
    }
  };

  return (
    <View style={styles.container}>
      <FormInput 
        control={control} 
        name="fullName" 
        label="Nombre Completo" 
        error={errors.fullName}
        editable={!isLoading}
      />
      <FormInput 
        control={control} 
        name="email" 
        label="Correo Electrónico" 
        error={errors.email} 
        keyboardType="email-address" 
        autoCapitalize="none"
        editable={!isLoading}
      />
      <FormInput 
        control={control} 
        name="password" 
        label="Contraseña" 
        error={errors.password} 
        secureTextEntry 
        autoCapitalize="none"
        editable={!isLoading}
      />
      <FormInput 
        control={control} 
        name="phone" 
        label="Teléfono" 
        error={errors.phone} 
        keyboardType="phone-pad"
        editable={!isLoading}
      />
      <View style={styles.row}>
        <View style={styles.column}>
          <FormInput 
            control={control} 
            name="department" 
            label="Departamento" 
            error={errors.department}
            editable={!isLoading}
          />
        </View>
        <View style={styles.column}>
          <FormInput 
            control={control} 
            name="municipality" 
            label="Municipio" 
            error={errors.municipality}
            editable={!isLoading}
          />
        </View>
      </View>
      <FormInput 
        control={control} 
        name="address" 
        label="Dirección" 
        error={errors.address}
        editable={!isLoading}
      />
      <FormCheckbox 
        control={control} 
        name="termsAndConditions" 
        label="Acepto los términos y condiciones" 
        error={errors.termsAndConditions} 
      />
      
      <TouchableOpacity 
        style={[styles.buttonPrimary, isLoading && styles.buttonDisabled]} 
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.buttonPrimaryText}>Creando cuenta...</Text>
          </View>
        ) : (
          <Text style={styles.buttonPrimaryText}>Crear Cuenta de Cliente</Text>
        )}
      </TouchableOpacity>

      {/* ✅ Modal de éxito */}
      <SuccessModal 
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        userName={registeredUserName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: '#333', marginBottom: 5, fontWeight: '500' },
  input: { 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    paddingHorizontal: 15,
    fontSize: 16
  },
  inputError: { borderColor: '#D9534F' },
  errorText: { color: '#D9534F', fontSize: 12, marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { width: '48%' },
  checkboxWrapper: { marginVertical: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkboxButton: { marginRight: 10 },
  checkboxLabel: { flex: 1, fontSize: 14, color: '#333' },
  buttonPrimary: { 
    backgroundColor: '#7B61FF', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 20
  },
  buttonDisabled: {
    backgroundColor: '#B8ACFF',
    opacity: 0.7
  },
  buttonPrimaryText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  // ✅ Estilos del modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});