# 📱 App de Postagens com Autenticação

Aplicativo mobile desenvolvido com **React Native (Expo)** e backend em **Node.js + PostgreSQL**, que permite usuários autenticados criarem, visualizarem, editarem e deletarem postagens, com controle de acesso por nível de usuário (Aluno, Professor, Admin).

## 🚀 Funcionalidades

- Cadastro e login com token JWT
- Visualização de lista de posts
- Visualização detalhada de cada post
- Criação, edição e exclusão de postagens (somente para Professores e Admins)
- Controle de acesso por tipo de usuário
- Consumo de API REST hospedada
- Persistência de autenticação via AsyncStorage

## 🧪 Tecnologias utilizadas

### 📲 Frontend (Mobile)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-Components](https://styled-components.com/)
- [React Navigation + Expo Router](https://expo.github.io/router/)
- [Context API](https://reactjs.org/docs/context.html)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

### 🌐 Backend (API REST)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (JSON Web Tokens)](https://jwt.io/)

## 🔐 Controle de Acesso

| Nível       | Permissões                      |
|-------------|---------------------------------|
| Aluno       | Visualizar posts                |
| Professor   | Criar, editar e deletar posts   |
| Admin       | Todas as permissões             |

## 💻 Como rodar o projeto localmente

# 📲 Frontend (Expo)

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o projeto com o Expo
npx expo start
```

# 📦 Deploy

* Backend: Railway (ou outra opção como Render, Fly.io)
* Frontend: Expo Public (npx expo publish) ou EAS Build (eas build)


Desenvolvido com 💙 por Felipe Mercurio