import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { Image, Text, makeStyles, useTheme } from "@rneui/themed";
import { Place } from "../../types/place";
import LottieView from "lottie-react-native";
import { IconExclamationCircle } from "tabler-icons-react-native";

const { height, width } = Dimensions.get("screen");

interface SuccessProps {
  onPress: () => void;
  content: string;
  isSuccess: boolean;
}

export const Success: FC<SuccessProps> = ({ onPress, content, isSuccess }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <Pressable style={styles.successContainer} onPress={onPress}>
      <View style={styles.successWrapper}>
        {isSuccess ? (
          <LottieView
            source={require("../../assets/lotties/success_animation.json")}
            style={{ width: 80, aspectRatio: 1 / 1 }}
            autoPlay
            loop={false}
          />
        ) : (
          <IconExclamationCircle color="red" size={44} />
        )}
        <Text
          style={{
            fontSize: 22,
            color: isSuccess
              ? theme.colors?.brand?.primary?.[600]
              : theme.colors.brand.red[600],
          }}
        >
          {content}
        </Text>
      </View>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  successContainer: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  successWrapper: {
    backgroundColor: "white",
    paddingHorizontal: 60,
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 10,
    gap: 5,
  },
}));
