import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const AuthScreen = () => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    try {
      const path = isSignup ? '/auth/signup' : '/auth/login';
      const payload = await api.request(path, { method: 'POST', body: JSON.stringify(form) });
      login(payload);
    } catch (error) {
      Alert.alert('Authentication failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PIXOKIN</Text>
      <Text style={styles.subtitle}>Collaborative gallery for every moment.</Text>
      {isSignup && <TextInput style={styles.input} placeholder="Name" onChangeText={(name) => setForm({ ...form, name })} />}
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(email) => setForm({ ...form, email })} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(password) => setForm({ ...form, password })} />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>{isSignup ? 'Create account' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup((prev) => !prev)}>
        <Text style={styles.switchText}>{isSignup ? 'Already have an account?' : "Don't have an account?"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 8, marginBottom: 24, color: colors.mutedText },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 14, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  switchText: { textAlign: 'center', marginTop: 18, color: colors.mutedText }
});
