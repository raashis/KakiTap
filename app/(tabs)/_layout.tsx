import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header globally, or set to true if you want headers
      }}
    >
      {/* You can add <Stack.Screen ... /> here if you want to customize screens */}
    </Stack>
  );
}
