import { Stack } from "expo-router";

const PlaceNavigationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(place-archive)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PlaceNavigationLayout;
