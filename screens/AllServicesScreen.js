import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
  TextInput, // <-- Importamos TextInput
  Platform,  // <-- Para estilos condicionales por plataforma
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- LISTA COMPLETA DE SERVICIOS (Aumentada un poco más) ---
const allServicesData = [
  { nombre: 'Plomería', icon: 'water-outline' },
  { nombre: 'Electricidad', icon: 'flash-outline' },
  { nombre: 'Carpintería', icon: 'hammer-outline' },
  { nombre: 'Limpieza del Hogar', icon: 'trash-outline' },
  { nombre: 'Pintura', icon: 'color-palette-outline' },
  { nombre: 'Jardinería', icon: 'leaf-outline' },
  { nombre: 'Albañilería', icon: 'build-outline' },
  { nombre: 'Cerrajería', icon: 'key-outline' },
  { nombre: 'Fumigación', icon: 'bug-outline' },
  { nombre: 'Reparación de PC', icon: 'desktop-outline' },
  { nombre: 'Mudanzas', icon: 'cube-outline' },
  { nombre: 'Aire Acondicionado', icon: 'snow-outline' },
  { nombre: 'Mecánica', icon: 'car-sport-outline' },
  { nombre: 'Costura', icon: 'cut-outline' },
  { nombre: 'Niñera', icon: 'happy-outline' },
  { nombre: 'Clases Particulares', icon: 'book-outline' },
  { nombre: 'Diseño Gráfico', icon: 'brush-outline' },
  { nombre: 'Fontanería', icon: 'build-outline' }, // Ejemplo de un servicio similar para simular más
];

