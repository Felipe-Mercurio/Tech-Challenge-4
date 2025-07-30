import React, { useState, useContext, useEffect } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { createPost } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return; // Precaução extra

    try {
      const post = { title, content, author };
      await createPost(post, user.token);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      router.replace('/Home');
    } catch (err) {
      console.error('Erro ao criar post:', err);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.Card}>
        <Text style={styles.Title}>Criar Novo Post</Text>

        <Text style={styles.Label}>Título</Text>
        <TextInput
          style={styles.Input}
          placeholder="Digite o título"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.Label}>Autor</Text>
        <TextInput
          style={styles.Input}
          placeholder="Digite o nome do autor"
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={styles.Label}>Conteúdo</Text>
        <TextInput
          style={[styles.Input, styles.TextArea]}
          placeholder="Digite o conteúdo"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
          <Text style={styles.ButtonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    justifyContent: 'center',
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
    marginTop: 40,
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
  Input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  TextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  Button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
