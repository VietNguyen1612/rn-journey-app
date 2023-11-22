import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View } from "react-native";
import {
  MapIcon,
  UserCircleIcon,
  BellIcon,
  HomeIcon,
  StarIcon,
} from "react-native-heroicons/solid";

import { useTheme } from "@rneui/themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              size={30}
              color={
                focused
                  ? theme.colors.brand.primary[500]
                  : theme.colors.brand.neutral[300]
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          tabBarIcon: ({ focused }) => (
            <StarIcon
              size={30}
              color={
                focused
                  ? theme.colors.brand.primary[500]
                  : theme.colors.brand.neutral[300]
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(trip)"
        options={{
          tabBarIcon: (props) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <View
              style={{
                position: "absolute",
                top: "-55%",
              }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.brand.primary[600],
                  borderRadius: 9999,
                  padding: 14,
                }}
              >
                <MapIcon {...props} size={35} color="white" />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(message)"
        options={{
          tabBarIcon: ({ focused }) => (
            <BellIcon
              size={30}
              color={
                focused
                  ? theme.colors.brand.primary[500]
                  : theme.colors.brand.neutral[300]
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarIcon: ({ focused }) => (
            <UserCircleIcon
              size={30}
              color={
                focused
                  ? theme.colors.brand.primary[500]
                  : theme.colors.brand.neutral[300]
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
