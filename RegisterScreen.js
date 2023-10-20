import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, registerUser, addUserToFirestore } from './Firebase'; // Asegúrate de importar addUserToFirestore

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEmail = text => {
    setEmail(text);
  };

  const handlePassword = text => {
    setPassword(text);
  };

  const handleRegister = () => {
    registerUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUserToFirestore(user.uid, email);
        alert('Usuario creado con éxito!');
      })
      .catch((error) => {
        alert('Algo salió mal con tu registro, inténtalo de nuevo');
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Registro de usuario</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={handleEmail}
          placeholder="Correo electrónico"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={handlePassword}
          placeholder="Contraseña"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta creada? {' '}
          <Text style={styles.loginLink} onPress={goToLogin}>
          Inicia sesión
          </Text>
        </Text>
      </View>
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
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 12,
  },
  loginLink: {
    color: '#293462',
    fontWeight: 'bold',
  },
});

export default Register;
