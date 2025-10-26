import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect unauthenticated users to VSL landing page
  // Authenticated users will be redirected to /(tabs) by the auth system
  return <Redirect href="/vsl" />;
}
