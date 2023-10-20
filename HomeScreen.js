import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const handleNavigateToAnimalForm = () => {
    navigation.navigate('AnimalForm');
  };

  const handleGoBack = () => {
    navigation.goBack(); // Esta función te llevará a la página anterior
  };

  const handleNavigateToAnimalInformation = () => {
    navigation.navigate('AnimalInformation'); // Esta función te llevará a la página de información de animal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Registra un animal o ve los que se han registrado.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToAnimalForm}>
        <Text style={styles.buttonText}>Registrar un animal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonInfo} onPress={handleNavigateToAnimalInformation}>
        <Text style={styles.buttonText}>Ver información del animal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textContainer: {
    width: '80%',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonInfo: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
