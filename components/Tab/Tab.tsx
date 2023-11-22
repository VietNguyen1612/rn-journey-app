import { makeStyles } from "@rneui/themed";
import React from "react";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
interface TabButtonProps {
  type?: "button" | "highlight" | undefined;
  isActive: boolean;
  icon?: React.ReactElement;
  title?: React.ReactElement;
  onPress: () => void;
}

const tablet = Dimensions.get("window").width > 640 ? true : false;

export const Tab: React.FC<TabButtonProps> = (props) => {
  const styles = useStyles(props);
  return (
    <Pressable onPress={props.onPress} style={styles.tabContainer}>
      {props.icon &&
        React.cloneElement(props.icon, {
          color: styles.tabIcon.backgroundColor,
        })}
      {props.title &&
        React.cloneElement(props.title, {
          style: styles.tabTitle,
        })}
    </Pressable>
  );
};

const useStyles = makeStyles((_, props: TabButtonProps) => ({
  tabContainer:
    props.type === "button"
      ? {
          backgroundColor: props.isActive
            ? _.colors.brand.primary[500]
            : "white",
          paddingVertical: tablet ? 12 : 10,
          paddingHorizontal: tablet ? 38 : 28,
          justifyContent: "center",
          width: "auto",
          borderRadius: 12,
        }
      : {
          borderBottomColor: _.colors.brand.primary[500],
          borderBottomWidth: props.isActive ? 3 : 0,
          paddingVertical: tablet ? 12 : 10,
          paddingHorizontal: tablet ? 38 : 22,
        },
  tabIcon: {
    backgroundColor: props.isActive ? "white" : _.colors.brand.primary[500],
  },
  tabTitle: {
    fontSize: tablet ? 24 : 16,
    fontWeight: props.isActive ? "600" : "normal",
  },
}));
