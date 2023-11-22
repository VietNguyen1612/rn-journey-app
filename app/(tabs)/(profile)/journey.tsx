import {
  Avatar,
  Button,
  Card,
  Image,
  ListItem,
  makeStyles,
} from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading, Tab } from "../../../components";
import {
  IconClockHour4,
  IconGasStation,
  IconPointFilled,
  IconRoad,
} from "tabler-icons-react-native";
import { theme } from "../../../styles/theme";
import { useTripDetail } from "../../../api/map/trip";
import { useAuth } from "../../../context/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useDirection } from "../../../context/direction";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import LottieView from "lottie-react-native";
const tablet = Dimensions.get("window").width > 640 ? true : false;

const TAB = [
  { label: "infor", title: "Thông tin" },
  { label: "posts", title: "Bài đăng" },
];

const InformationTab: FC<JourneyProps> = (props) => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { userAuth } = useAuth();
  const { setSearchMarker } = useDirection();
  const { data, isLoading } = useTripDetail(
    userAuth?.accessToken!,
    props.tripId
  );
  const listPlace = data?.places.map((item) => [
    item.longitude,
    item.latitude,
  ]) as Coordinates[];

  return (
    <>
      {isLoading ? (
        <Loading size={200} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 20, alignItems: "center" }}>
            <Text style={styles.tripTitle}>{data?.title}</Text>
          </View>
          <View>
            <Text style={styles.locationTitle}>Các địa điểm</Text>
          </View>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <View style={styles.locationInfor}>
                  <View style={styles.locationImageContainer}>
                    <Image
                      style={styles.locationImage}
                      borderRadius={5}
                      source={{ uri: data?.places[0].thumbnail }}
                    />
                  </View>
                  <Text style={styles.locationTitle}>Danh sách</Text>
                </View>
              </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <FlatList
              contentContainerStyle={styles.locationContainer}
              scrollEnabled={false}
              data={data?.places}
              renderItem={({ item, index }) => (
                <Pressable style={styles.locationInfor}>
                  {index !== 0 && (
                    <View style={styles.locationConectionLineContainer}>
                      <Text style={styles.locationConectionLine}>- - -</Text>
                    </View>
                  )}
                  <View style={styles.scale}>
                    <IconPointFilled
                      size={20}
                      color={theme.lightColors?.brand?.primary?.[500]}
                    />
                  </View>
                  <View style={styles.locationImageContainer}>
                    <Image
                      style={styles.locationImage}
                      borderRadius={5}
                      source={{ uri: item.thumbnail }}
                    />
                  </View>
                  <View style={styles.locationContent}>
                    <Text style={styles.locationTitle}>{item.name}</Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.locationPlace}
                    >
                      {item.city}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </ListItem.Accordion>
          <View style={{ marginVertical: 20 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.locationTitle}>Người tham gia</Text>
            </View>
            <FlatList
              contentContainerStyle={styles.friendFlatList}
              scrollEnabled={false}
              data={data?.participates}
              renderItem={({ item }) => (
                <View style={styles.friendCardContainer}>
                  <Avatar size={44} rounded source={{ uri: item.avatarUrl }} />
                  <Text style={{ fontSize: 14, fontWeight: "500" }}>
                    {item.username}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.locationTitle}>Thông tin chi tiết</Text>
          </View>
          <View style={styles.tripInforContainer}>
            <IconRoad size={tablet ? 32 : 22} />
            <Text style={styles.tripInfor}>Quãng đường: 600km</Text>
          </View>
          <View style={styles.tripInforContainer}>
            <IconClockHour4 size={tablet ? 32 : 22} />
            <Text style={styles.tripInfor}>Thời gian ước tính: 12 tiếng</Text>
          </View>
          <View style={styles.tripInforContainer}>
            <IconGasStation size={tablet ? 32 : 22} />
            <Text style={styles.tripInfor}>Lượng xăng ước tính: 12 lít</Text>
          </View>
          <Button
            type="outline"
            title="Chỉ đường"
            radius={10}
            containerStyle={{ marginVertical: 10 }}
            onPress={() => {
              setSearchMarker(listPlace);
              router.push("/trip");
            }}
          />
        </ScrollView>
      )}
    </>
  );
};

interface JourneyProps {
  tripId: string;
}
const Journey: FC<JourneyProps> = (props) => {
  const styles = useStyles();
  const [tab, setTab] = useState("infor");
  const { tripId } = useLocalSearchParams<{ tripId: string }>();

  return (
    <SafeAreaView>
      <Card containerStyle={styles.container}>
        <FlatList
          contentContainerStyle={styles.tabContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={TAB}
          renderItem={({ item }) => (
            <Tab
              isActive={tab == item.label}
              onPress={() => setTab(item.label)}
              title={<Text>{item.title}</Text>}
            />
          )}
        />
        <Card.Divider />
        {tab === "infor" && <InformationTab tripId={tripId} />}
      </Card>
    </SafeAreaView>
  );
};

export default Journey;

const useStyles = makeStyles((theme) => ({
  scrollView: {
    maxHeight: tablet
      ? Dimensions.get("screen").height * 0.8
      : Dimensions.get("screen").height * 0.7,
  },
  container: {
    paddingHorizontal: tablet ? 25 : 15,
    borderRadius: 20,
    maxHeight: tablet
      ? Dimensions.get("screen").height * 0.9
      : Dimensions.get("screen").height * 0.8,
  },
  titleContainer: {
    marginBottom: 10,
    // marginTop: tablet ? 20 : 10,
  },
  tabContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  locationContainer: {
    gap: 20,
  },
  locationInfor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  locationImageContainer: {
    width: tablet ? 100 : 60,
    aspectRatio: 1,
  },
  locationImage: {
    width: "100%",
    height: "100%",
  },
  locationContent: {
    maxWidth: "70%",
    gap: 5,
  },
  locationTitle: {
    fontSize: tablet ? 22 : 16,
    fontWeight: "500",
  },
  locationPlace: {
    fontSize: tablet ? 19 : 12,
    opacity: 0.6,
  },
  locationConectionLineContainer: {
    position: "absolute",
    transform: [{ rotate: "90deg" }, { scale: tablet ? 1.6 : 1 }],
    top: -25,
    left: -11,
  },
  locationConectionLine: {
    fontSize: tablet ? 27 : 26,
    color: theme.colors?.brand?.primary?.[200],
  },
  scale: {
    transform: [{ scale: tablet ? 1.4 : 1 }],
  },
  tripInforContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: tablet ? 4 : 2,
    opacity: 0.8,
  },
  tripInfor: {
    fontSize: tablet ? 22 : 14,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors?.brand?.primary?.[700],
  },
  friendFlatList: {
    borderColor: theme.colors.brand.primary[600],
    borderWidth: 0.4,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  friendCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 5,
  },
}));
