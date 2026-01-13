import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HistoryItem {
  role: "user" | "assistant";
  message: string;
  created_at: string;
}

const API_URL = "https://nextyou-1.onrender.com/history";

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderItem = ({ item, index }: { item: HistoryItem; index: number }) => {
    const showTimestamp = index === 0 || 
      history[index - 1]?.created_at !== item.created_at;

    return (
      <View>
        {showTimestamp && (
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>
              {formatTime(item.created_at)}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.item,
            item.role === "user" ? styles.user : styles.assistant,
          ]}
        >
          <View style={styles.roleContainer}>
            <View style={[
              styles.roleBadge,
              item.role === "user" ? styles.userBadge : styles.assistantBadge
            ]}>
              <Text style={styles.roleEmoji}>
                {item.role === "user" ? "👤" : "🤖"}
              </Text>
            </View>
            <Text style={[
              styles.roleText,
              item.role === "user" ? styles.userRoleText : styles.assistantRoleText
            ]}>
              {item.role === "user" ? "You" : "AI Coach"}
            </Text>
          </View>
          <Text style={[
            styles.messageText,
            item.role === "user" ? styles.userMessageText : styles.assistantMessageText
          ]}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Chat History</Text>
          <Text style={styles.headerSubtitle}>
            {history.length > 0 
              ? `${history.length} message${history.length !== 1 ? 's' : ''}`
              : 'No messages yet'
            }
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1D3D47" />
          <Text style={styles.loadingText}>Loading history...</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyTitle}>No History Yet</Text>
              <Text style={styles.emptyText}>
                Your conversation history will appear here once you start chatting with your AI fitness coach.
              </Text>
            </View>
          }
        />
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },
  timestampContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E8E93",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  item: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  user: {
    backgroundColor: "#1D3D47",
    marginLeft: 40,
  },
  assistant: {
    backgroundColor: "#FFFFFF",
    marginRight: 40,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  roleBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  userBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  assistantBadge: {
    backgroundColor: "#F8F9FA",
  },
  roleEmoji: {
    fontSize: 14,
  },
  roleText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  userRoleText: {
    color: "#FFFFFF",
  },
  assistantRoleText: {
    color: "#1D3D47",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  assistantMessageText: {
    color: "#1D3D47",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
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
  },
});