import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProviderModal({ provider, onClose, onBook }) {
  if (!provider) return null;
  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{provider.name}</Text>
        <Text style={{ color: '#666', marginBottom: 8 }}>{provider.category}</Text>
        <Text style={{ marginBottom: 12 }}>{provider.bio}</Text>
        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Available slots</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {provider.slots.map((s) => (
            <TouchableOpacity key={s} style={styles.slot} onPress={() => onBook(provider, s)}>
              <Text>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onClose} style={[styles.button, { marginTop: 12 }]}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: { position: 'absolute', left: 0, right: 0, top: 80, bottom: 40, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '92%', backgroundColor: '#fff', padding: 16, borderRadius: 8, elevation: 3 },
  slot: { padding: 8, borderRadius: 6, backgroundColor: '#eef', marginRight: 8, marginBottom: 8 },
  button: { backgroundColor: '#2574ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
