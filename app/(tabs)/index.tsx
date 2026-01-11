import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Image, Platform, Pressable, StatusBar, StyleSheet, View } from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.iconContainer}>
          <Image
            source={require("@/assets/images/yoga-pose.png")}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <ThemedText type="title" style={styles.title}>
          Fitness AI Coach
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Your personalized AI companion for workouts, motivation, and healthy habits
        </ThemedText>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🏋️</ThemedText>
          <View>
            <ThemedText style={styles.featureTitle}>Workout Plans</ThemedText>
            <ThemedText style={styles.featureText}>
              Personalized routines tailored to your goals
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🔥</ThemedText>
          <View>
            <ThemedText style={styles.featureTitle}>Motivation</ThemedText>
            <ThemedText style={styles.featureText}>
              Stay inspired and push through challenges
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>📈</ThemedText>
          <View>
            <ThemedText style={styles.featureTitle}>Habit Building</ThemedText>
            <ThemedText style={styles.featureText}>
              Build consistency and healthy routines
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <ThemedText style={styles.disclaimerText}>
          ⚠️ This is not a medical tool. No injury, disease, or medication advice.
        </ThemedText>
      </View>

      {/* CTA */}
      <Pressable
        style={styles.ctaButton}
        onPress={() => router.push("/chat")}>
        <ThemedText style={styles.ctaText}>Start Chat</ThemedText>
      </Pressable>


      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Ready when you are</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },

  hero: {
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    alignItems: "center",
    paddingBottom: 24,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1D3D47",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  heroImage: { width: 40, height: 40 },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1D3D47",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
    paddingHorizontal: 24,
  },

  section: { paddingHorizontal: 24, marginTop: 16 },

  featureCard: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  featureIcon: { fontSize: 28 },
  featureTitle: { fontSize: 16, fontWeight: "700", color: "#1D3D47" },
  featureText: { fontSize: 14, color: "#8E8E93" },

  disclaimer: {
    marginHorizontal: 24,
    padding: 12,
    backgroundColor: "#FFF4E5",
    borderRadius: 12,
    marginTop: 16,
  },

  disclaimerText: { fontSize: 13, color: "#666" },

  ctaButton: {
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: "#1D3D47",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  ctaText: { color: "#FFF", fontSize: 18, fontWeight: "700" },

  footer: { alignItems: "center", marginTop: 12 },
  footerText: { fontSize: 12, color: "#8E8E93" },
});
