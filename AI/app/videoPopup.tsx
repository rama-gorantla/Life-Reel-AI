import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
// import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

interface VideoPopupProps {
  visible: boolean;
  onClose: () => void;
  videoUri: string;
  loading: boolean;
  errorMessage: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({
  visible,
  onClose,
  videoUri,
  loading,
  errorMessage,
}) => {
  const saveVideo = async () => {
    // try {
    //   const { status } = await MediaLibrary.requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     Alert.alert('Permission Denied', 'Please allow access to save videos.');
    //     return;
    //   }

    //   const fileUri = FileSystem.documentDirectory + 'saved-video.mp4';
    //   await FileSystem.downloadAsync(videoUri, fileUri);
    //   const asset = await MediaLibrary.createAssetAsync(fileUri);
    //   await MediaLibrary.createAlbumAsync('Download', asset, false);
    //   Alert.alert('Success', 'Video saved to gallery.');
    // } catch (error) {
    //   Alert.alert('Error', 'Could not save the video.');
    //   console.error(error);
    // }
  };

  const shareVideo = async () => {
    try {
      await Share.share({
        message: 'Check out this video!',
        url: videoUri,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the video.');
      console.error(error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Generated Video</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator size="large" color="#00f0ff" />
            ) : errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : (
              <>
                <Video
                  source={{ uri: videoUri }}
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  isLooping
                  useNativeControls
                  style={styles.video}
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.button} onPress={saveVideo}>
                    <Ionicons name="download-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={shareVideo}>
                    <Ionicons name="share-social-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#2a265f',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#00f0ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
  },
  error: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    // aspectRatio: 16 / 9,
    height: 250,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00f0ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 8,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default VideoPopup;
