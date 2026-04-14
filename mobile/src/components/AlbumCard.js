import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const AlbumCard = ({ album, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    {album.coverImageUrl ? (
      <Image source={{ uri: album.coverImageUrl }} style={styles.cover} />
    ) : (
      <View style={[styles.cover, styles.coverPlaceholder]}>
        <Ionicons name="images-outline" size={26} color={colors.primary} />
      </View>
    )}
    <View style={styles.info}>
      <Text style={styles.name}>{album.name}</Text>
      <Text style={styles.meta}>{album.role} • {album.members?.length || 0} members</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  cover: { width: 64, height: 64, borderRadius: 14, marginRight: 12 },
  coverPlaceholder: { backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  meta: { marginTop: 4, color: colors.mutedText }
});
