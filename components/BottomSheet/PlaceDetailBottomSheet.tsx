import { View } from "react-native";
import React, { FC, useEffect } from "react";
import { Button, Image, makeStyles, Text } from "@rneui/themed";
import { PlaceItem } from "../../types/map";
import {
  IconLocation,
  IconMap,
  IconMapPinCheck,
  IconClockHour2,
  IconCalendarEvent,
} from "tabler-icons-react-native";
import { theme } from "../../styles/theme";
import { useDirection } from "../../context/direction";
interface PlaceDetailBottomSheetProps {
  place?: PlaceItem;
}

export const PlaceDetailBottomSheet: FC<PlaceDetailBottomSheetProps> = ({
  place,
}) => {
  const styles = useStyles();
  const [count, setCount] = React.useState<number>(0);
  // direction context
  const { directions, setDirections } = useDirection();
  useEffect(() => {
    // console.log(place);
    setCount(count + 1);
    // console.log(count)
  }, [place]);
  return (
    <View>
      {place ? (
        <View>
          <View style={styles.headerContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  place.properties.imgUrl ||
                  "https://cdn4.iconfinder.com/data/icons/user-interface-131/32/sad_store-512.png",
              }}
            />
            <View style={styles.titleContainer}>
              <Text textL semiBold style={styles.textTitle}>
                {place.properties.title}
              </Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.buttonGroupContainer}>
              <Button
                buttonStyle={[styles.button, styles.navigationButton]}
                title="Chỉ đường"
                type="outline"
                onPress={() => {
                  //set direction context to true
                  setDirections(true);
                }}
                icon={
                  <IconLocation
                    color={theme.lightColors?.brand?.primary?.[500]}
                  />
                }
              />
              <Button
                buttonStyle={[styles.button, styles.addTripButton]}
                title="Đưa vào hành trình"
                icon={<IconMap color={theme.lightColors?.white} />}
              />
            </View>
            <View>
              <View style={styles.bodySection}>
                <IconMapPinCheck
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                <Text textS>{place.properties.address}</Text>
              </View>
              <View style={styles.bodySection}>
                <IconClockHour2
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                <Text textS>
                  {place.properties.openHours ||
                    "Đang mở cửa - Đóng cửa lúc 22:00"}
                </Text>
              </View>
              <View style={styles.bodySection}>
                <IconCalendarEvent
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                <Text textS>
                  {place.properties.openDays || "Thứ 2 - Thứ 6"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
  },
  textTitle: {
    color: theme.colors.white,
  },
  bodyContainer: {
    padding: 16,
  },
  image: {
    aspectRatio: 21 / 9,
  },
  bodySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    borderRadius: 56,
  },
  navigationButton: {
    borderWidth: 1,
  },
  addTripButton: {},
}));
