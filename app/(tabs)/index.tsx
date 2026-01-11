import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome</ThemedText>

      <ThemedText style={styles.text}>
        Your AI-powered fitness companion to help you with workouts,
        motivation, and healthy habits.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        What I can help with:
      </ThemedText>
      <ThemedText>• Workout plans</ThemedText>
      <ThemedText>• Fitness motivation</ThemedText>
      <ThemedText>• Consistency & habit building</ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        What I can’t help with:
      </ThemedText>
      <ThemedText>
        • Medical advice, injuries, diseases, medications, or supplements
      </ThemedText>

      <Link href="/chat" style={styles.button}>
        <ThemedText type="defaultSemiBold">Start Chat</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: 'center',
  },
  text: {
    marginTop: 8,
  },
  subtitle: {
    marginTop: 16,
  },
  button: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#A1CEDC',
    alignItems: 'center',
  },
});
