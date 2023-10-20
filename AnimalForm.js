import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { addAnimalToFirestore } from './Firebase';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const handleNameChange = text => {
    setName(text);
  };

  const handleAgeChange = text => {
    // Verifica si el texto ingresado es un número
    if (/^\d+$/.test(text) || text === '') {
      setAge(text);
    }
  };

  const handleWeightChange = text => {
    // Verifica si el texto ingresado es un número
    if (/^\d+$/.test(text) || text === '') {
      setWeight(text);
    }
  };

  const handleRegister = () => {
    addAnimalToFirestore(name, age, weight)
      .then(() => {
        alert(`Animal ${name} Registro exitoso!`);
      })
      .catch((error) => {
        alert('Registro fallido, inténtalo de nuevo');
        console.error(error);
      });
  };

  const handleGoBack = () => {
    navigation.goBack(); // Esta función te llevará a la página anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de animales</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={handleNameChange}
          placeholder="Nombre"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={age}
          onChangeText={handleAgeChange}
          placeholder="Edad"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={weight}
          onChangeText={handleWeightChange}
          placeholder="Peso"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar animal</Text>
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  button: {
    marginTop: 50,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
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
