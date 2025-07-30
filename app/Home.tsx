import { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import apiUrl from '../services/api';

interface Post {
  id: number;
  title: string;
  author: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const endpoint = query
        ? `${apiUrl}/posts/search?q=${encodeURIComponent(query)}`
        : `${apiUrl}/posts`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Erro ao buscar posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostPress = (id: number) => {
    router.push({
      pathname: '/posts/detail/[id]',
      params: { id: String(id) },
    });
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>Posts</Text>

      <TextInput 
        style={styles.SearchInput}
        value={query}
        onChangeText={setQuery}
        placeholder="Filtrar por título ou conteúdo..."
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.PostCard} onPress={() => handlePostPress(item.id)}>
            <Text style={styles.PostTitle}>{item.title}</Text >
            <Text style={styles.PostAuthor}>Autor: {item.author}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  PostAuthor: {
    color: '#666',
    fontSize: 14
  },
  PostTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 6,
  },
  PostCard:{
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  Container:{
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  Title:{
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  SearchInput:{
    paddingTop: 10,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderStyle: 'solid',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
});