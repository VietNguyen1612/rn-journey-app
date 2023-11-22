import { Pressable, View } from "react-native";
import React, { FC, memo } from "react";
import { Text, Image, makeStyles, Card } from "@rneui/themed";
import { PlaceItem } from "../../types/map";
import { AirbnbRating } from "react-native-ratings";
import { IconClockHour4, IconRoad } from "tabler-icons-react-native";

interface PlaceItemCardProps {
  item: PlaceItem;
  onPress: () => void;
}

const PlaceItemCard: FC<PlaceItemCardProps> = ({ item, ...props }) => {
  const styles = useStyles();
  return (
    <Pressable onPress={props.onPress}>
      <Card wrapperStyle={styles.container} containerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                item.properties.imgUrl ||
                "https://cdn4.iconfinder.com/data/icons/user-interface-131/32/sad_store-512.png",
            }}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {item.properties.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingPoint}>{item.properties.rating}</Text>
            {/* <Rating /> */}
            <AirbnbRating
              showRating={false}
              size={20}
              defaultRating={Math.round(item.properties.rating || 0)}
              isDisabled
            />
            <Text>{"(7183)"}</Text>
          </View>
          <View style={styles.inforContainer}>
            <View style={styles.inforWrapper}>
              <IconRoad width={16} height={15} />
              <Text>{Math.round(item.properties.tilequery.distance)}m</Text>
            </View>
            <View style={styles.inforWrapper}>
              <IconClockHour4 width={16} height={15} />
              <Text>
                {Math.round(item.properties.tilequery.distance / 40)} phút
              </Text>
            </View>
            <View style={styles.inforWrapper}>
              <IconRoad width={16} height={15} />
              <Text>{Math.round(item.properties.tilequery.distance)}m</Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    gap: 10,
    borderColor: theme.colors.grey5,
  },
  imageContainer: {
    height: 65,
    width: 65,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  detailContainer: {
    gap: 6,
    width: "80%",
  },
  title: {
    height: 24,
    fontWeight: "600",
    fontSize: 17,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  ratingPoint: {
    fontSize: 16,
    fontWeight: "500",
  },
  inforContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inforWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
}));

export default memo(PlaceItemCard);
