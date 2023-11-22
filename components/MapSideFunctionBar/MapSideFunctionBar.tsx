import { View } from "react-native";
import React, { FC } from "react";
import { Button, makeStyles } from "@rneui/themed";
import { IconCurrentLocation, IconArchive } from "tabler-icons-react-native";
import { router } from "expo-router";

interface MapSideFunctionBarProps {
  onNearbyPress: () => void;
}

export const MapSideFunctionBar: FC<MapSideFunctionBarProps> = ({
  onNearbyPress,
}) => {
  const styles = useStyles();
  const handleArchiePress = () => {
    router.push(
      "/(tabs)/(trip)/(place-navigation)/(place-archive)/place-archive"
    );
  };
  return (
    <View style={styles.container}>
      <Button
        type="outline"
        icon={<IconArchive size={30} />}
        onPress={handleArchiePress}
      />
      <Button
        onPress={onNearbyPress}
        icon={<IconCurrentLocation size={30} />}
        type="outline"
      />
      {/* <Button title="hello" /> */}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "40%",
    right: 11,
    gap: 10,
  },
}));
