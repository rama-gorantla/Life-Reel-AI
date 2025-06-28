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
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native'; 
import BottomNavigation from './bottomNavigations';          
import VideoPopup from './videoPopup';

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

    // Simulate video generation delay
    setTimeout(() => {
      setGeneratedVideoUrl(require('../assets/images/video.mp4')); // Local video
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace('/featuresPage')
          }
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <MaterialIcons name="video-library" size={18} color="#fff" /> AI Video Generator
        </Text>
      </View>

      <Text style={styles.subText}>
        Upload or write a story to generate an AI animated video ✨.
      </Text>

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

      {/* <Text style={styles.subText}>OR</Text> */}

      {/* Story Text Input */}
      {/* <TextInput
        style={styles.textBox}
        placeholder="Enter your story here..."
        placeholderTextColor="#bbb"
        multiline
        value={storyText}
        onChangeText={setStoryText}
      /> */}

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateVideo}>
        <Text style={styles.buttonText}>{isVideoGenerating ? 'Generating...' : 'Generate Video'}</Text>

      </TouchableOpacity>

      <BottomNavigation />

      {/* Video Popup */}
      <VideoPopup
        visible={videoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        videoUri={generatedVideoUrl || ''}
        loading={isVideoGenerating}
        errorMessage={videoError || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "#1B1C36",
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  subText: {
    color: '#f5f6fa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5f6fa',
    textAlign: 'center',
    marginRight: 32,
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
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
  textBox: {
    backgroundColor: '#3d3d74',
    color: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#4b4b88',
    marginBottom: 20,
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

export default VideoGenerator;
