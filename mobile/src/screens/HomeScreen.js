import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { AlbumCard } from '../components/AlbumCard';
import { UploadFAB } from '../components/UploadFAB';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const HomeScreen = ({ navigation }) => {
  const { token } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAlbums = useCallback(async () => {
    try {
      const data = await api.request('/albums', { headers: { Authorization: `Bearer ${token}` } });
      setAlbums(data);
    } catch (error) {
      Alert.alert('Could not load albums', error.message);
    }
  }, [token]);

  useEffect(() => { loadAlbums(); }, [loadAlbums]);

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await loadAlbums(); setRefreshing(false); }} />}
        renderItem={({ item }) => <AlbumCard album={item} onPress={() => navigation.navigate('Album', { album: item })} />}
        ListHeaderComponent={<Text style={styles.header}>Shared Albums</Text>}
      />
      <UploadFAB onPress={() => navigation.navigate('Upload')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 24, fontWeight: '800', marginBottom: 14, color: colors.text }
});
