import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { Image, Text, makeStyles } from "@rneui/themed";
import { Place } from "../../types/place";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("screen");

export const LoadingScreen: FC = ({}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journese</Text>
      <LottieView
        source={require("../../assets/lotties/loading_animation.json")}
        style={{
          position: "absolute",
          width: "100%",
          height: "25%",
          // backgroundColor: "red",
          bottom: "28%",
        }}
        colorFilters={[
          { color: "#18A4AE", keypath: "Dot4" },
          { color: "#18A4AE", keypath: "Dot3" },
          { color: "#18A4AE", keypath: "Dot2" },
          { color: "#18A4AE", keypath: "Dot1" },
        ]}
        autoPlay
        loop
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  title: {
    // fontFeatureSettings: "'clig' off, 'liga' off",
    fontSize: 48,
    fontWeight: "500",
    color: theme.colors.brand.primary[700],
  },
}));
