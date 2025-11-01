import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Pressable, 
  Alert,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// ¡SIN AuthContext!

// --- DATOS DE EJEMPLO PARA LOS TESTIMONIOS ---
const dummyTestimonials = [
  {
    id: 1,
    name: 'Ana Deisy López',
    rating: 5,
    text: '"¡Servicio impecable! María resolvió una fuga complicada en mi baño. Muy profesional, puntual y honesta con el precio. ¡La recomiendo!"',
  },
  {
    id: 2,
    name: 'Carlos Henríquez',
    rating: 5,
    text: '"Beatriz es una electricista excepcional. Instaló todo el sistema de luces LED en mi negocio y me asesoró para ahorrar energía. Un trabajo de 10."',
  },
  {
    id: 3,
    name: 'Lucía Vásquez',
    rating: 4,
    text: '"El mueble que me hizo Oscar Meléndez es una obra de arte, aunque demoró un poco más de lo pactado. La calidad es indiscutible."',
  },
  {
    id: 4,
    name: 'Roberto Martínez',
    rating: 5,
    text: '"El equipo de jardinería transformó mi patio. Rápidos, limpios y con un gran ojo para el diseño. Mi jardín nunca se vio mejor."',
  }
];

export default function NewsScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigation = useNavigation();

  const popularServices = [
    { nombre: 'Plomería', icon: 'water-outline' },
    { nombre: 'Electricidad', icon: 'flash-outline' },
    { nombre: 'Carpintería', icon: 'hammer-outline' },
    { nombre: 'Limpieza del Hogar', icon: 'trash-outline' },
    { nombre: 'Pintura', icon: 'color-palette-outline' },
    { nombre: 'Jardinería', icon: 'leaf-outline' },
  ];

  const handleBuscar = () => {
    console.log('handleBuscar fired, busqueda =', busqueda);
    const texto = busqueda.trim().toLowerCase();
    if (texto === '') {
      setResultados([]);
      return;
    }
    const filtrados = popularServices.filter(s =>
      s.nombre.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  const serviciosAMostrar = resultados.length > 0 ? resultados : popularServices;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* --- HEADER (igual) --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.registerBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Servi<Text style={styles.logoHighlight}>YA</Text></Text>
        <TouchableOpacity 
          style={styles.registerBtn} 
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      {/* --- HUD (BÚSQUEDA) con fixes --- */}
      <View style={styles.hudContainer}>
        <Text style={styles.mainTitle}>Ayuda de confianza para las tareas del hogar</Text>
        <Text style={styles.subtitle}>
          Encuentra ayuda calificada para cualquier cosa, desde reparaciones del hogar hasta mandados.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />

          {/* paddingRight evita que el input 'se meta' encima del botón */}
          <TextInput
            style={styles.input}
            placeholder="¿En qué necesitas ayuda?"
            placeholderTextColor="#888"
            value={busqueda}
            onChangeText={setBusqueda}
            onSubmitEditing={handleBuscar}
          />

          {/* Asegúrate onPress está presente; hitSlop y zIndex para problemas de click */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleBuscar}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

       {/* --- SERVICIOS POPULARES (usa serviciosAMostrar) --- */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>
          {resultados.length > 0 ? 'Resultados de búsqueda' : 'Nuestros Servicios Populares'}
        </Text>
        <View style={styles.servicesContainer}>
          {serviciosAMostrar.length > 0 ? (
            serviciosAMostrar.map((servicio, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [styles.service, pressed && styles.servicePressed]}
                onPress={() => Alert.alert(
                  'Inicia Sesión',
                  `Debes iniciar sesión para ver el servicio de ${servicio.nombre}.`,
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Iniciar Sesión', onPress: () => navigation.navigate('Login') }
                  ]
                )}
              >
                <Ionicons name={servicio.icon} size={28} color="#7B61FF" />
                <Text style={styles.serviceText}>{servicio.nombre}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={{ color: '#888', textAlign: 'center', marginTop: 10 }}>
              No se encontraron resultados.
            </Text>
          )}
        </View>
      </View>

      {/* --- 4. NUEVA SECCIÓN: "¿CÓMO FUNCIONA?" (Fondo blanco) --- */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
        <View style={styles.stepsContainer}>
          {/* Paso 1 */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="create-outline" size={28} color="#7B61FF" />
            </View>
            <Text style={styles.stepTitle}>1. Describe tu necesidad</Text>
            <Text style={styles.stepSubtitle}>
              Cuéntanos qué necesitas. Sé tan detallado como quieras.
            </Text>
          </View>
          {/* Paso 2 */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="chatbubbles-outline" size={28} color="#7B61FF" />
            </View>
            <Text style={styles.stepTitle}>2. Conecta con un experto</Text>
            <Text style={styles.stepSubtitle}>
              Nuestro sistema te conecta con el mejor técnico para el trabajo.
            </Text>
          </View>
          {/* Paso 3 */}
          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="checkmark-circle-outline" size={28} color="#7B61FF" />
            </View>
            <Text style={styles.stepTitle}>3. Problema resuelto</Text>
            <Text style={styles.stepSubtitle}>
              Confirma la finalización y califica el servicio. ¡Así de fácil!
            </Text>
          </View>
        </View>
      </View>

      {/* --- 5. NUEVA SECCIÓN: "TESTIMONIOS" (Fondo gris) --- */}
      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>Lo que dicen nuestros clientes</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dummyTestimonials.map((item) => (
            <View key={item.id} style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <Ionicons name="person-circle" size={44} color="#555" />
                <View style={styles.testimonialInfo}>
                  <Text style={styles.testimonialName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    {/* Crea 5 estrellas basadas en el rating */}
                    {[...Array(5)].map((_, i) => (
                      <Ionicons 
                        key={i}
                        name="star" 
                        size={16} 
                        color={i < item.rating ? "#FFD700" : "#E0E0E0"}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.testimonialText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* --- 6. NUEVA SECCIÓN: "FOOTER" (Fondo blanco) --- */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.logo}>Servi<Text style={styles.logoHighlight}>YA</Text></Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-twitter" size={24} color="#555" style={styles.socialIcon} />
            <Ionicons name="logo-facebook" size={24} color="#555" style={styles.socialIcon} />
            <Ionicons name="logo-instagram" size={24} color="#555" style={styles.socialIcon} />
          </View>
        </View>
        <Text style={styles.copyrightText}>© 2025 ServiYA. Todos los derechos reservados.</Text>
      </View>

    </ScrollView>
  );
}

// --- ESTILOS COMPLETOS ACTUALIZADOS ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', 
    flexGrow: 1,
  },
  // --- HEADER ---
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    backgroundColor: '#FFFFFF', 
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 2 },
      android: { elevation: 3, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
      web: { boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }
    }),
  },
  logo: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  logoHighlight: { color: '#7B61FF' },
  registerBtn: { backgroundColor: '#7B61FF', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  registerText: { color: '#fff', fontWeight: '600' },
  // --- HUD ---
  hudContainer: {
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingTop: 40, 
    paddingBottom: 40, 
    backgroundColor: '#FFFFFF',
  },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
  subtitle: { textAlign: 'center', color: '#555', fontSize: 16, marginBottom: 30, maxWidth: 300 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9', 
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    width: '100%',
    maxWidth: 400, 
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: '#333', fontSize: 16 },
  searchButton: { backgroundColor: '#7B61FF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  searchButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  // --- SECCIÓN DE SERVICIOS ---
  servicesSection: {
    backgroundColor: '#F9F9F9', // Fondo gris claro
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 24, // Título más grande
    fontWeight: '700',
    marginBottom: 30, // Más espacio
    textAlign: 'center', 
    color: '#333',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    width: '100%',
  },
  service: {
    width: 100, 
    height: 100, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 15,
    margin: 12, // Más espacio
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F0F0F0', 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  servicePressed: { backgroundColor: '#F1EEFF', borderColor: '#7B61FF' },
  serviceText: { marginTop: 8, color: '#333', fontWeight: '600', fontSize: 12, textAlign: 'center' },
  verTodosButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  verTodosButtonText: { color: '#555', fontSize: 16, fontWeight: 'bold' },
  
  // --- NUEVOS ESTILOS: CÓMO FUNCIONA ---
  howItWorksSection: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  stepsContainer: {
    flexDirection: 'row', // Horizontal en web
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Se apilará en móviles
    width: '100%',
  },
  stepItem: {
    alignItems: 'center',
    width: '100%', // Ocupa todo en móvil
    maxWidth: 250, // Límite en web
    padding: 10,
    marginBottom: 30,
  },
  stepIconContainer: {
    backgroundColor: '#F1EEFF',
    borderRadius: 30, // Círculo
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },

  // --- NUEVOS ESTILOS: TESTIMONIOS ---
  testimonialsSection: {
    backgroundColor: '#F9F9F9', // Fondo gris claro
    padding: 20,
    paddingTop: 40,
    paddingBottom: 50,
  },
  testimonialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: 300, // Ancho fijo para el scroll horizontal
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  testimonialInfo: {
    marginLeft: 10,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // --- NUEVOS ESTILOS: FOOTER ---
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Para móviles
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginLeft: 15,
  },
  copyrightText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 12,
  },
});