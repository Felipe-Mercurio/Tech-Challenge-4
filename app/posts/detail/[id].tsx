import React, { useState, useEffect, useContext } from 'react';
import { Alert, ActivityIndicator, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPostById, deletePost } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const hasPermission = user && (user.level === 'Admin' || user.level === 'Professor');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const confirmDelete = () => {
    Alert.alert(
      'Deletar Post',
      'Tem certeza que deseja deletar este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', style: 'destructive', onPress: deletePostAction },
      ]
    );
  };

  const deletePostAction = async () => {
    try {
      await deletePost(id, user?.token);
      router.replace('/Home');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar o post.');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  if (!post) {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <Text>Post não encontrado ou ocorreu um erro.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.Card}>
        <Text style={styles.Title}>{post.title}</Text>

        <Text style={styles.Label}>Autor:</Text>
        <Text style={styles.Content}>{post.author}</Text>

        <Text style={styles.Label}>Conteúdo:</Text>
        <Text style={styles.Content}>{post.content}</Text>

        {hasPermission && (
          <View style={styles.ButtonGroup}>
            <TouchableOpacity 
              style={styles.Button}
              onPress={() => router.push({ pathname: '/posts/edit/[id]', params: { id: String(id) } })}
            >
              <Text style={styles.ButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.Button, styles.DangerButton]} onPress={confirmDelete}>
              <Text style={styles.ButtonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  Card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  Label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  Content: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  ButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 12,
  },
  Button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  DangerButton: {
    backgroundColor: '#e74c3c',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
