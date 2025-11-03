import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ServicesDetail = ({ route, navigation }) => {
  const { service } = route.params;

  // Datos de técnicos por categoría
  const techniciansData = {
    'Plomería': [
      {
        id: 1,
        name: 'Carlos Ramírez',
        rating: 4.9,
        reviews: 180,
        location: 'San Salvador, El Salvador',
        description: 'Experto en reparaciones de tuberías y sistemas de agua. Soluciones rápidas y garantizadas.',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: 2,
        name: 'José Martínez',
        rating: 4.7,
        reviews: 145,
        location: 'Santa Tecla, El Salvador',
        description: 'Especialista en instalaciones sanitarias y reparaciones de emergencia. Servicio 24/7.',
        image: 'https://i.pravatar.cc/150?img=13'
      },
      {
        id: 3,
        name: 'Roberto Flores',
        rating: 4.8,
        reviews: 210,
        location: 'Antiguo Cuscatlán, El Salvador',
        description: 'Plomero certificado con 15 años de experiencia. Trabajo limpio y profesional.',
        image: 'https://i.pravatar.cc/150?img=14'
      }
    ],
    'Electricidad': [
      {
        id: 4,
        name: 'Miguel Hernández',
        rating: 5.0,
        reviews: 230,
        location: 'San Salvador, El Salvador',
        description: 'Electricista certificado. Instalaciones eléctricas residenciales y comerciales seguras.',
        image: 'https://i.pravatar.cc/150?img=15'
      },
      {
        id: 5,
        name: 'Luis García',
        rating: 4.8,
        reviews: 195,
        location: 'Soyapango, El Salvador',
        description: 'Experto en reparaciones eléctricas y sistemas de iluminación. Trabajo garantizado.',
        image: 'https://i.pravatar.cc/150?img=33'
      },
      {
        id: 6,
        name: 'Fernando Díaz',
        rating: 4.9,
        reviews: 167,
        location: 'Mejicanos, El Salvador',
        description: 'Soluciones eléctricas profesionales. Manejo de tableros y circuitos especializados.',
        image: 'https://i.pravatar.cc/150?img=52'
      }
    ],
    'Carpintería': [
      {
        id: 7,
        name: 'Óscar Meléndez',
        rating: 5.0,
        reviews: 250,
        location: 'San Salvador, El Salvador',
        description: 'Maestro carpintero con pasión por los detalles. Diseño y fabrico muebles a medida que cuentan una historia. Acabados de lujo.',
        image: 'https://i.pravatar.cc/150?img=11'
      },
      {
        id: 8,
        name: 'David Pineda',
        rating: 4.8,
        reviews: 140,
        location: 'Antiguo Cuscatlán, El Salvador',
        description: 'Carpintero versátil para reparaciones, instalaciones de puertas, y creación de clósets. Trabajo rápido, limpio y a buen precio.',
        image: 'https://i.pravatar.cc/150?img=59'
      },
      {
        id: 9,
        name: 'Alberto Ramos',
        rating: 4.7,
        reviews: 188,
        location: 'Santa Tecla, El Salvador',
        description: 'Especialista en muebles de madera fina y restauración. Proyectos personalizados con acabados premium.',
        image: 'https://i.pravatar.cc/150?img=68'
      }
    ],
    'Limpieza del hogar': [
      {
        id: 10,
        name: 'María López',
        rating: 4.9,
        reviews: 310,
        location: 'San Salvador, El Salvador',
        description: 'Servicio de limpieza profunda y mantenimiento. Productos ecológicos y atención al detalle.',
        image: 'https://i.pravatar.cc/150?img=47'
      },
      {
        id: 11,
        name: 'Ana Rodríguez',
        rating: 4.8,
        reviews: 275,
        location: 'San Salvador, El Salvador',
        description: 'Limpieza residencial y de oficinas. Equipo profesional y resultados impecables.',
        image: 'https://i.pravatar.cc/150?img=44'
      },
      {
        id: 12,
        name: 'Carmen Vásquez',
        rating: 5.0,
        reviews: 198,
        location: 'Santa Tecla, El Salvador',
        description: 'Experta en limpieza a fondo y organización del hogar. Confiable y puntual.',
        image: 'https://i.pravatar.cc/150?img=20'
      }
    ],
    'Pintura': [
      {
        id: 13,
        name: 'Juan Gómez',
        rating: 4.9,
        reviews: 156,
        location: 'San Salvador, El Salvador',
        description: 'Pintor profesional. Acabados perfectos en interiores y exteriores. Garantía en todos los trabajos.',
        image: 'https://i.pravatar.cc/150?img=60'
      },
      {
        id: 14,
        name: 'Pedro Morales',
        rating: 4.7,
        reviews: 134,
        location: 'Antiguo Cuscatlán, El Salvador',
        description: 'Especialista en pintura decorativa y texturas. Transforma espacios con color.',
        image: 'https://i.pravatar.cc/150?img=56'
      },
      {
        id: 15,
        name: 'Raúl Castro',
        rating: 4.8,
        reviews: 172,
        location: 'Santa Tecla, El Salvador',
        description: 'Pintura residencial y comercial. Trabajo limpio, rápido y con materiales de calidad.',
        image: 'https://i.pravatar.cc/150?img=51'
      }
    ],
    'Jardinería': [
      {
        id: 16,
        name: 'Sergio Mendoza',
        rating: 5.0,
        reviews: 145,
        location: 'San Salvador, El Salvador',
        description: 'Diseño y mantenimiento de jardines. Creación de espacios verdes hermosos y funcionales.',
        image: 'https://i.pravatar.cc/150?img=57'
      },
      {
        id: 17,
        name: 'Ricardo Torres',
        rating: 4.8,
        reviews: 128,
        location: 'Antiguo Cuscatlán, El Salvador',
        description: 'Jardinero experto en poda, siembra y sistemas de riego. Jardines siempre verdes.',
        image: 'https://i.pravatar.cc/150?img=17'
      },
      {
        id: 18,
        name: 'Mauricio Salazar',
        rating: 4.9,
        reviews: 163,
        location: 'Santa Tecla, El Salvador',
        description: 'Especialista en paisajismo y jardinería ornamental. Convierte tu jardín en un oasis.',
        image: 'https://i.pravatar.cc/150?img=61'
      }
    ]
  };

  const technicians = techniciansData[service.name] || [];

  // Íconos por categoría
  const getServiceIcon = (name) => {
    const icons = {
      'Plomería': 'water',
      'Electricidad': 'flash',
      'Carpintería': 'hammer',
      'Limpieza del hogar': 'trash',
      'Pintura': 'color-palette',
      'Jardinería': 'leaf'
    };
    return icons[name] || 'construct';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}></View>

      {/* Service Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={getServiceIcon(service.name)} size={50} color="#7c3aed" />
        </View>
        <Text style={styles.serviceTitle}>{service.name}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Omitir y Solicitar Servicio</Text>
        </TouchableOpacity>
      </View>

      {/* Technicians Section */}
      <View style={styles.techniciansSection}>
        <Text style={styles.sectionTitle}>Técnicos Disponibles en {service.name}</Text>
        
        {technicians.map((tech) => (
          <View key={tech.id} style={styles.technicianCard}>
            <Image 
              source={{ uri: tech.image }}
              style={styles.technicianImage}
            />
            <Text style={styles.technicianName}>{tech.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#fbbf24" />
              <Text style={styles.rating}>{tech.rating}</Text>
              <Text style={styles.reviews}>({tech.reviews} reseñas)</Text>
            </View>

            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color="#6b7280" />
              <Text style={styles.location}>{tech.location}</Text>
            </View>

            <Text style={styles.description}>{tech.description}</Text>

            <TouchableOpacity style={styles.reserveButton}>
              <Text style={styles.reserveButtonText}>Reservar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileLink}>
              <Text style={styles.profileLinkText}>Ver Perfil Completo</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  header: {
    height: 100,
    backgroundColor: '#7c3aed',
  },
  titleSection: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  requestButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  techniciansSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  technicianCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  technicianImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  technicianName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  reserveButton: {
    backgroundColor: '#fbbf24',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  profileLink: {
    paddingVertical: 8,
  },
  profileLinkText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ServicesDetail;