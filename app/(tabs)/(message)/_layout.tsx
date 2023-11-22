import { Stack } from "expo-router";

const MessageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="message" options={{ headerShown: false }} />
      <Stack.Screen name="room" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MessageLayout;
