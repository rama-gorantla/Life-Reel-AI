// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   FlatList,
//   Platform,
// } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   MaterialIcons,
//   Feather,
// } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import LottieView from "lottie-react-native";
// import BottomNavigation from "./bottomNavigations";
// import * as Speech from "expo-speech";
// import * as Clipboard from "expo-clipboard";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";

// interface Message {
//   sender: string;
//   content: string;
// }

// const StoryGenerator = () => {
//   const router = useRouter();
//   const [idea, setIdea] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [lastFiveLines, setLastFiveLines] = useState<string>("");
//   const [previousUserRequest, setPreviousUserRequest] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const isValidIdea = (text: string) => {
//     return text && text.trim().split(" ").length >= 5;
//   };

//   const handleGenerate = async () => {
//     setError("");
//     setLoading(true);

//     if (!isValidIdea(idea)) {
//       setLoading(false);
//       setError("Please enter a more descriptive story idea (minimum 5 words).");
//       return;
//     }

//     setMessages((prev) => [...prev, { sender: "User", content: idea }]);
//     setIdea("");
//     setPreviousUserRequest(idea); // <-- Move this here!
//     try {
//       await fetchStructuredStoryFromOllama(idea);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStructuredStoryFromOllama = async (idea: string) => {
//     try {
//       const chatHistory = `User(previous): ${previousUserRequest}\n AI:${lastFiveLines}\n User:Generate a structured story based on the above context. Don't ask additional questions ${idea}\nAI: `;

//       const response = await fetch("http://localhost:11434/api/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "deepseek-r1:1.5b",
//           prompt: chatHistory,
//           stream: true,
//         }),
//       });

//       if (!response.body) throw new Error("No response body from the server.");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");
//       let done = false;
//       let buffer = "";
//       let insideThinkTag = false;
//       let aiResponse = "";

//       while (!done) {
//         const { value, done: readerDone } = await reader.read();
//         done = readerDone;

//         if (value) {
//           const chunk = decoder.decode(value, { stream: true });
//           buffer += chunk;
//           const lines = buffer.split("\n");
//           buffer = lines.pop() || "";

//           for (const line of lines) {
//             try {
//               const parsed = JSON.parse(line.trim());
//               if (parsed.response) {
//                 let responseText = parsed.response;
//                 responseText = responseText
//                   .replace(/\\u003c/g, "<")
//                   .replace(/\\u003e/g, ">");

//                 if (responseText.includes("<think>")) insideThinkTag = true;
//                 if (insideThinkTag) {
//                   if (responseText.includes("</think>")) {
//                     insideThinkTag = false;
//                     responseText = responseText.split("</think>")[1] || "";
//                   } else continue;
//                 }

//                 aiResponse += responseText;

//                 setMessages((prevMessages) => {
//                   const updated = [...prevMessages];
//                   const last = updated[updated.length - 1];
//                   if (last?.sender === "AI") last.content += responseText;
//                   else updated.push({ sender: "AI", content: responseText });
//                   return updated;
//                 });
//               }
//             } catch (err) {
//               console.error("Parsing error:", err);
//             }
//           }
//         }
//       }

//       const lastLines = aiResponse.split("\n").slice(-5).join("\n");
//       setLastFiveLines(lastLines);
//     } catch (err) {
//       setError("Error generating story.");
//     }
//   };

//   const handleSpeak = (text: string) => {
//     if (isSpeaking) {
//       Speech.stop();
//       setIsSpeaking(false);
//     } else {
//       Speech.speak(text, {
//         onDone: () => setIsSpeaking(false),
//         onStopped: () => setIsSpeaking(false),
//       });
//       setIsSpeaking(true);
//     }
//   };

//   const handleCopy = async (text: string) => {
//     await Clipboard.setStringAsync(text);
//     alert("Copied to clipboard");
//   };
//   const handleShare = async (text: string) => {
//     const fileUri = FileSystem.documentDirectory + "story.txt";
//     await FileSystem.writeAsStringAsync(fileUri, text);
//     await Sharing.shareAsync(fileUri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() =>
//             router.canGoBack() ? router.back() : router.replace("/featuresPage")
//           }
//         >
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>📖 AI Story Generator</Text>
//       </View>

