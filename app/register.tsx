import React, { useState } from 'react';
import { Alert, Platform, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { registerUser } from '../services/api';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    level: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    if (!form.level) {
      return setError('Selecione um nível de acesso');
    }

    try {
      await registerUser(form);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.Container}>
        <View style={styles.Card}>
          <Text style={styles.Title}>Criar Conta</Text>

          <Text style={styles.Label}>Nome</Text>
          <TextInput
            style={styles.Input}
            value={form.name}
            onChangeText={value => handleChange('name', value)}
            placeholder="Digite seu nome"
          />

          <Text style={styles.Label}>Email</Text>
          <TextInput
            style={styles.Input}
            value={form.email}
            onChangeText={value => handleChange('email', value)}
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.Label}>Senha</Text>
          <TextInput
            style={styles.Input}
            value={form.password}
            onChangeText={value => handleChange('password', value)}
            placeholder="Digite sua senha"
            secureTextEntry
          />

          <Text style={styles.Label}>Confirmar Senha</Text>
          <TextInput
            style={styles.Input}
            value={form.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
            placeholder="Confirme a senha"
            secureTextEntry
          />

          <Text style={styles.Label}>Nível de Acesso</Text>
          <Picker
            selectedValue={form.level}
            onValueChange={value => handleChange('level', value)}
            style={{
              marginTop: 8,
              marginBottom: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: 'white',
            }}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Aluno" value="Aluno" />
            <Picker.Item label="Professor" value="Professor" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>

          <TouchableOpacity 
            style={styles.Button}
            onPress={handleSubmit}>
            <Text style={styles.ButtonText}>Registrar</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.ErrorText}>{error}</Text> : null}

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
  Title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  Label:{
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 600,
    color: '#333',
  },
  Input:{
    width: '100%',
    paddingTop: 14,
    paddingLeft: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  Button:{
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24
  },
  ButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  ErrorText:{
    color: '#ff000',
    marginTop: 12,
    textAlign: 'center'
  }
});