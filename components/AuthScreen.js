import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthScreen({ mode, setMode, name, setName, email, setEmail, password, setPassword, onSubmit }) {
  return (
    <View style={styles.authBox}>
      {mode === 'register' && (
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      )}
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{mode === 'login' ? 'Log In' : 'Register & Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        <Text style={styles.link}>{mode === 'login' ? "Don't have an account? Register" : 'Already have account? Log in'}</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 12 }}>
        <Text style={{ color: '#666' }}>Quick demo login: demo@example.com / password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authBox: { padding: 16, margin: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginBottom: 8 },
  button: { backgroundColor: '#2574ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#2574ff', marginTop: 8, textAlign: 'center' },
});
