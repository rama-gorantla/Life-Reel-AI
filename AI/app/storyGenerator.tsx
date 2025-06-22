import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Message {
  sender: string;
  content: string;
}

const StoryGenerator = () => {
  const router = useRouter();
  const [idea, setIdea] = useState(''); // User's current story idea input
  const [messages, setMessages] = useState<Message[]>([]); // Chat messages
  const [lastFiveLines, setLastFiveLines] = useState<string>(''); // Last 5 lines of AI's response
  const [previousUserRequest, setPreviousUserRequest] = useState<string>(''); // Previous user request
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message

  // Validate the user's story idea (minimum 5 words)
  const isValidIdea = (text: string) => {
    return text && text.trim().split(' ').length >= 5;
  };

  // Handle the "Generate Story" button click
  const handleGenerate = async () => {
    setError('');
    setLoading(true);

    if (!isValidIdea(idea)) {
      setLoading(false);
      setError('Please enter a more descriptive story idea (minimum 5 words).');
      return;
    }

    // Append user input as a new message
    setMessages((prev) => [...prev, { sender: 'User', content: idea }]);
    setIdea('');
    try {
      // Call the API to fetch the structured story
      await fetchStructuredStoryFromOllama(idea);
    } catch (err: any) {
      setError(err.message); // Display error message
    } finally {
      setLoading(false); // Stop loading
      setPreviousUserRequest(idea); // Save the current user request as the previous request
      // Clear the input field
    }
  };

  // Function to call the local Ollama API and stream the structured story
  const fetchStructuredStoryFromOllama = async (idea: string) => {
    try {
      console.log('Starting fetchStructuredStoryFromOllama with idea:', previousUserRequest, idea);

      // Combine the last 5 lines of AI's response with the user's input
      const chatHistory = `User(previous): ${previousUserRequest}\n AI:${lastFiveLines}\n User:Generate a structured story based on the above context. Don't ask additional questions ${idea}\nAI: `;

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b', // Replace with the model name you are using in Ollama
          prompt: chatHistory, // Include last 5 lines of AI's response, previous user request, and current user input
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

      let buffer = ''; // Buffer to handle partial JSON chunks
      let insideThinkTag = false; // Track if we are inside a <think> tag
      let aiResponse = ''; // Temporary variable to store AI's response

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

                // Append AI response to the temporary variable
                aiResponse += responseText;

                // Update the messages state incrementally for streaming
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  const lastMessage = updatedMessages[updatedMessages.length - 1];

                  if (lastMessage?.sender === 'AI') {
                    // Update the last AI message
                    lastMessage.content += responseText;
                  } else {
                    // Add a new AI message
                    updatedMessages.push({ sender: 'AI', content: responseText });
                  }

                  return updatedMessages;
                });
              }
            } catch (err) {
              console.error('Error parsing JSON chunk:', err, 'Line:', line);
            }
          }
        }
      }

      // Extract the last 5 lines of the AI's response
      const lastLines = aiResponse.split('\n').slice(-5).join('\n');
      setLastFiveLines(lastLines); // Update lastFiveLines for the next prompt

      console.log('Finished reading the response stream.');
    } catch (err) {
      console.error('Error fetching story from Ollama:', err);
      setError('Error generating story.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back(); // Navigate to the previous screen
          } else {
            router.replace('/featuresPage'); // Fallback to the default screen
          }
        }}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Chat Interface */}
      <FlatList
        data={messages} // Display all messages
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'User' ? styles.userBubble : styles.aiBubble,
            ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your story idea..."
          placeholderTextColor="#ccc"
          value={idea}
          onChangeText={setIdea}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c54',
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  chatContainer: {
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#00cec9',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#3d3d74',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#4b4b88',
  },
  input: {
    flex: 1,
    backgroundColor: '#3d3d74',
    color: '#fff',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4b4b88',
  },
  button: {
    backgroundColor: '#00cec9',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: '#2d3436',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoryGenerator;