import { Stack } from "expo-router";

const TripLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="trip" options={{ headerShown: false }} />
      <Stack.Screen
        name="place-nearby"
        options={{
          presentation: "modal",
          title: "Địa điểm gần tôi",
        }}
      />
      <Stack.Screen
        name="place-detail"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(place-navigation)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default TripLayout;