export default function AllServicesScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('none'); // 'none', 'az', 'za'
  const [viewMode, setViewMode] = useState('5x5'); // '5x5', '3x3', 'lineal'
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showViewOptions, setShowViewOptions] = useState(false);


  // --- Lógica de filtrado y búsqueda ---
  const filteredAndSortedServices = [...allServicesData]
    .filter(service =>
      service.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterType === 'az') {
        return a.nombre.localeCompare(b.nombre);
      } else if (filterType === 'za') {
        return b.nombre.localeCompare(a.nombre);
      }
      return 0; // Sin ordenar por defecto
    });

  // --- Función para obtener estilos de vista ---
  const getViewStyles = (mode) => {
    switch (mode) {
      case '5x5':
        return {
          serviceContainer: styles.servicesContainer5x5,
          serviceItem: styles.serviceItem5x5,
        };
      case '3x3':
        return {
          serviceContainer: styles.servicesContainer3x3,
          serviceItem: styles.serviceItem3x3,
        };
      case 'lineal':
        return {
          serviceContainer: styles.servicesContainerLineal,
          serviceItem: styles.serviceItemLineal,
        };
      default:
        return {
          serviceContainer: styles.servicesContainer5x5,
          serviceItem: styles.serviceItem5x5,
        };
    }
  };

  const currentViewStyles = getViewStyles(viewMode);

  return (
    <View style={styles.fullScreenContainer}> {/* Contenedor principal para evitar problemas de posicionamiento */}
      
      {/* --- Botón de Volver (posición ajustada) --- */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* --- Barra de Búsqueda, Filtro y Ajuste --- */}
      <View style={styles.floatingControls}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicio..."
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* --- Botón de Filtro --- */}
        <View>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => {
              setShowViewOptions(false); // Cierra el otro si está abierto
              setShowFilterOptions(!showFilterOptions);
            }}
          >
            <Ionicons name="filter-outline" size={24} color="#555" />
          </TouchableOpacity>
          {showFilterOptions && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setFilterType('none'); setShowFilterOptions(false);}}>
                <Text style={filterType === 'none' && styles.dropdownItemActive}>Sin filtro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setFilterType('az'); setShowFilterOptions(false);}}>
                <Text style={filterType === 'az' && styles.dropdownItemActive}>Alfabético (A-Z)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setFilterType('za'); setShowFilterOptions(false);}}>
                <Text style={filterType === 'za' && styles.dropdownItemActive}>Alfabético (Z-A)</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* --- Botón de Ajuste de Tamaño/Vista --- */}
        <View>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => {
              setShowFilterOptions(false); // Cierra el otro si está abierto
              setShowViewOptions(!showViewOptions);
            }}
          >
            <Ionicons name="grid-outline" size={24} color="#555" />
          </TouchableOpacity>
          {showViewOptions && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setViewMode('5x5'); setShowViewOptions(false);}}>
                <Text style={viewMode === '5x5' && styles.dropdownItemActive}>Vista 5x5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setViewMode('3x3'); setShowViewOptions(false);}}>
                <Text style={viewMode === '3x3' && styles.dropdownItemActive}>Vista 3x3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => {setViewMode('lineal'); setShowViewOptions(false);}}>
                <Text style={viewMode === 'lineal' && styles.dropdownItemActive}>Vista Lineal</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- Título --- */}
        <Text style={styles.sectionTitle}>Todos Nuestros Servicios</Text>
        <Text style={styles.pageSubtitle}>Encuentra la ayuda que necesitas</Text>

        {/* --- Contenedor de servicios --- */}
        <View style={currentViewStyles.serviceContainer}>
          {filteredAndSortedServices.length > 0 ? (
            filteredAndSortedServices.map((servicio, index) => (
              <Pressable 
                key={index} 
                style={({ pressed }) => [
                  currentViewStyles.serviceItem, // <-- Estilo dinámico
                  pressed && styles.servicePressed 
                ]}
                onPress={() => Alert.alert(
                  'Inicia Sesión', 
                  'Debes iniciar sesión para ver los servicios.',
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
            <Text style={styles.noResults}>
              No se encontraron servicios que coincidan con tu búsqueda. 😕
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Espacio para la barra de estado en Android
  },
  scrollContent: {
    padding: 20,
    paddingTop: 150, // Ajustar para dejar espacio a los controles flotantes
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 21,
    left: 20,
    zIndex: 20, // Mayor zIndex para que esté por encima de todo
  },
  floatingControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 15, // Por encima del ScrollView pero debajo del botón de volver
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Fondo para que no se vea el scroll por debajo
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 25,
    paddingHorizontal: 15,
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 14,
  },
  controlButton: {
    backgroundColor: '#F1EEFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Debajo del botón
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 5,
    width: 150,
    zIndex: 100, // Asegura que esté por encima de todo
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemActive: {
    fontWeight: 'bold',
    color: '#7B61FF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center', 
    color: '#333',
  },
  pageSubtitle: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16, 
    marginBottom: 30,
  },
  servicePressed: {
    backgroundColor: '#F1EEFF', 
    borderColor: '#7B61FF',     
  },
  serviceText: {
    marginTop: 8,
    color: '#333',
    fontWeight: '600',
    fontSize: 12, 
    textAlign: 'center',
  },
  noResults: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
  },

  // --- ESTILOS ESPECÍFICOS PARA CADA MODO DE VISTA ---
  // 5x5
  servicesContainer5x5: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  serviceItem5x5: {
    width: '18%',         // 100% / 5 = 20%. Damos 18% para dejar margen.
    aspectRatio: 1,       // Mantiene el botón cuadrado (alto = ancho)
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 10,          // Reducimos padding
    margin: '1%',         // Margen
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F0F0F0', 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    minWidth: 70, // Tamaño mínimo para que no se vean muy pequeños en pantallas angostas
  },

  // 3x3
  servicesContainer3x3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distribuir uniformemente
    width: '100%',
  },
  serviceItem3x3: {
    width: '31%',        // (100% - 2*margin) / 3
    aspectRatio: 1,
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    padding: 15,          // Más padding
    marginBottom: 15,     // Más margen inferior
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Lineal
  servicesContainerLineal: {
    flexDirection: 'column', // Uno debajo del otro
    width: '100%',
  },
  serviceItemLineal: {
    flexDirection: 'row', // Icono y texto en la misma línea
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8', 
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    height: 60, // Altura fija para elementos lineales
  },
});