import { View, Text } from "react-native";
import React, { FC } from "react";
import { makeStyles } from "@rneui/themed";
import { Step } from "@mapbox/mapbox-sdk/services/directions";

interface MapAttachInforProps {
  duration: number;
  steps: Step[];
  distance: number;
}

const MapAttachInfor: FC<MapAttachInforProps> = ({
  distance,
  duration,
  steps,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.modal}>
      <Text>{distance / 1000} km</Text>
      <Text>{Math.floor(duration / 60)} phut</Text>
      <View>
        {steps.map((step, index) => {
          return (
            <View key={index}>
              <Text>{step.maneuver?.instruction}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: 50,
  },
}));
export default MapAttachInfor;
