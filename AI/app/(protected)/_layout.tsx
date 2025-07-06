import AuthGuard from '../_authGuard';
import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}