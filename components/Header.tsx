import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext } from 'react';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const handleAuthAction = () => {
    if (user) {
      Alert.alert('Sair', 'Deseja realmente sair?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => {
            logout();
            router.replace('/login');
          }
        }
      ]);
    } else {
      router.push('/login');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/Home')}>
        <Text style={styles.logo}>Central de Postagens</Text>
      </TouchableOpacity>

      {user && <Text style={styles.UserInfo}>Olá, {user.name}</Text>}

      <TouchableOpacity onPress={handleAuthAction}>
        <Text style={styles.link}>{user ? 'Sair' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  logo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 16,
  },
  UserInfo: {
    fontSize: 14,
    color: "#fff"
  }
});
