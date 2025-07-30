import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getPosts, deletePost } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao buscar os posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir Post',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: 'destructive', onPress: () => confirmDelete(id) },
      ]
    );
  };

  const confirmDelete = async (id: string) => {
    try {
      await deletePost(id, user?.token);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível excluir o post');
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administração de Posts</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por título ou autor"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postAuthor}>Autor: {item.author}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({ pathname: '/posts/edit/[id]', params: { id: String(item.id) } })}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postAuthor: {
    color: '#666',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
