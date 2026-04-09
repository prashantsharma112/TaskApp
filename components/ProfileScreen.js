import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ user, onLogout }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>{user.name}</Text>
      <Text style={{ marginBottom: 16, color: '#555' }}>{user.email}</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#b52' }]} onPress={onLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#2574ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
