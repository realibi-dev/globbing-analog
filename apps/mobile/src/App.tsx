import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Globbing Mobile</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' },
  title: { fontSize: 28, fontWeight: '700', color: '#0284c7' },
  subtitle: { fontSize: 16, color: '#9ca3af', marginTop: 8 },
})
