import { Stack } from "expo-router";

const ExploreLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen
        name="place-detail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ExploreLayout;
