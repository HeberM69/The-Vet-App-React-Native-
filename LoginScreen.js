import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './Firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleEmail = text => {
    setEmail(text);
  };

  const handlePassword = text => {
    setPassword(text);
  };

  const handleSubmit = () => {
    loginUser(email, password)
      .then((userCredential) => {
        alert('Inicio de sesión exitoso!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert('Algo salió mal!');
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Inicio de sesión</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿Aún no tienes una cuenta?{' '}
            <Text style={styles.registerLink} onPress={goToRegister}>
              Regístrate aquí
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    borderColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 12,
  },
  registerLink: {
    color: '#293462',
    fontWeight: 'bold',
  },
});

export default Login;
