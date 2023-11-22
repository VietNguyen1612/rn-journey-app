import React, { FC, useState } from "react";
import {
  IconMap,
  IconMovie,
  IconNotebook,
  IconPhoto,
} from "tabler-icons-react-native";
import { Avatar, Image, Text, makeStyles } from "@rneui/themed";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ListImage, ListJourney, Tab } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { theme } from "../../../styles/theme";
import { useAuth } from "../../../context/auth";

const { height } = Dimensions.get("window");
const iconSize = Dimensions.get("window").width > 640 ? 36 : 26;
const tablet = Dimensions.get("window").width > 640 ? true : false;

const TAB = [
  {
    id: "1",
    title: "posts",
    icon: <IconNotebook size={iconSize} />,
  },
  {
    id: "2",
    title: "trips",
    icon: <IconMap size={iconSize} />,
  },
  {
    id: "3",
    title: "images",
    icon: <IconPhoto size={iconSize} />,
  },
  {
    id: "4",
    title: "reels",
    icon: <IconMovie size={iconSize} />,
  },
];

const Profile: FC = (/* Data của user */) => {
  const [tab, setTab] = useState("posts");
  const styles = useStyles();
  const params = useLocalSearchParams();
  const { userAuth } = useAuth();

  return (
    <View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.backgroundImageContainer}
              >
                <Image
                  style={styles.backgroundImage}
                  borderBottomLeftRadius={5}
                  borderBottomRightRadius={5}
                  source={{
                    uri: "https://img.freepik.com/premium-photo/photo-majestic-mountain-range-sunrise-with-small-lake-lone-tree-foreground_978463-570.jpg",
                  }}
                />
              </TouchableOpacity>
              <View style={styles.headerBottomContainer}>
                <View style={styles.avatarContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.avatarCover}
                  >
                    <Avatar
                      size={tablet ? 160 : 120}
                      rounded
                      source={{
                        uri: userAuth?.user.avatarUrl,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.informationContainer}>
                  <Text style={styles.username}>{userAuth?.user.username}</Text>
                  <Text style={styles.follower}>
                    {userAuth?.user.friends.length} bạn bè
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <FlatList
                contentContainerStyle={styles.tabFlatListContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={TAB}
                renderItem={({ item }) => (
                  <Tab
                    type="button"
                    isActive={tab == item.title}
                    icon={item.icon}
                    onPress={() => setTab(item.title)}
                  />
                )}
              />
            </View>
            <View style={styles.contentContainer}>
              {tab == "posts" && (
                // <ListPost />
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Text
                    style={{
                      paddingVertical: 20,
                      fontSize: 26,
                      fontWeight: "500",
                      color: theme.darkColors?.grey2,
                    }}
                  >
                    Comming soon!!!
                  </Text>
                </View>
              )}
              {tab == "trips" && <ListJourney />}
              {tab == "images" && <ListImage numColums={3} />}
              {/* {tab == "reels" && <Reels />} */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const useStyles = makeStyles((_) => ({
  container: {
    height: "100%",
  },
  wrapper: {
    height: "100%",
    paddingBottom: height / 100,
  },
  headerContainer: {
    height: (height * 4) / 10,
  },
  bodyContainer: {},
  backgroundImageContainer: {
    height: "70%",
    width: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  headerBottomContainer: {
    height: "30%",
  },
  avatarContainer: {
    height: "40%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  avatarCover: {
    position: "absolute",
    bottom: 0,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 9999,
  },
  informationContainer: {
    height: "60%",
    alignItems: "center",
    marginTop: 3,
  },
  username: {
    fontSize: tablet ? 30 : 22,
    fontWeight: "600",
  },
  follower: {
    fontSize: tablet ? 22 : 16,
    color: _.colors.grey2,
  },
  tabFlatListContainer: {
    width: "100%",
    justifyContent:
      Dimensions.get("window").width > 640 ? "center" : "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: Dimensions.get("window").width > 640 ? 20 : 0,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
}));
