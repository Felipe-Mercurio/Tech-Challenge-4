import Constants from 'expo-constants';

const apiUrl = 
  Constants.expoConfig?.extra?.apiUrl
export default apiUrl;

export async function getPosts() {
  const res = await fetch(`${apiUrl}/posts`);
  if (!res.ok) throw new Error('Erro ao buscar posts');
  return res.json();
}

export async function searchPosts(query) {
  const res = await fetch(`${apiUrl}/posts/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erro ao buscar posts');
  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${apiUrl}/posts/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar post');
  return res.json();
}

export async function createPost(post, token) {
  const res = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Erro ao criar post');
  return res.json();
}

export async function updatePost(id, post, token) {
  const res = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Erro ao atualizar post');
  return res.json();
}

export async function deletePost(id, token) {
  const res = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ao deletar o post (${res.status})`);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return null;
}

export async function login(credentials) {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  return res.json();
}

export async function registerUser(userData) {
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Erro ao registrar usuário');
  }

  return res.json();
}
