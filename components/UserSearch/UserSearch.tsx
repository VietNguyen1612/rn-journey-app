import React, { FC, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { Avatar, makeStyles, useTheme } from "@rneui/themed";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../Input";
import { searchByPhone } from "../../api/users";
import { Everyone } from "../../types/user";
import LottieView from "lottie-react-native";
import { useAuth } from "../../context/auth";
import { Button } from "../Button";
import { sendFriendRquest } from "../../api/friends";
import { router } from "expo-router";
import { Success } from "../Success";
import { Loading } from "../Loading";
const tablet = Dimensions.get("window").width > 640 ? true : false;

export const UserSearch: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { userAuth } = useAuth();
  const isFirstRun = useRef(true);
  const debounce: any = useRef(null);
  const { theme } = useTheme();
  const styles = useStyles();
  const [searchData, setSearchData] = useState<Everyone>();
  const [status, setStatus] = useState<Number>();

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(async () => {
      setLoading(true);
      const data = await searchByPhone(userAuth?.accessToken!, searchText);
      setSearchData(data);
      setLoading(false);
    }, 1000);
  }, [searchText]);

  const handleSearch = (input: string): void => {
    setSearchText(input);
  };

  const handleSendRequest = async (recipient: string) => {
    const res = await sendFriendRquest(userAuth?.accessToken!, recipient);
    setStatus(res?.status);
  };

  return (
    <>
      {status === 1 && (
        <Success
          isSuccess={status === 1}
          onPress={() => setStatus(0)}
          content="Gửi lời mời thành công"
        />
      )}
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 40 }}>
            <View>
              <TextInput
                placeholder="Số điện thoại tìm kiếm..."
                onChangeText={(e) => handleSearch(e)}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
              <MagnifyingGlassIcon
                size={18}
                color={theme.colors.brand.neutral[400]}
                style={styles.searchIcon}
              />
            </View>

            {loading ? (
              <Loading size="100%" />
            ) : searchData ? (
              <View style={styles.friendCard}>
                <Avatar
                  rounded
                  size="large"
                  source={{ uri: searchData.avatarUrl }}
                  avatarStyle={{
                    borderWidth: 1,
                    borderColor: theme.colors.grey4,
                  }}
                />
                <View style={styles.friendCardContext}>
                  <Text style={styles.friendName}>{searchData.username}</Text>
                  {searchData.isFriend || (
                    <Button
                      size={tablet ? "md" : "sm"}
                      title="Kết bạn"
                      onPress={() => handleSendRequest(searchData._id)}
                    />
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.notFound}>
                <LottieView
                  source={require("../../assets/lotties/notfound_animation.json")}
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                  autoPlay
                  loop
                />
                <Text style={styles.notFoundText}>
                  Không tìm thấy người dùng
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    height: 24,
    paddingRight: 40,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    position: "absolute",
    right: 25,
    top: 11,
  },
  friendCard: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  friendCardContext: {
    justifyContent: "center",
    gap: 10,
  },
  friendName: {
    fontWeight: "500",
    fontSize: 18,
  },
  notFound: {
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: "500",
  },
}));
