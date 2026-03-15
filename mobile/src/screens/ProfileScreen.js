import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { colors } from '../theme/colors';

export const ProfileScreen = () => {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.request('/profile/me', { headers: { Authorization: `Bearer ${token}` } });
        setProfile(data);
      } catch (error) {
        Alert.alert('Could not load profile', error.message);
      }
    };

    if (token) {
      load();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{profile?.name || 'PIXOKIN User'}</Text>
      <Text style={styles.email}>{profile?.email || 'No email'}</Text>
      <View style={styles.statsCard}>
        <Text style={styles.stat}>Albums: {profile?.stats?.joinedAlbums ?? 0}</Text>
        <Text style={styles.stat}>Uploads: {profile?.stats?.uploads ?? 0}</Text>
        <Text style={styles.stat}>Quota: {profile?.stats?.quotaMb ?? 0} MB</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  name: { fontSize: 26, fontWeight: '800', color: colors.text },
  email: { marginTop: 4, color: colors.mutedText },
  statsCard: { marginTop: 20, backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 8 },
  stat: { color: colors.text },
  logoutButton: { marginTop: 24, backgroundColor: colors.danger, borderRadius: 12, padding: 14 },
  logoutText: { textAlign: 'center', color: '#fff', fontWeight: '700' }
});
