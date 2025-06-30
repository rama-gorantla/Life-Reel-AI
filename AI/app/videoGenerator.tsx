import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import BottomNavigation from './bottomNavigations';
import VideoPopup from './videoPopup';
import { SafeAreaView } from 'react-native-safe-area-context';

const VideoGenerator = () => {
  const router = useRouter();
  const [storyText, setStoryText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);

  const handleGenerateVideo = () => {
    if (!storyText.trim() && !fileName) {
      setVideoError('Please upload or enter a story to generate a video.');
      setVideoModalVisible(true);
      return;
    }

    setIsVideoGenerating(true);
    setVideoError(null);

    setTimeout(() => {
      setGeneratedVideoUrl(require('../assets/images/video.mp4'));
      setIsVideoGenerating(false);
      setVideoModalVisible(true);
    }, 800);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'application/pdf'],
      });
      if (!result.canceled) {
        setFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Header */}
          <Text style={styles.headerTitle}>AI Video Generator</Text>
          <Text style={styles.subText}>
            Upload or write a story to generate an AI animated video ✨.
          </Text>

          {/* Animation / Image */}
          <View style={{ alignItems: 'center' }}>
            {Platform.OS === 'web' ? (
              <Image source={require('../assets/images/video.gif')} style={styles.gif} />
            ) : (
              <LottieView
                source={require('../assets/images/videoAI.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>

          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
            <Text style={styles.uploadText}>{fileName ?? 'Upload Story File'}</Text>
          </TouchableOpacity>

          {/* Generate Button */}
          <TouchableOpacity style={styles.button} onPress={handleGenerateVideo}>
            <Text style={styles.buttonText}>
              {isVideoGenerating ? 'Generating...' : 'Generate Video'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Sticky Bottom Navigation */}
        <BottomNavigation />
      </View>

      {/* Video Popup */}
      <VideoPopup
        visible={videoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        videoUri={generatedVideoUrl || ''}
        loading={isVideoGenerating}
        errorMessage={videoError || ''}
      />
    </SafeAreaView>
  );
};

export default VideoGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1C36",
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5f6fa',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#f5f6fa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#5f5fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  uploadText: {
    color: '#fff',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#00e5e5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
