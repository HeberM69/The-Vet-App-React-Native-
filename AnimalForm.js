import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { addAnimalToFirestore } from './Firebase';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [registering, setRegistering] = useState(false); // Nuevo estado para controlar la pantalla de carga

  const handleNameChange = text => {
    setName(text);
  };

  const handleAgeChange = text => {
    if (/^\d+$/.test(text) || text === '') {
      setAge(text);
    }
  };

  const handleWeightChange = text => {
    if (/^\d+$/.test(text) || text === '') {
      setWeight(text);
    }
  };

  const handleRegister = () => {
    setRegistering(true); // Iniciar la pantalla de carga
    addAnimalToFirestore(name, age, weight)
      .then(() => {
        alert(`Animal ${name} Registro exitoso!`);
        setRegistering(false); // Finalizar la pantalla de carga
      })
      .catch((error) => {
        alert('Registro fallido, inténtalo de nuevo');
        console.error(error);
        setRegistering(false); // Finalizar la pantalla de carga en caso de error
      });
  };


  return (
    <View style={styles.container}>
      {registering ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <>
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
          placeholder="Peso (kg)"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar animal</Text>
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
    borderRadius: 20,
  },
  button: {
    marginTop: 50,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
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
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
