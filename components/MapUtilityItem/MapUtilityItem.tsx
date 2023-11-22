import { View, Text, Pressable, Dimensions } from "react-native";
import React, { FC, useState } from "react";
import {
  ArchiveBoxIcon,
  MapIcon,
  SignalIcon,
} from "react-native-heroicons/outline";
import { router } from "expo-router";
import { makeStyles } from "@rneui/themed";
import { Place } from "../../types/map";
import { theme } from "../../styles/theme";

const { height } = Dimensions.get("window");
const tablet = Dimensions.get("window").width > 640 ? true : false;

interface MapUtilityItemProps {
  //   handleMapUtilities: (type: "journey" | "nearby" | "storage") => void;
  coordinates: Place;
}

export const MapUtilityItem: FC<MapUtilityItemProps> = (props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/journese",
            params: {
              long: props.coordinates[0],
              lat: props.coordinates[1],
            },
          })
        }
      >
        <View>
          <MapIcon
            size={tablet ? 50 : 40}
            color={theme.lightColors?.brand?.primary?.[500]}
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/place-nearby",
            params: {
              long: props.coordinates[0],
              lat: props.coordinates[1],
            },
          })
        }
      >
        <View>
          <SignalIcon
            size={tablet ? 50 : 40}
            color={theme.lightColors?.brand?.primary?.[500]}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => router.push("/storage")}>
        <View>
          <ArchiveBoxIcon
            size={tablet ? 50 : 40}
            color={theme.lightColors?.brand?.primary?.[500]}
          />
        </View>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    position: "absolute",
    right: 3,
    top: height / 3,
    gap: 3,
  },
}));
