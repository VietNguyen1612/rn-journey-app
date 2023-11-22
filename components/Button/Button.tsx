import React, { FC } from "react";
import {
  Button as RNEButton,
  ButtonProps as RNEButtonProps,
  makeStyles,
} from "@rneui/themed";

interface ButtonType extends RNEButtonProps {}

export const Button: FC<ButtonType> = (props) => {
  const styles = useStyles();
  return (
    <RNEButton
      {...props}
      containerStyle={styles.container}
      titleStyle={styles.titleStyle}
    />
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    borderRadius: 56,
  },
  titleStyle: {
    fontWeight: "600",
  },
}));
