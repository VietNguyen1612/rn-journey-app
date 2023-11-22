import { Avatar, makeStyles } from "@rneui/themed";
import React, { FC } from "react";
import { useAuth } from "../../../context/auth";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { router } from "expo-router";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUserPlus,
  IconUsers,
} from "tabler-icons-react-native";
import { MenuOptionCard } from "../../../components";

const OPTIONS = [
  {
    id: "1",
    option: "FriendList",
    title: "Danh sách bạn bè",
    icon: <IconUsers size={24} />,
    tailIcon: <IconChevronRight size={24} />,
  },
  {
    id: "2",
    option: "/friend-request",
    title: "Lời mời kết bạn",
    icon: <IconUserPlus size={24} />,
    tailIcon: <IconChevronRight size={24} />,
  },
  {
    id: "3",
    option: "AccountSetting",
    title: "Cài đặt tài khoản",
    icon: <IconSettings size={24} />,
    tailIcon: <IconChevronRight size={24} />,
  },
  {
    id: "4",
    option: "Logout",
    title: "Đăng xuất",
    icon: <IconLogout size={24} />,
    tailIcon: <IconChevronRight size={24} />,
  },
];

const AccountMenu: FC = (props) => {
  const styles = useStyles();
  const auth = useAuth();

  return (
    <View>
      <View style={styles.accountMenuContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listOptionContainer}>
            <View style={styles.profileOptionContainer}>
              <MenuOptionCard
                icon={
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: auth.userAuth?.user.avatarUrl,
                    }}
                  />
                }
                title={auth.userAuth?.user.username}
                tailIcon={<IconChevronRight size={30} />}
                onPress={() => router.push("/profile")}
              />
            </View>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={styles.listOptionFlatList}
              data={OPTIONS}
              renderItem={({ item }) => (
                <MenuOptionCard
                  title={item.title}
                  icon={item.icon}
                  tailIcon={item.tailIcon}
                  onPress={
                    item.title == "Đăng xuất"
                      ? () => auth.setUserAuth(null)
                      : () => router.push(item.option as any)
                  }
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AccountMenu;

const useStyles = makeStyles((_) => ({
  accountMenuContainer: {
    height: "100%",
  },
  listOptionContainer: {
    width: "100%",
    paddingVertical: 70,
    paddingHorizontal: 25,
  },
  listOptionFlatList: {
    justifyContent:
      Dimensions.get("window").width > 640 ? "center" : "space-between",
    gap: 18,
  },
  profileOptionContainer: {
    marginBottom: 64,
  },
}));
