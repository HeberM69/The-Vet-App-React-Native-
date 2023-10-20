import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnimalInfo = ({ route }) => {
  const { selectedAnimal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del animal</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nombre: {selectedAnimal.name}</Text>
        <Text style={styles.infoText}>Edad: {selectedAnimal.age} años</Text>
        <Text style={styles.infoText}>Peso: {selectedAnimal.weight} kg</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default AnimalInfo;
