import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { Image, Platform, StatusBar, StyleSheet, View } from "react-native";

export default function HomeScreen() {
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
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionIcon}>✨</ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            What I Can Help With
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🏋️</ThemedText>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>Workout Plans</ThemedText>
            <ThemedText style={styles.featureText}>
              Personalized routines tailored to your goals
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🔥</ThemedText>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>Motivation</ThemedText>
            <ThemedText style={styles.featureText}>
              Stay inspired and push through challenges
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>📈</ThemedText>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>Habit Building</ThemedText>
            <ThemedText style={styles.featureText}>
              Develop consistency and track your progress
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Disclaimer Section */}
      <View style={styles.disclaimerSection}>
        <View style={styles.disclaimerHeader}>
          <ThemedText style={styles.disclaimerIcon}>⚠️</ThemedText>
          <ThemedText style={styles.disclaimerTitle}>Important</ThemedText>
        </View>
        <ThemedText style={styles.disclaimerText}>
          I'm not a medical professional. I can't provide advice on injuries,
          diseases, medications, or supplements.
        </ThemedText>
      </View>

      {/* CTA Button */}
      <Link href="/chat" style={styles.ctaButton} asChild>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Start Your Journey</ThemedText>
          <ThemedText style={styles.buttonArrow}>→</ThemedText>
        </View>
      </Link>

      {/* Footer */}
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Ready when you are
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  hero: {
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1D3D47",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#1D3D47",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  heroImage: {
    width: 42,
    height: 42,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1D3D47",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  sectionIcon: {
    fontSize: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D3D47",
  },

  featureCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    gap: 16,
    elevation: 2,
  },

  featureIcon: {
    fontSize: 32,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 4,
  },

  featureText: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
  },

  disclaimerSection: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#FFF9E6",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginBottom: 24,
  },

  disclaimerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },

  disclaimerIcon: {
    fontSize: 18,
  },

  disclaimerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D3D47",
  },

  disclaimerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  ctaButton: {
    marginHorizontal: 24,
    marginBottom: 16,
  },

  buttonContainer: {
    backgroundColor: "#1D3D47",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 24,
  },

  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },

  footerText: {
    fontSize: 13,
    color: "#8E8E93",
    fontStyle: "italic",
  },
});
