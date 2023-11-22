import { TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { Image, Text, makeStyles } from "@rneui/themed";
import { Place } from "../../types/place";

interface PlaceCardProps {
  item: Place;
}

export const PlaceCard: FC<PlaceCardProps> = ({ item }) => {
  const styles = useStyles();
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{
              uri: item.thumbnail,
            }}
            style={styles.img}
          />
          <View style={styles.description}>
            <Text textM medium>
              {item.name}
            </Text>
            <View>
              <Text>{item.rating}</Text>
            </View>
          </View>
        </View>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.brand.neutral[100],
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  description: {
    maxWidth: 200,
    gap: 5,
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 5,
    aspectRatio: 1,
  },
  buttonFont: {
    fontSize: 16,
  },
}));
