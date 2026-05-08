import { AuthApi } from '@/src/auth/AuthApi';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1A3A5C',
        headerStyle: { backgroundColor: '#1A3A5C' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },

        headerRight: () => (
          <TouchableOpacity
            onPress={async () => {
              await AuthApi.logout();
              router.replace('/(auth)/login');
            }}
            style={{ marginRight: 15 }}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="list"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-dish"
        options={{
          title: 'Agregar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}