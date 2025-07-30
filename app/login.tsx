import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { login } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginContext } = useContext(AuthContext);
  const router = useRouter();

  async function handleLogin() {
    try {
      const data = await login({ login: email, password });

      if (data.token) {
        loginContext(data.token, data.user);
        router.replace('/Home');
      } else {
        Alert.alert('Falha no login', 'Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.Container}>
        <View style={styles.Card}>
          <Text style={styles.Title}>Login</Text>

          <TextInput
            style={styles.Input}
            placeholder="Nome ou Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.Input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.Button}
            onPress={handleLogin}
          >
            <Text style={styles.ButtonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.RegisterText}>
            Ainda não tem conta?{' '}
            <Text style={styles.LinkText} onPress={() => router.push('/register')}>
              Registre-se
            </Text>
          </Text>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center'
  },
  Card: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333'
  },
  Input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  Button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  RegisterText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#555',
  },
  LinkText: {
    color: '#3498db',
    fontWeight: 'bold'
  }
});
