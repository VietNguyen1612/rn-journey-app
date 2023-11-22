import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="account-menu" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="friend-request" options={{ headerShown: false }} />
      <Stack.Screen name="journey" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
