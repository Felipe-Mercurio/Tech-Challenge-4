import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Footer() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const isProfessorOrAdmin = user?.level === 'Professor' || user?.level === 'Admin';
  const isAdmin = user?.level === 'Admin';

  return (
    <View style={styles.footer}>
      {isProfessorOrAdmin && (
        <TouchableOpacity onPress={() => router.push('/posts/create')}>
          <Text style={styles.link}>Criar Post</Text>
        </TouchableOpacity>
      )}

      {isAdmin && (
        <TouchableOpacity onPress={() => router.push('/admin')}>
          <Text style={styles.link}>Admin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#3498db',
    padding: 16,
    paddingBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, // Para espaçamento entre os botões (se der problema, pode usar margin manualmente)
  },
  link: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
});
