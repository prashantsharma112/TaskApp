import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function AppointmentsScreen({ appointments, currentUserEmail, onCancel }) {
  const userAppts = appointments.filter(a => a.userEmail === currentUserEmail);
  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      {userAppts.length === 0 && <Text style={{ color: '#666' }}>No upcoming appointments</Text>}
      {userAppts.map((a) => (
        <View key={a.id} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{a.providerName}</Text>
            <Text style={styles.cardSubtitle}>{a.time}</Text>
          </View>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(a.id)}>
            <Text style={{ color: '#fff' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8, flexDirection: 'row', elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSubtitle: { color: '#666' },
  cancelBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 6, justifyContent: 'center' },
});
