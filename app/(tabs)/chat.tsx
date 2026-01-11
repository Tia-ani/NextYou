import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lifestyleData } from "@/constants/lifestyle";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/chat"
    : "http://localhost:3000/chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [daysUsingApp, setDaysUsingApp] = useState(0);

  // ---- USAGE DURATION LOGIC ----
  useEffect(() => {
    const initUsage = async () => {
      const firstLaunch = await AsyncStorage.getItem("firstLaunchDate");

      if (!firstLaunch) {
        const today = new Date().toISOString();
        await AsyncStorage.setItem("firstLaunchDate", today);
        setDaysUsingApp(0);
      } else {
        const diff =
          (Date.now() - new Date(firstLaunch).getTime()) /
          (1000 * 60 * 60 * 24);
        setDaysUsingApp(Math.floor(diff));
      }
    };

    initUsage();
  }, []);

  // ---- SEND MESSAGE ----
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // ✅ DEMO CONTEXT (MANDATORY REQUIREMENT)
    const personality = "encouragement_seeker"; // hardcoded for demo

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          personality,
          daysUsingApp,
          lifestyle: lifestyleData,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: Date.now().toString() + "_ai",
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ---- RENDER MESSAGE (STRUCTURED OUTPUT) ----
  const renderItem = ({ item }: { item: Message }) => {
    const lines = item.content.split("\n").filter(Boolean);

    return (
      <View
        style={[
          styles.message,
          item.role === "user" ? styles.user : styles.assistant,
        ]}
      >
        {lines.map((line, index) => (
          <Text key={index} style={styles.messageText}>
            {line.startsWith("-") || line.startsWith("•")
              ? "• " + line.replace(/^[-•]\s*/, "")
              : line}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chat}
      />

      {loading && <ActivityIndicator style={{ marginBottom: 8 }} />}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask something about fitness..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---- STYLES ----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chat: {
    paddingBottom: 16,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  messageText: {
    marginBottom: 4,
    lineHeight: 20,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  assistant: {
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E6",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  sendButton: {
    marginLeft: 8,
    padding: 12,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
  },
});
