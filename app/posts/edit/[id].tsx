import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPostById, updatePost } from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';

export default function EditPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPostById(id);
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar post.');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  const handleSave = () => {
    Alert.alert(
      'Confirmar Alterações',
      'Deseja realmente salvar as alterações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: confirmSave }
      ]
    );
  };

  const confirmSave = async () => {
    try {
      const post = { title, content, author };
      await updatePost(id, post, user?.token);
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      router.replace('/Home');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar o post.');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.Container}>
        <View style={styles.Card}>
          <Text style={styles.Title}>Editar Post</Text>

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
            value={content}
            onChangeText={setContent}
            multiline
            placeholder="Digite o conteúdo"
          />

          <TouchableOpacity style={styles.Button} onPress={handleSave}>
            <Text style={styles.ButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  Input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  TextArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  Button: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
