import { Stack } from "expo-router";

const PlaceArchiveLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="place-archive"
        options={{
          title: "Mục lưu trữ",
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen name="[archive-detail]" options={{ headerShown: false }} />
      <Stack.Screen name="create-trip" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-archive"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PlaceArchiveLayout;
