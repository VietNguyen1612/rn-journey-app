import { Stack } from "expo-router";
import React from "react";

const SubscriptionLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="subscription-plan" options={{ headerShown: false }} />
      <Stack.Screen name="free-limit" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SubscriptionLayout;
