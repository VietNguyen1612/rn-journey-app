import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { Avatar, makeStyles, useTheme } from "@rneui/themed";
import { io } from "socket.io-client";
import { useAuth } from "../../../context/auth";
import { LoadingScreen } from "../../../components";
import {
  IconArrowBigRightFilled,
  IconDotsVertical,
} from "tabler-icons-react-native";

const tablet = Dimensions.get("window").width > 640 ? true : false;
interface Message {
  message: string;
  status: string;
  time: string;
  userId: string;
}

const MessageComponent = ({
  item,
  currentUser,
}: {
  item: Message;
  currentUser: string | undefined;
}) => {
  const { theme } = useTheme();
  const currentUserStatus = item.userId !== currentUser;
  // console.log(item.userId)
  // console.log(currentUser)
  const originalDateString = item.time;

  // Create a Date object from the original string
  const originalDate = new Date(originalDateString);

  // Get the date components
  const day = originalDate.getUTCDate();
  const month = originalDate.getUTCMonth() + 1; // Months are zero-based, so add 1
  const year = originalDate.getUTCFullYear();

  // Create the formatted date string
  const formattedDateString = `${day}-${month}-${year}`;
  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View
        style={{
          maxWidth: "50%",
          marginVertical: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={
              currentUserStatus
                ? {
                    width: "100%",
                    backgroundColor: "#c3eac7",
                    padding: 20,
                    borderRadius: 10,
                    marginBottom: 2,
                  }
                : [
                    {
                      width: "100%",
                      padding: 20,
                      borderRadius: 10,
                      marginBottom: 2,
                    },
                    { backgroundColor: "#00bb41" },
                  ]
            }
          >
            <Text
              style={
                currentUserStatus
                  ? { color: "#000", fontWeight: "500" }
                  : { color: "#fff", fontWeight: "500" }
              }
            >
              {item.message}
            </Text>
          </View>
        </View>
        <Text
          style={
            currentUserStatus
              ? { marginLeft: 10, color: theme.colors.brand.neutral[600] }
              : {
                  alignSelf: "flex-end",
                  color: theme.colors.brand.neutral[600],
                }
          }
        >
          {formattedDateString}
        </Text>
      </View>
    </View>
  );
};

const Room = () => {
  const { theme } = useTheme();
  const { userAuth } = useAuth();
  const styles = useStyles();
  const { room, friend, avatar } = useGlobalSearchParams<{
    room: string;
    friend: string;
    avatar: string;
  }>();
  //   console.log(room);
  const chatSocket = io(`${process.env.EXPO_PUBLIC_SOCKET}`, {
    query: { room: `${room}` },
    // protocols:['websocket'],
    rejectUnauthorized: false,
    transports: ["websocket"],
    // reconnection:false,
    extraHeaders: {
      authorization: userAuth?.accessToken!,
    },
  });
  const [rerender, setRerender] = useState(false);
  const [friendChat, setFriendChat] = useState<string | string[]>("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log(socket)
    chatSocket.on("connect", (...args) => {
      console.log("server connected");
    });
    chatSocket.on("historyMessage", (args) => {
      setAllMessages(args[0].messages.reverse());
      setFriendChat(friend);
      setLoading(false);
      //console.log(allMessages)
      // console.log(args)
      // console.log(args[0].messages[0])
      // setData(args)
      // args.map((item: any) => {
      //     setData(item.messages)
      // })
    });
    chatSocket.on("connect_error", (error) => {
      console.log("chatSocket.IO connection error:", error);
    });

    chatSocket.on("session", (args) => {
      console.log(args);
    });
    // chatSocket.on('connect',()=>{
    //   console.log(chatSocket.`connected`)
    // })
    //chatSocket.emit('joinRoom', room)

    return () => {
      chatSocket.disconnect();
    };
  }, [rerender]);

  chatSocket.on("message", (args) => {
    setRerender(!rerender);
    //console.log(allMessages)
    // console.log(args)
    // console.log(args[0].messages[0])
    // setData(args)
    // args.map((item: any) => {
    //     setData(item.messages)
    // })
  });
  const handleSendMessage = () => {
    //console.log(message)
    try {
      chatSocket.emit("message", message);
      setMessage("");
    } catch (err) {}
    setRerender(!rerender);
  };
  return (
    <View style={styles.wrapper}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 30,
              paddingTop: 55,
              paddingVertical: 13,
            }}
          >
            <Avatar
              source={{ uri: avatar }}
              containerStyle={{ borderColor: "white", borderWidth: 1 }}
              rounded
              size="medium"
            />
            <Text
              style={{
                marginLeft: 15,
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              {friendChat}
            </Text>
          </View>
          <View style={[styles.wrapper, { paddingHorizontal: 10 }]}>
            {allMessages && allMessages[0] ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                inverted
                scrollsToTop={true}
                data={allMessages}
                renderItem={({ item }) => (
                  <MessageComponent
                    item={item}
                    currentUser={userAuth?.user._id}
                  />
                )}
                // keyExtractor={(item) => item.toString()}
              />
            ) : (
              ""
            )}
          </View>
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={(value) => setMessage(value)}
              placeholder="Enter your message"
            />

            <Pressable onPress={handleSendMessage} style={styles.button}>
              <View style={styles.buttonText}>
                <IconArrowBigRightFilled
                  color="white"
                  size={tablet ? 30 : 22}
                />
              </View>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default Room;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    paddingVertical: tablet ? 20 : 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: tablet ? "8%" : "15%",
    backgroundColor: theme.colors.brand.primary[500],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  buttonText: {
    color: "#fff",
    justifyContent: "center",
  },
}));
