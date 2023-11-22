import { Button, ButtonGroup, Text, makeStyles, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PencilIcon } from "react-native-heroicons/solid";
import { ChatCardFeature } from "../../../components/Message";
import { Loading, UserSearch } from "../../../components";
import { router } from "expo-router";
import { RoomResponse, useQueryAllRoom } from "../../../api";
import { useAuth } from "../../../context/auth";
import LottieView from "lottie-react-native";

const Message = () => {
  const { userAuth } = useAuth();
  const { data, isLoading } = useQueryAllRoom(userAuth?.accessToken!);
  const { theme } = useTheme();
  const styles = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleOnPressCard = (room: RoomResponse) => {
    router.push({
      pathname: "/(tabs)/(message)/room",
      params: {
        room: room.name,
        friend: room.users[0]?.username,
        avatar: room.users[0].avatarUrl,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.optionContainer}>
        <ButtonGroup
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          buttons={["Tin nhắn", "Cuộc gọi", "Tìm kiếm", "Bạn bè"]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
        />
        <PencilIcon size={24} color={theme.colors.brand.primary[500]} />
      </View>

      {selectedIndex === 2 && <UserSearch />}
      {selectedIndex === 1 && (
        <View
          style={{ width: "100%", alignItems: "center", paddingVertical: 20 }}
        >
          <Text textL semiBold>
            Coming soon!
          </Text>
        </View>
      )}
      {selectedIndex === 0 && (
        <View
          style={{ width: "100%", alignItems: "center", paddingVertical: 20 }}
        >
          {/* <Text textL semiBold>
            Coming soon!
          </Text> */}

          {/* <Button onPress={handleOnPressCard}><Text>aaaaaaaa</Text></Button> */}
          {isLoading ? (
            <Loading size="50%" />
          ) : (
            data?.map((item: RoomResponse, key) => (
              <ChatCardFeature
                key={key}
                onPress={() => handleOnPressCard(item)}
                size={56}
                type="chat"
                user={`${item.users[0]?.username}`}
                time="00:00"
                isSeen={true}
                chatContent="Click here to chat"
                avatarURI={`${item.users[0]?.avatarUrl}`}
              />
            ))
          )}
        </View>
      )}

      {/* {selectedIndex === 0 && (
        <ScrollView style={styles.listCardContainer}>
          <ChatCardFeature
            size={56}
            type="chat"
            user="Việt Nguyễn"
            time="20:20"
            isSeen={true}
            chatContent="hello"
            avatarURI="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          />
          <ChatCardFeature
            size={56}
            type="call"
            user="Sáng Trần"
            time="20:20"
            callType="missedCall"
            avatarURI="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          />
          <ChatCardFeature
            size={56}
            type="phoneBook"
            user="Hữu Sỹ"
            time="20:20"
            avatarURI="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          />
          <ChatCardFeature
            size={56}
            type="newGroupChat"
            user="Gia Chấn"
            time="20:20"
            avatarURI="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          />
        </ScrollView>
      )} */}
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  buttonContainer: {
    height: 38,
    width: "80%",
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  buttonStyle: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    fontSize: 14,
  },

  listCardContainer: {
    marginTop: 8,
    gap: 8,
  },
}));

export default Message;
