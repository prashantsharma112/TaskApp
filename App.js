import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import AuthScreen from './components/AuthScreen';
import ProviderList from './components/ProviderList';
import ProviderModal from './components/ProviderModal';
import AppointmentsScreen from './components/AppointmentsScreen';
import ProfileScreen from './components/ProfileScreen';

// Simple mock data and in-memory storage for demonstration.
const MOCK_PROVIDERS = [
  {
    id: 'p1',
    name: 'Alice Johnson',
    category: 'Hair Stylist',
    bio: 'Experienced stylist specializing in modern cuts.',
    slots: ['09:00', '10:30', '13:00', '15:00'],
  },
  {
    id: 'p2',
    name: 'Bob Martinez',
    category: 'Massage Therapist',
    bio: 'Relaxing full-body massages for stress relief.',
    slots: ['08:00', '11:00', '14:00', '16:30'],
  },
  {
    id: 'p3',
    name: 'Clara Liu',
    category: 'Dentist',
    bio: 'Gentle dentistry with modern equipment.',
    slots: ['09:30', '12:00', '15:30'],
  },
];

const STORAGE_FILE_PATH = `${FileSystem.documentDirectory}service_booking_data.json`;

export default function App() {
  const [users, setUsers] = useState([]); // {email, password, name}
  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [screen, setScreen] = useState('providers'); // providers | appointments | profile

  const [providers] = useState(MOCK_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [appointments, setAppointments] = useState([]); // {id, providerId, providerName, time, userEmail}

  useEffect(() => {
    async function loadStoredData() {
      try {
        const fileInfo = await FileSystem.getInfoAsync(STORAGE_FILE_PATH);
        if (fileInfo.exists) {
          const rawData = await FileSystem.readAsStringAsync(STORAGE_FILE_PATH);
          const parsedData = JSON.parse(rawData);
          if (Array.isArray(parsedData?.users) && parsedData.users.length > 0) {
            setUsers(parsedData.users);
          } else {
            setUsers([{ email: 'demo@example.com', password: 'password', name: 'Demo User' }]);
          }

          if (Array.isArray(parsedData?.appointments)) {
            setAppointments(parsedData.appointments);
          }
        } else {
          // Pre-seed a demo user for quick testing when no local data exists.
          setUsers([{ email: 'demo@example.com', password: 'password', name: 'Demo User' }]);
        }
      } catch (error) {
        Alert.alert('Storage error', 'Could not read saved app data.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredData();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    FileSystem.writeAsStringAsync(
      STORAGE_FILE_PATH,
      JSON.stringify({ users, appointments })
    ).catch(() => {
      Alert.alert('Storage error', 'Could not save app data.');
    });
  }, [users, appointments, isLoading]);

  function handleRegister() {
    if (!email || !password || !name) {
      Alert.alert('All fields required');
      return;
    }
    if (users.find((u) => u.email === email)) {
      Alert.alert('User already exists');
      return;
    }
    const newUser = { email, password, name };
    setUsers((s) => [...s, newUser]);
    setCurrentUser(newUser);
    setEmail('');
    setPassword('');
    setName('');
    setScreen('providers');
  }

  function handleLogin() {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      Alert.alert('Invalid credentials');
      return;
    }
    setCurrentUser(user);
    setEmail('');
    setPassword('');
    setScreen('providers');
  }

  function handleLogout() {
    setCurrentUser(null);
    setScreen('providers');
  }

  function bookAppointment(provider, time) {
    if (!currentUser) {
      Alert.alert('Please log in to book an appointment');
      return;
    }
    // Check for conflicting appointment for same user
    const conflict = appointments.find((a) => a.userEmail === currentUser.email && a.time === time);
    if (conflict) {
      Alert.alert('You already have an appointment at this time');
      return;
    }
    const newAppt = {
      id: Date.now().toString(),
      providerId: provider.id,
      providerName: provider.name,
      time,
      userEmail: currentUser.email,
    };
    setAppointments((s) => [newAppt, ...s]);
    setSelectedProvider(null);
    Alert.alert('Booked', `Appointment with ${provider.name} at ${time}`);
  }

  function cancelAppointment(apptId) {
    Alert.alert('Cancel booking', 'Are you sure?', [
      { text: 'No' },
      {
        text: 'Yes',
        onPress: () => setAppointments((s) => s.filter((a) => a.id !== apptId)),
      },
    ]);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2574ff" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading saved data...</Text>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Service Booking App</Text>
        <AuthScreen
          mode={mode}
          setMode={setMode}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={mode === 'login' ? handleLogin : handleRegister}
        />
      </SafeAreaView>
    );
  }

  // Main app UI
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hello, {currentUser.name}</Text>
      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, screen === 'providers' && styles.activeTab]} onPress={() => setScreen('providers')}>
          <Text style={styles.tabText}>Providers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, screen === 'appointments' && styles.activeTab]} onPress={() => setScreen('appointments')}>
          <Text style={styles.tabText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, screen === 'profile' && styles.activeTab]} onPress={() => setScreen('profile')}>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {screen === 'providers' && (
        <ProviderList providers={providers} onView={(p) => setSelectedProvider(p)} />
      )}

      {screen === 'appointments' && (
        <AppointmentsScreen appointments={appointments} currentUserEmail={currentUser.email} onCancel={cancelAppointment} />
      )}

      {screen === 'profile' && (
        <ProfileScreen user={currentUser} onLogout={handleLogout} />
      )}

      <ProviderModal provider={selectedProvider} onClose={() => setSelectedProvider(null)} onBook={bookAppointment} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginTop: 24 },
  authBox: { padding: 16, margin: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginBottom: 8 },
  button: { backgroundColor: '#2574ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#2574ff', marginTop: 8, textAlign: 'center' },
  header: { fontSize: 18, fontWeight: '600', padding: 12 },
  tabRow: { flexDirection: 'row', paddingHorizontal: 12 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#2574ff' },
  tabText: { fontWeight: '600' },
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8, flexDirection: 'row', elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSubtitle: { color: '#666' },
  cardSmall: { color: '#666', marginTop: 6 },
  viewBtn: { backgroundColor: '#2574ff', padding: 8, borderRadius: 6 },
  cancelBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 6, justifyContent: 'center' },
  modal: { position: 'absolute', left: 0, right: 0, top: 80, bottom: 40, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '92%', backgroundColor: '#fff', padding: 16, borderRadius: 8, elevation: 3 },
  slot: { padding: 8, borderRadius: 6, backgroundColor: '#eef', marginRight: 8, marginBottom: 8 },
});
