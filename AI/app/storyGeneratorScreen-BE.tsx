import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from "react-native";

const StoryGeneratorScreen = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async () => {
    if (!prompt.trim()) {
      setError("Please enter a story idea!");
      return;
    }
  
    setLoading(true);
    setError(null);
    setStory("");
  
    try {
      const response = await fetch("http://192.168.1.14:5000/api/story/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          genre: "inspirational" // or "romantic", "thriller", "fantasy", etc.
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setStory(data.story || "No story generated.");
      } else {
        setError(data.error || "Failed to generate story.");
      }
    } catch (err) {
      setError("Something went wrong. Check your backend.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Story Generator</Text>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter a story idea..."
        multiline={true}
        numberOfLines={3}
      />
      <TouchableOpacity style={styles.button} onPress={generateStory} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Generating..." : "Generate Story"}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {story ? (
        <ScrollView style={styles.storyContainer}>
          <Text style={styles.storyText}>{story}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  storyContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  storyText: {
    fontSize: 16,
    color: "#333",
  },
});
export default StoryGeneratorScreen;