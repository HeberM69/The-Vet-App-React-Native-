import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase'; // Asegúrate de importar la instancia de Firebase adecuada

const AnimalInfo = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'animals'));
        const animalData = querySnapshot.docs.map((doc) => doc.data());
        setAnimals(animalData);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de animales</Text>
      <View style={styles.infoContainer}>
        {animals.map((animal, index) => (
          <View key={index}>
            <Text style={styles.infoText}>Nombre: {animal.name}</Text>
            <Text style={styles.infoText}>Edad: {animal.age} años</Text>
            <Text style={styles.infoText}>Peso: {animal.weight} kg</Text>
          </View>
        ))}
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
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AnimalInfo;
