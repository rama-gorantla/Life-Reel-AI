// StoryGeneratorScreen.web.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StoryPopup from './storyPopup';
import LottieView from 'lottie-react-native';

const StoryGenerator = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isValidPrompt = (text: string) => {
    return text && text.trim().split(' ').length >= 5;
  };

  const generateFakeStory = (prompt: string) => {
    return `Based on the prompt "${prompt}", The Heart of Wishes

In a quiet village by the hills lived a curious girl named Tara. Every evening, she sat by the river, dreaming of magical lands and talking stars.

One evening, she found a tiny glowing stone nestled in the sand. As she picked it up, a soft voice whispered,
"You’ve found the Heart of Wishes. One true wish, from a kind heart, can change the world."

Tara closed her eyes and wished,
"Let my village be full of joy, so no one feels lonely again."

The stone glowed, then faded into a warm light that rose into the sky.

From that day on, her village changed — smiles grew brighter, help came easier, and laughter filled the air.

Tara never spoke of the stone, but each night, by the river, she smiled… knowing her little wish made a big difference.

”`;
  };

  const handleGenerate = () => {
    setError('');
    setStory('');
    setLoading(true);
    setModalVisible(true);

    if (!isValidPrompt(prompt)) {
      setLoading(false);
      setError('Please enter a more descriptive prompt (minimum 5 words).');
      return;
    }

    setTimeout(() => {
      const generated = generateFakeStory(prompt);
      setStory(generated);
      setLoading(false);
    }, 800);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/featuresPage'))}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📖 AI Story Generator</Text>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.instruction}>Tell us your story idea and we'll bring it to life ✨</Text>

       
       
                       {Platform.OS === 'web' ? (
                           <Image source={require('../assets/images/read.gif')} style={styles.gif} />
                       ) : (
                           <LottieView
                               source={require('../assets/images/readAI.json')}
                               autoPlay
                               loop
                               style={{ width: 200, height: 200, marginBottom:20 }}
                           />
                       )} 
       
       
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your story prompt..."
        placeholderTextColor="#ccc"
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Story'}</Text>
      </TouchableOpacity>

      {/* Story Popup */}
      <StoryPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        story={story}
        loading={loading}
        errorMessage={error}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2c2c54',
    minHeight: '100%',
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
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5f6fa',
    textAlign: 'center',
    marginRight: 32,
  },
  instruction: {
    color: '#f5f6fa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3d3d74',
    color: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#4b4b88',
  },
  button: {
    backgroundColor: '#00cec9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2d3436',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default StoryGenerator;
