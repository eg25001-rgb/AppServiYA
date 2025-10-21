import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function NewsScreen() {
  const [busqueda, setBusqueda] = useState('');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
       <View style={styles.header}>
  <TouchableOpacity 
    style={styles.registerBtn}
    onPress={() => navigation.navigate('Login')}>
    <Text style={styles.registerText}>Iniciar sesion</Text>
  </TouchableOpacity>

  <Text style={styles.logo}>Servi<Text style={{ color: '#7B61FF' }}>YA</Text></Text>

  <TouchableOpacity  
    style={styles.registerBtn} 
    onPress={() => navigation.navigate('Register')}>
    <Text style={styles.registerText}>Registrarse</Text>
  </TouchableOpacity>
</View>

       
      </View>

      {/* Título principal */}
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}>
        Encuentra ayuda calificada para cualquier tipo de trabajo que se requiera.
      </Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="¿En qué necesitas ayuda?"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Servicios populares */}
      <Text style={styles.sectionTitle}>Nuestros Servicios Populares</Text>

      <View style={styles.servicesContainer}>
        <View style={styles.service}>
          <Ionicons name="water-outline" size={28} color="#7B61FF" />
          <Text style={styles.serviceText}>Plomería</Text>
        </View>

        <View style={styles.service}>
          <Ionicons name="flash-outline" size={28} color="#7B61FF" />
          <Text style={styles.serviceText}>Electricidad</Text>
        </View>

        <View style={styles.service}>
          <Ionicons name="hammer-outline" size={28} color="#7B61FF" />
          <Text style={styles.serviceText}>Carpintería</Text>
        </View>

        <View style={styles.service}>
          <Ionicons name="trash-outline" size={28} color="#7B61FF" />
          <Text style={styles.serviceText}>Limpieza del Hogar</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
    alignItems: 'center',
  },
 header: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 30,
},
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  registerBtn: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  registerText: {
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#7B61FF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  service: {
    width: '47%',
    backgroundColor: '#F1EEFF',
    borderRadius: 20,
    paddingVertical: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  serviceText: {
    marginTop: 8,
    color: '#333',
    fontWeight: '600',
  },
});
