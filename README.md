# Service Booking App (React Native + Expo)

Simple mobile app for service booking with local persistence.

## Features
- User registration and login
- Registered users are saved in device local storage
- On app restart, users can log in again using previously registered credentials
- Service provider list with details
- Appointment booking by selecting provider and time slot
- Appointment conflict check (same user cannot book same time twice)
- Appointment list and cancel action

## Storage Behavior
- Uses `expo-file-system` to save app data in a local JSON file
- Persisted data:
  - Users
  - Appointments
- Session is not auto-restored intentionally (app opens on auth flow; user logs in again)
- Includes default demo user if no stored users exist:
  - `demo@example.com` / `password`

## Project Structure
- `App.js` - app state, auth logic, storage load/save, navigation tabs
- `components/AuthScreen.js` - login/register form
- `components/ProviderList.js` - providers list UI
- `components/ProviderModal.js` - provider details + slots
- `components/AppointmentsScreen.js` - user appointments + cancel
- `components/ProfileScreen.js` - user info + logout

## Run Locally
1. Install dependencies:
```bash
npm install
```

2. Start Expo:
```bash
npx expo start
```

3. Open in Expo Go or emulator.

## Optional Android Build (EAS)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
