import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const UploadProgressBar = ({ progress = 0 }) => (
  <View style={styles.track}>
    <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress * 100))}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  track: { height: 8, width: '100%', backgroundColor: '#E5E8F0', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.secondary, borderRadius: 999 }
});
