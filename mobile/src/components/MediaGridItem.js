import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const MediaGridItem = ({ item, onPress }) => (
  <Pressable style={styles.wrap} onPress={() => onPress(item)}>
    <Image source={{ uri: item.thumbnailUrl || item.url }} style={styles.image} />
    {item.type === 'video' && (
      <View style={styles.videoBadge}>
        <Ionicons name="play" size={16} color="#fff" />
      </View>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  wrap: { width: '32%', aspectRatio: 1, marginBottom: '2%' },
  image: { width: '100%', height: '100%', borderRadius: 12 },
  videoBadge: { position: 'absolute', right: 8, bottom: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, padding: 4 }
});
