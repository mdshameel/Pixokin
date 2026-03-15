import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const MemberManagementScreen = ({ route }) => {
  const { albumId } = route.params || {};
  const { token } = useAuth();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!albumId) return;
      try {
        const data = await api.request(`/albums/${albumId}/members`, { headers: { Authorization: `Bearer ${token}` } });
        setMembers(data);
      } catch (error) {
        Alert.alert('Could not load members', error.message);
      }
    };
    load();
  }, [albumId, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.user?.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: colors.text },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontWeight: '600', color: colors.text },
  role: { color: colors.mutedText }
});
