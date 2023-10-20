import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAnimals = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'animals'));
          const animalData = querySnapshot.docs.map((doc) => doc.data());
          setAnimals(animalData);
        } catch (error) {
          console.error('Error fetching animals:', error);
        }
        setLoading(false);
      };
      fetchAnimals();

      const unsubscribe = onSnapshot(collection(db, 'animals'), (snapshot) => {
        const updatedAnimals = snapshot.docs.map((doc) => doc.data());
        setAnimals(updatedAnimals);
      });

      return () => unsubscribe(); // Clean up the listener on unmount
    }, [])
  );

  const handleNavigateToAnimalForm = () => {
    navigation.navigate('AnimalForm');
  };

  const handleNavigateToAnimalInformation = (animal) => {
    navigation.navigate('AnimalInformation', { selectedAnimal: animal });
  };

  const renderAnimal = ({ item }) => (
    <View style={styles.rowContainer}>
      <Text style={styles.animalName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <TouchableOpacity
        onPress={() => handleNavigateToAnimalInformation(item)}
        style={styles.detailButtonContainer}
      >
        <Text style={styles.detailButtonText}>Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <>
          <FlatList 
            data={animals}
            renderItem={renderAnimal}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.button} onPress={handleNavigateToAnimalForm}>
            <Text style={styles.buttonText}>Registrar nuevo animal</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  animalName: {
    fontSize: 18,
    flex: 0.8,
    marginRight: 10,
  },
  detailButtonContainer: {
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 5,
    flex: 0.2,
  },
  detailButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
