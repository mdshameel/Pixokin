import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Image, Pressable, Text, Alert } from 'react-native';
import { MediaGridItem } from '../components/MediaGridItem';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const AlbumScreen = ({ route }) => {
  const { album } = route.params;
  const { token } = useAuth();
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const loadMedia = async (nextPage = 1) => {
    try {
      const data = await api.request(`/media/${album._id}?page=${nextPage}&limit=24`, { headers: { Authorization: `Bearer ${token}` } });
      setMedia((prev) => (nextPage === 1 ? data : [...prev, ...data]));
      setPage(nextPage);
    } catch (error) {
      Alert.alert('Could not load media', error.message);
    }
  };

  useEffect(() => { loadMedia(1); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <MediaGridItem item={item} onPress={setSelected} />}
        onEndReached={() => loadMedia(page + 1)}
        onEndReachedThreshold={0.4}
      />
      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setSelected(null)}>
          {selected && (
            <View>
              <Image source={{ uri: selected.url }} style={styles.preview} />
              <Text style={styles.caption}>{selected.caption || 'No caption'}</Text>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 8, paddingTop: 8 },
  row: { justifyContent: 'space-between' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  preview: { width: 320, height: 320, borderRadius: 16 },
  caption: { color: '#fff', marginTop: 12, textAlign: 'center' }
});
