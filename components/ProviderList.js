import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function ProviderList({ providers, onView }) {
  return (
    <FlatList
      data={providers}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.category}</Text>
            <Text style={styles.cardSmall}>{item.bio}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity style={styles.viewBtn} onPress={() => onView(item)}>
              <Text style={{ color: '#fff' }}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8, flexDirection: 'row', elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSubtitle: { color: '#666' },
  cardSmall: { color: '#666', marginTop: 6 },
  viewBtn: { backgroundColor: '#2574ff', padding: 8, borderRadius: 6 },
});
