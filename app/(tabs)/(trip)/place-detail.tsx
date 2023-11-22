import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { AirbnbRating } from "react-native-ratings";
import { Image, makeStyles } from "@rneui/themed";
import { Button, ListArchives, Loading, Success } from "../../../components";
import {
  IconCheck,
  IconClockHour4,
  IconLocation,
  IconMap,
  IconMapPin,
  IconPhone,
} from "tabler-icons-react-native";
import { theme } from "../../../styles/theme";
import { addPlaceToArchive, useQueryDetailPlace } from "../../../api";
import { useAuth } from "../../../context/auth";
import { useDirection } from "../../../context/direction";
import LottieView from "lottie-react-native";
const { height, width } = Dimensions.get("window");
const conveniences = ["Nhà hàng", "Nhà vệ sinh", "Phù hợp cho trẻ em"];

const PlaceDetail = () => {
  const { placeId } = useLocalSearchParams<{
    placeId: string;
  }>();
  const [showImage, setShowImage] = useState(false);
  const [showArchives, setShowArchives] = useState(false);
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { userAuth } = useAuth();
  const { setSearchMarker } = useDirection();
  const { data: place, isLoading } = useQueryDetailPlace(
    placeId,
    userAuth?.accessToken!
  );

  return (
    <>
      {success && (
        <Success
          isSuccess={success}
          onPress={() => setSuccess(false)}
          content="Đưa vào lưu trữ thành công"
        />
      )}
      {showArchives && (
        <Pressable
          style={styles.archiveListBackground}
          onPress={() => setShowArchives(false)}
        >
          <View style={styles.archiveListContainer}>
            <ListArchives
              onPress={(archiveId) => {
                addPlaceToArchive(
                  userAuth?.accessToken!,
                  place?._id as string,
                  archiveId
                );
                setShowArchives(false);
                setSuccess(true);
              }}
            />
          </View>
        </Pressable>
      )}
      {isLoading ? (
        <Loading size="50%" />
      ) : place ? (
        <View style={{ flex: 1 }}>
          <EnhancedImageViewing
            // Trùng key bug - lên prod là hết ez
            images={[{ uri: place?.thumbnail }]}
            imageIndex={0}
            visible={showImage}
            onRequestClose={() => setShowImage(false)}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.backgroundContainer}>
              <TouchableOpacity onPress={() => setShowImage(true)}>
                <View style={styles.titleContainer}>
                  <Text style={styles.placeTitle}>{place?.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.placeRating}>
                      {place?.rating + "  "}
                    </Text>
                    <AirbnbRating
                      showRating={false}
                      size={20}
                      defaultRating={Math.round(place?.rating || 0)}
                      isDisabled
                    />
                    <Text style={styles.placeRating}>{"  7.160 đánh giá"}</Text>
                  </View>
                </View>

                <Image
                  style={styles.image}
                  source={{ uri: place?.thumbnail }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.actionWrapper}>
                <Button
                  type="outline"
                  icon={
                    <IconLocation
                      size={22}
                      color={theme.lightColors?.brand?.primary?.[600]}
                    />
                  }
                  buttonStyle={styles.actionButton}
                  titleStyle={styles.actionTitle}
                  onPress={() => {
                    setSearchMarker([
                      [Number(place?.longitude), Number(place?.latitude)],
                    ]);
                    router.push("/trip");
                  }}
                >
                  Chỉ đường
                </Button>
              </View>
              <View style={styles.actionWrapper}>
                <Button
                  icon={<IconMap size={22} color="white" />}
                  buttonStyle={styles.actionButton}
                  titleStyle={styles.actionTitle}
                  onPress={() => setShowArchives(true)}
                >
                  Đưa vào mục lưu trữ
                </Button>
              </View>
            </View>
            <View style={styles.placeInfoContainer}>
              <View style={styles.placeInforWrapper}>
                <IconMapPin
                  size={28}
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                <Text style={styles.placeInforText}>{place?.city}</Text>
              </View>
              <View style={styles.placeInforWrapper}>
                <IconClockHour4
                  size={28}
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                {/* Xu li sau, do chua co openHours */}
                {/* {infor.openHours ?
                    new Date().getHours()
                     <Text>a</Text> : <Text>Ko bit</Text>} */}
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <Text
                    style={[
                      styles.placeInforText,
                      { color: theme.lightColors?.brand?.primary?.[500] },
                    ]}
                  >
                    Đang mở cửa
                  </Text>
                  <Text style={styles.placeInforText}>8AM - 11PM</Text>
                </View>
              </View>
              <View style={styles.placeInforWrapper}>
                <IconPhone
                  size={28}
                  color={theme.lightColors?.brand?.primary?.[500]}
                />
                <Text style={styles.placeInforText}>0123456789</Text>
              </View>
              <View style={styles.convenience}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Tiện nghi
                </Text>
                <View style={styles.convenienceContainer}>
                  {conveniences.map((value, index) => (
                    <View style={styles.convenienceWrapper} key={index}>
                      <IconCheck />
                      <Text>{value}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {/* <MenuTablePlaceDetail item={item} /> */}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../../assets/lotties/notfound_animation.json")}
            style={{
              width: "100%",
              height: 200,
            }}
            autoPlay
            loop
          />
          <Text style={{ fontWeight: "500", fontSize: 22 }}>
            Địa điểm chưa hỗ trợ thông tin chi tiết
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>
            Vui lòng quay lại sau!
          </Text>
        </View>
      )}
    </>
  );
};

export default PlaceDetail;

const useStyles = makeStyles((_) => ({
  backgroundContainer: {
    height: height / 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    position: "absolute",
    gap: 6,
    bottom: 0,
    paddingHorizontal: 25,
    paddingVertical: 15,
    zIndex: 10,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    width: "100%",
  },
  placeTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeRating: {
    fontSize: 18,
    color: "white",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  actionWrapper: {
    paddingVertical: 14,
  },
  actionButton: {
    borderRadius: 9999,
    gap: 5,
    paddingHorizontal: 24,
  },
  actionTitle: {
    fontWeight: "500",
  },
  placeInfoContainer: {
    paddingHorizontal: 20,
    height: "100%",
    gap: 8,
  },
  placeInforWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "90%",
  },
  placeInforText: {
    fontSize: 16,
  },
  convenience: { paddingVertical: 15 },
  convenienceContainer: { paddingHorizontal: 20, gap: 10, marginTop: 10 },
  convenienceWrapper: { flexDirection: "row", alignItems: "center", gap: 10 },
  archiveListContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    height: height / 3,
    width: (width * 3) / 4,
  },
  archiveListBackground: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
}));