//       {messages.length === 0 && (
//         <View style={{ alignItems: "center", marginTop: 30 }}>
//           {Platform.OS === "web" ? (
//             <Image
//               source={require("../assets/images/read.gif")}
//               style={styles.gif}
//             />
//           ) : (
//             <LottieView
//               source={require("../assets/images/readAI.json")}
//               autoPlay
//               loop
//               style={styles.gif}
//             />
//           )}
//           <Text style={styles.instruction}>
//             Your AI storyteller is waiting... ✨{"\n"}Enter your story idea
//             above.
//           </Text>
//         </View>
//       )}

//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageBubble,
//               item.sender === "User" ? styles.userBubble : styles.aiBubble,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.content}</Text>
//             {item.sender === "AI" && (
//               <View style={styles.iconRow}>
//                 <TouchableOpacity onPress={() => handleSpeak(item.content)}>
//                   <Ionicons
//                     name={
//                       isSpeaking ? "volume-high-outline" : "volume-mute-outline"
//                     }
//                     size={20}
//                     color="#fff"
//                     style={styles.icon}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => handleCopy(item.content)}>
//                   <Feather
//                     name="copy"
//                     size={20}
//                     color="#fff"
//                     style={styles.icon}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleShare(item.content)}>
//                   <AntDesign
//                     name="sharealt"
//                     size={20}
//                     color="#fff"
//                     style={styles.icon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//         contentContainerStyle={styles.chatContainer}
//       />

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your story idea..."
//           placeholderTextColor="#ccc"
//           value={idea}
//           onChangeText={setIdea}
//           multiline
//         />
//         <TouchableOpacity style={styles.button} onPress={handleGenerate}>
//           <Text style={styles.buttonText}>
//             {loading ? "Generating..." : "Send"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <BottomNavigation />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1B1C36",
//     paddingHorizontal: 16,
//     paddingTop: 25,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   chatContainer: {
//     paddingBottom: 20,
//   },
//   instruction: {
//     color: "#f5f6fa",
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   messageBubble: {
//     padding: 0,
//     borderRadius: 10,
//     marginVertical: 6,
//     maxWidth: "100%",
//   },
//   userBubble: {
//     alignSelf: "flex-end",
//         backgroundColor: "#00cec9", // keep user bubble colored and right-alignedAdd commentMore actions
//     padding: 12,                
//   },
//   aiBubble: {
//     // backgroundColor: "#2F3C7E",
//     // alignSelf: "flex-start",

//      backgroundColor: "transparent", // invisible backgroundAdd commentMore actions
//     alignSelf: "flex-start",
//     width: "100%",                  // fill the width
//     padding: 0,                     // no extra padding
//     marginLeft: 0,
//     marginRight: 0,
//   },
//   messageText: {
//     color: "#F4F4F4",
//     fontSize: 15,
//   },
//   iconRow: {
//     flexDirection: "row",
//     marginTop: 8,
//   },
//   icon: {
//     marginRight: 16,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 12,
//     marginVertical: 30,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#40416A",
//     color: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: "rgb(30, 144, 255)",
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginLeft: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   gif: {
//     width: 200,
//     height: 200,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
// });

// export default StoryGenerator;
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
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
// import PosterBg from "@/assets/images/istockphoto-522119064.jpg";
// import PosterBg from "../assets/images/istockphoto-522119064.jpg";
import { ImageBackground } from "react-native";
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

  // Poster modal state
  const [posterVisible, setPosterVisible] = useState(false);
  const [posterPages, setPosterPages] = useState<string[]>([]);
  const [posterPageIndex, setPosterPageIndex] = useState(0);
  const [posterModalKey, setPosterModalKey] = useState(0);
  const screenWidth = Dimensions.get("window").width;

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
    setPreviousUserRequest(idea); // <-- Move this here!
    try {
      await fetchStructuredStoryFromOllama(idea);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStructuredStoryFromOllama = async (idea: string) => {
    try {
      let chatHistory = "";
      if (!previousUserRequest) {
        // First request
        chatHistory = `User:Generate a structured story based on the above context. Don't ask additional questions. It should start with Title: ${idea}\nAI: `;
      } else {
        // Subsequent requests
        chatHistory = `User(previous): ${previousUserRequest}\nAI:${lastFiveLines}\nUser: Generate a structured story based on the above context. Don't ask additional questions. It should start with Title: ${idea}\nAI: `;
      }
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

  // --- Poster logic ---
  const handleMakePoster = (answer: string) => {
    // Assume the first line is the title, rest is the story
    const lines = answer.split('\n').filter(l => l.trim() !== '');
    const title = lines[0];
    const story = lines.slice(1).join(' ');
    // Split story into chunks of ~50 words for each poster page
    const words = story.split(' ');
    const pages = [];
    let chunk = '';
    let wordCount = 0;
    for (let word of words) {
      chunk += (chunk ? ' ' : '') + word;
      wordCount++;
      if (wordCount >= 100) {
        pages.push(chunk.trim());
        chunk = '';
        wordCount = 0;
      }
    }
    if (chunk.trim()) pages.push(chunk.trim());
    setPosterPages([title, ...pages]);
    setPosterPageIndex(0);
    setPosterModalKey(prev => prev + 1); // Change key to force remount
    setPosterVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Poster Modal */}
      <Modal
        key={posterModalKey}
        visible={posterVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setPosterVisible(false);
          setPosterPages([]);
          setPosterPageIndex(0);
          setPosterModalKey(prev => prev + 1); 
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#1B1C36" }}>
          <TouchableOpacity
            style={{ padding: 16, alignSelf: "flex-end" }}
            onPress={() => {
              setPosterVisible(false);
              setPosterPages([]);
              setPosterPageIndex(0);
              setPosterModalKey(prev => prev + 1); // <-- Add this line
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            onScroll={e => {
              const page = Math.round(
                e.nativeEvent.contentOffset.x / screenWidth
              );
              setPosterPageIndex(page);
            }}
            scrollEventThrottle={16}
          >
            {posterPages.map((text, idx) => (
              <View
                key={idx}
                style={{
                  width: screenWidth,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 24,
                }}
              >
                <ImageBackground
                  source={require("../assets/images/istockphoto-522119064.jpg")}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 400, // fixed height to avoid cropping
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 24,
                    overflow: "hidden",
                  }}
                  imageStyle={{
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(35, 39, 47, 0.5)",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 24,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: idx === 0 ? 28 : 20,
                        fontWeight: idx === 0 ? "bold" : "normal",
                        textAlign: "center",
                        textShadowColor: "#000",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 4,
                      }}
                    >
                      {text}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
          {/* Page Indicator */}
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <Text style={{ color: "#fff" }}>
              Page {posterPageIndex + 1} of {posterPages.length}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 4 }}>
              {posterPages.map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: idx === posterPageIndex ? "#fff" : "#555",
                    marginHorizontal: 3,
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/featuresPage")
          }
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>AI Story Generator</Text>
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
                {/* Make Poster Button */}
                <TouchableOpacity
                  onPress={() => handleMakePoster(item.content)}
                  style={{
                    backgroundColor: "#23272f",
                    borderRadius: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    marginTop: 8,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Make Poster
                  </Text>
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
    backgroundColor: "#0F1123",
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
    textAlign: "center",
    flex: 1, // Center the title

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
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: "100%",
    padding: 0, // Remove padding here for edge-to-edge effect
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#00cec9", // keep user bubble colored and right-aligned
    padding: 12,                // keep padding for user bubble
  },
  aiBubble: {
    backgroundColor: "transparent", // invisible background
    alignSelf: "flex-start",
    width: "100%",                  // fill the width
    padding: 0,                     // no extra padding
    marginLeft: 0,
    marginRight: 0,
  },
  messageText: {
    color: "#F4F4F4",
    fontSize: 15,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 8,
    flexWrap: "wrap",
    gap: 8,
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