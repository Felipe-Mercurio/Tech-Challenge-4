import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../contexts/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
