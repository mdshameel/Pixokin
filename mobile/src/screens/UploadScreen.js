import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UploadProgressBar } from '../components/UploadProgressBar';
import { colors } from '../theme/colors';

export const UploadScreen = () => {
  const [progress, setProgress] = useState(0);

  const pickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All });
    if (result.canceled) {
      return;
    }

    setProgress(0.25);
    setTimeout(() => setProgress(0.6), 200);
    setTimeout(() => setProgress(0.85), 400);
    setTimeout(() => {
      setProgress(1);
      Alert.alert('Ready to upload', 'Connect this screen to /api/media/:albumId/upload endpoint.');
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload to Album</Text>
      <Text style={styles.copy}>Drag-and-drop style upload flow with compression + progress feedback.</Text>
      <TouchableOpacity style={styles.dropZone} onPress={pickFile}>
        <Text style={styles.dropText}>Tap to pick photo or video</Text>
      </TouchableOpacity>
      <UploadProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  copy: { marginTop: 6, marginBottom: 18, color: colors.mutedText },
  dropZone: { borderWidth: 1.5, borderColor: '#C7D2FE', borderStyle: 'dashed', borderRadius: 16, height: 180, alignItems: 'center', justifyContent: 'center', marginBottom: 18, backgroundColor: '#EEF2FF' },
  dropText: { color: colors.primary, fontWeight: '600' }
});
