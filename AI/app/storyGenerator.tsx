import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import BottomNavigation from "./bottomNavigations";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

interface Message {
  sender: string;
  content: string;
}

const StoryGenerator = () => {
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastFiveLines, setLastFiveLines] = useState<string>("");
  const [previousUserRequest, setPreviousUserRequest] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isValidIdea = (text: string) => {
    return text && text.trim().split(" ").length >= 5;
  };

  const handleGenerate = async () => {
    setError("");
    setLoading(true);

    if (!isValidIdea(idea)) {
      setLoading(false);
      setError("Please enter a more descriptive story idea (minimum 5 words).");
      return;
    }

    setMessages((prev) => [...prev, { sender: "User", content: idea }]);
    setIdea("");
    try {
      await fetchStructuredStoryFromOllama(idea);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPreviousUserRequest(idea);
    }
  };

  const fetchStructuredStoryFromOllama = async (idea: string) => {
    try {
      const chatHistory = `User(previous): ${previousUserRequest}\n AI:${lastFiveLines}\n User:Generate a structured story based on the above context. Don't ask additional questions ${idea}\nAI: `;

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b",
          prompt: chatHistory,
          stream: true,
        }),
      });

      if (!response.body) throw new Error("No response body from the server.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let buffer = "";
      let insideThinkTag = false;
      let aiResponse = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            try {
              const parsed = JSON.parse(line.trim());
              if (parsed.response) {
                let responseText = parsed.response;
                responseText = responseText
                  .replace(/\\u003c/g, "<")
                  .replace(/\\u003e/g, ">");

                if (responseText.includes("<think>")) insideThinkTag = true;
                if (insideThinkTag) {
                  if (responseText.includes("</think>")) {
                    insideThinkTag = false;
                    responseText = responseText.split("</think>")[1] || "";
                  } else continue;
                }

                aiResponse += responseText;

                setMessages((prevMessages) => {
                  const updated = [...prevMessages];
                  const last = updated[updated.length - 1];
                  if (last?.sender === "AI") last.content += responseText;
                  else updated.push({ sender: "AI", content: responseText });
                  return updated;
                });
              }
            } catch (err) {
              console.error("Parsing error:", err);
            }
          }
        }
      }

      const lastLines = aiResponse.split("\n").slice(-5).join("\n");
      setLastFiveLines(lastLines);
    } catch (err) {
      setError("Error generating story.");
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    alert("Copied to clipboard");
  };
  const handleShare = async (text: string) => {
    const fileUri = FileSystem.documentDirectory + "story.txt";
    await FileSystem.writeAsStringAsync(fileUri, text);
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/featuresPage")
          }
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📖 AI Story Generator</Text>
      </View>

      {messages.length === 0 && (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          {Platform.OS === "web" ? (
            <Image
              source={require("../assets/images/read.gif")}
              style={styles.gif}
            />
          ) : (
            <LottieView
              source={require("../assets/images/readAI.json")}
              autoPlay
              loop
              style={styles.gif}
            />
          )}
          <Text style={styles.instruction}>
            Your AI storyteller is waiting... ✨{"\n"}Enter your story idea
            above.
          </Text>
        </View>
      )}

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "User" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.content}</Text>
            {item.sender === "AI" && (
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => handleSpeak(item.content)}>
                  <Ionicons
                    name={
                      isSpeaking ? "volume-high-outline" : "volume-mute-outline"
                    }
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCopy(item.content)}>
                  <Feather
                    name="copy"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare(item.content)}>
                  <AntDesign
                    name="sharealt"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />

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
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  chatContainer: {
    paddingBottom: 20,
  },
  instruction: {
    color: "#f5f6fa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userBubble: {
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#2F3C7E",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#F4F4F4",
    fontSize: 15,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    marginRight: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginVertical: 30,
  },
  input: {
    flex: 1,
    backgroundColor: "#40416A",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "rgb(30, 144, 255)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default StoryGenerator;
