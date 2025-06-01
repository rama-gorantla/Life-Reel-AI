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
import BottomNavigation from './bottomNavigations';

const StoryGenerator = () => {
  const router = useRouter();
  const [idea, setIdea] = useState(''); // User's story idea input
  const [story, setStory] = useState(''); // Generated structured story (streamed)
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility

  // Validate the user's story idea (minimum 5 words)
  const isValidIdea = (text: string) => {
    return text && text.trim().split(' ').length >= 5;
  };

  // Function to call the local Ollama API and stream the structured story
  const fetchStructuredStoryFromOllama = async (idea: string) => {
    try {
      console.log('Starting fetchStructuredStoryFromOllama with idea:', idea);

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b', // Replace with the model name you are using in Ollama
          prompt: `Generate a structured story based on this idea: "${idea}"`,
          stream: true, // Enable streaming if supported by the API
        }),
      });

      if (!response.body) {
        console.error('No response body from the server.');
        throw new Error('No response body from the server.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      setStory(''); // Clear the story before streaming
      let buffer = ''; // Buffer to handle partial JSON chunks
      let wordBuffer = ''; // Buffer to handle partial words
      let insideThinkTag = false; // Track if we are inside a <think> tag

      console.log('Starting to read the response stream...');
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          console.log('Received chunk:', chunk);

          buffer += chunk; // Append the chunk to the buffer
          const lines = buffer.split('\n'); // Split the buffer into lines
          buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

          for (const line of lines) {
            try {
              console.log('Processing line:', line);
              const parsed = JSON.parse(line.trim()); // Parse each line as JSON
              if (parsed.response) {
                let responseText = parsed.response;

                // Decode escaped characters in the response
                responseText = responseText.replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');

                // Handle <think> tags that might span multiple iterations
                if (responseText.includes('<think>')) {
                  insideThinkTag = true; // Start ignoring content
                  console.log('Entering <think> tag');
                }

                if (insideThinkTag) {
                  // Skip appending content inside <think> tags
                  if (responseText.includes('</think>')) {
                    insideThinkTag = false; // End ignoring content
                    console.log('Exiting </think> tag');
                    responseText = responseText.split('</think>')[1] || ''; // Keep content after </think>
                  } else {
                    console.log('Skipping content inside <think> tag');
                    continue; // Skip content inside <think> tags
                  }
                }

                // Skip empty or meaningless responses
                //if (responseText.trim() === '' || responseText.trim() === '\n' || responseText.trim() === '**') {
                //  console.log('Skipping meaningless response:', responseText);
                //  continue;
                //}

                // Handle partial words
                setStory((prev) => prev + responseText);
              }
            } catch (err) {
              console.error('Error parsing JSON chunk:', err, 'Line:', line);
            }
          }
        }
      }

      console.log('Finished reading the response stream.');
    } catch (err) {
      console.error('Error fetching story from Ollama:', err);
      throw new Error('Failed to generate story. Please try again.');
    }
  };

  // Handle the "Generate Story" button click
  const handleGenerate = async () => {
    setError('');
    setStory('');
    setLoading(true);
    setModalVisible(true);

    if (!isValidIdea(idea)) {
      setLoading(false);
      setError('Please enter a more descriptive story idea (minimum 5 words).');
      return;
    }

    try {
      await fetchStructuredStoryFromOllama(idea); // Call Ollama API with streaming
    } catch (err: any) {
      setError(err.message); // Display error message
    } finally {
      setLoading(false); // Stop loading
    }
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
        <Text style={styles.instruction}>
          Enter your story idea below, and we'll turn it into a detailed, structured story ✨
        </Text>

        {Platform.OS === 'web' ? (
          <Image source={require('../assets/images/read.gif')} style={styles.gif} />
        ) : (
          <LottieView
            source={require('../assets/images/readAI.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
        )}
      </View>

      {/* Input for the user's story idea */}
      <TextInput
        style={styles.input}
        placeholder="Enter your story idea..."
        placeholderTextColor="#ccc"
        value={idea}
        onChangeText={setIdea}
        multiline
      />

      {/* Button to generate the structured story */}
      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Story'}</Text>
      </TouchableOpacity>

      {/* Story Popup to display the generated structured story */}
      <StoryPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        story={story}
        loading={loading}
        errorMessage={error}
      />
      
      <BottomNavigation></BottomNavigation>
      
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
