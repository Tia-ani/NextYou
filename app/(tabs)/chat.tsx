import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { fitnessFAQ } from "@/constants/fitnessFAQ";
import { lifestyleData } from "@/constants/lifestyle";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const LOCAL_IP = "11.6.2.72";
const API_URL = `http://${LOCAL_IP}:3000/chat`;


type Personality =
  | "encouragement_seeker"
  | "creative_explorer"
  | "goal_finisher";

const getRelevantFAQs = (userMessage: string) => {
  const lower = userMessage.toLowerCase();

  return fitnessFAQ
    .filter((faq) =>
      lower.includes(faq.question.split(" ")[0].toLowerCase())
    )
    .slice(0, 3);
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [daysUsingApp, setDaysUsingApp] = useState(0);
  const [personality, setPersonality] =
    useState<Personality>("encouragement_seeker");

  const [coins, setCoins] = useState(0);

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

  useEffect(() => {
    const loadCoins = async () => {
      const storedCoins = await AsyncStorage.getItem("coins");
      if (storedCoins) {
        setCoins(Number(storedCoins));
      }
    };

    loadCoins();
  }, []);

  const incrementCoins = async () => {
    const newCoins = coins + 1;
    setCoins(newCoins);
    await AsyncStorage.setItem("coins", newCoins.toString());
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    await incrementCoins();

    setInput("");
    setLoading(true);

    try {
      const relevantFAQs = getRelevantFAQs(userText);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          personality,
          daysUsingApp,
          lifestyle: lifestyleData,
          faqContext: relevantFAQs,
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
          <Text key={index} style={[
            styles.messageText,
            item.role === "user" ? styles.userText : styles.assistantText
          ]}>
            {line.startsWith("-") || line.startsWith("•")
              ? "• " + line.replace(/^[-•]\s*/, "")
              : line}
          </Text>
        ))}
      </View>
    );
  };

  const getPersonalityLabel = (type: Personality) => {
    switch (type) {
      case "encouragement_seeker":
        return "Encourager";
      case "creative_explorer":
        return "Creative";
      case "goal_finisher":
        return "Goal-Focused";
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Fitness AI</Text>
          <Text style={styles.headerSubtitle}>Your personal trainer</Text>
        </View>
        <View style={styles.coinBadge}>
          <Text style={styles.coinText}>🪙 {coins}</Text>
        </View>
      </View>

      {/* Personality Toggle */}
      <View style={styles.personalityContainer}>
        <Text style={styles.personalityLabel}>Coaching Style</Text>
        <View style={styles.personalityRow}>
          {(["encouragement_seeker", "creative_explorer", "goal_finisher"] as Personality[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.personalityButton,
                personality === type && styles.activePersonality,
              ]}
              onPress={() => setPersonality(type)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.personalityText,
                personality === type && styles.activePersonalityText
              ]}>
                {getPersonalityLabel(type)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chat}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>Start Your Journey</Text>
            <Text style={styles.emptyText}>
              Ask me anything about fitness, workouts, or building healthy habits!
            </Text>
          </View>
        }
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#1D3D47" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about workouts, nutrition, habits..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={[
              styles.sendButton,
              !input.trim() && styles.sendButtonDisabled
            ]}
            disabled={!input.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1D3D47",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  coinBadge: {
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  coinText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
  },
  personalityContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  personalityLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  personalityRow: {
    flexDirection: "row",
    gap: 10,
  },
  personalityButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E5EA",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  activePersonality: {
    backgroundColor: "#1D3D47",
    borderColor: "#1D3D47",
  },
  personalityText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
  },
  activePersonalityText: {
    color: "#FFFFFF",
  },
  chat: {
    padding: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  message: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#1D3D47",
    borderBottomRightRadius: 4,
  },
  userText: {
    color: "#FFFFFF",
  },
  assistant: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
  },
  assistantText: {
    color: "#1D3D47",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: "#8E8E93",
    fontStyle: "italic",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: "#1D3D47",
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: "#1D3D47",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1D3D47",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: "#E5E5EA",
    shadowOpacity: 0,
  },
  sendButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});