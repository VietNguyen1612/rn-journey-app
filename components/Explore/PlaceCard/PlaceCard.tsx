import { Pressable, View } from "react-native";
import React from "react";
import { Button, Image, Text, makeStyles, useTheme } from "@rneui/themed";
import {
  IconClockHour4,
  IconGasStation,
  IconRoad,
  IconStarFilled,
  IconStarHalfFilled,
} from "tabler-icons-react-native";
import { Place } from "../../../types/place";
import { router } from "expo-router";

const PlaceCard = ({
  item,
  addToArchive,
}: {
  item: Place;
  addToArchive: () => void;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const onPress = () => {
    router.push({
      pathname: "/(tabs)/(explore)/place-detail",
      params: { placeId: item.placeId, id: item._id },
    });
  };

  const renderRating = (rating: number) => {
    const flooredRating = Math.floor(rating);
    return (
      <>
        {Array(flooredRating)
          .fill(0)
          .map((_, index) => (
            <IconStarFilled
              color={
                item.rating >= index + 1
                  ? theme.colors.brand.yellow[500]
                  : theme.colors.brand.neutral[50]
              }
              size={16}
              key={index}
            />
          ))}
        {item.rating % 1 !== 0 && (
          <IconStarHalfFilled
            color={theme.colors.brand.yellow[500]}
            size={16}
          />
        )}
      </>
    );
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{ width: "100%", height: "100%" }}
          borderRadius={10}
          source={{ uri: item.thumbnail }}
        />
      </View>
      <View style={styles.content}>
        <Text textL semiBold>
          {item.name}
        </Text>
        <Text style={styles.address}>
          <Text style={styles.addressTextTitle}>Địa chỉ:&nbsp;</Text>
          {item.city},{item.province}
        </Text>
        <View style={styles.rating}>
          <Text>{item.rating}</Text>
          {renderRating(item.rating)}
          <Text>({item.reviews})</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detail}>
            <IconRoad size={12} color={theme.colors.brand.neutral[500]} />
            <Text style={styles.detailText}>600km</Text>
          </View>
          <View style={styles.detail}>
            <IconClockHour4 size={12} color={theme.colors.brand.neutral[500]} />
            <Text style={styles.detailText}>10 tiếng</Text>
          </View>
          <View style={styles.detail}>
            <IconGasStation size={12} color={theme.colors.brand.neutral[500]} />
            <Text style={styles.detailText}>6 lít</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonGroupContainer}>
        <View style={{ width: "48%" }}>
          <Button
            buttonStyle={styles.buttonContainer}
            type="outline"
            title={"Đưa vào lưu trữ"}
            titleStyle={{ fontSize: 16 }}
            onPress={addToArchive}
          />
        </View>
        <View style={{ width: "48%" }}>
          <Button
            onPress={() => {
              router.push("/(subscription)/free-limit");
            }}
            buttonStyle={styles.buttonContainer}
            title={"Đưa vào hành trình"}
            titleStyle={{ fontSize: 16 }}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default PlaceCard;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 8,
    paddingBottom: 12,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colors.brand.neutral[50],
    gap: 8,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    paddingHorizontal: 4,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  title: {
    color: theme.colors.brand.neutral[800],
  },
  address: {
    fontSize: 12,
    color: theme.colors.brand.neutral[500],
    fontWeight: "600",
  },
  addressTextTitle: {
    fontWeight: "400",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.brand.neutral[900],
    fontWeight: "400",
  },
  buttonGroupContainer: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },
  buttonContainer: {
    borderRadius: 56,
  },
}));
