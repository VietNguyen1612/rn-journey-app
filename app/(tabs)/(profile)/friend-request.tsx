import { Avatar, Button, Card, Text, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { FC, useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { acceptFriend, useAllFriendRequest } from "../../../api/friends";
import { useAuth } from "../../../context/auth";
import { Loading, Success } from "../../../components";
import LottieView from "lottie-react-native";
const tablet = Dimensions.get("window").width > 640 ? true : false;

const FriendRequest: FC = (/* Data của user */) => {
  const styles = useStyles();
  const { userAuth } = useAuth();
  const { data, isLoading, refetch } = useAllFriendRequest(
    userAuth?.accessToken!
  );
  const [success, setSuccess] = useState(false);

  const handleAccept = async (requester: string) => {
    await acceptFriend(userAuth?.accessToken!, requester);
    setSuccess(true);
    refetch();
  };

  return (
    <>
      {success && (
        <Success
          isSuccess={success}
          onPress={() => setSuccess(false)}
          content="Kết bạn thành công"
        />
      )}

      <View>
        <ScrollView>
          {isLoading ? (
            <Loading size={250} />
          ) : (
            <View style={styles.container}>
              <Text style={styles.header}>
                Lời mời kết bạn ({data?.length})
              </Text>
              <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/profile",
                        params: { userId: item.requester._id },
                      });
                    }}
                  >
                    <Card containerStyle={styles.cardContainer}>
                      <View style={styles.informationContainer}>
                        <Avatar
                          rounded
                          size={tablet ? "large" : "medium"}
                          source={{ uri: item.requester.avatarUrl }}
                        />
                        <View style={styles.nameContainer}>
                          <Text style={styles.username}>
                            {item.requester.username}
                          </Text>
                          <Text style={styles.timeStamp}>
                            {new Date(item.createdAt).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.actionContainer}>
                        <View style={styles.actionWrapper}>
                          <Button
                            type="outline"
                            buttonStyle={styles.actionButton}
                            titleStyle={styles.actionTitle}
                            onPress={() => console.log("tu choi")}
                          >
                            Từ chối
                          </Button>
                        </View>
                        <View style={styles.actionWrapper}>
                          <Button
                            buttonStyle={styles.actionButton}
                            titleStyle={styles.actionTitle}
                            onPress={() => handleAccept(item.requester._id)}
                          >
                            Chấp nhận
                          </Button>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default FriendRequest;
const useStyles = makeStyles((_) => ({
  container: {
    paddingVertical: 70,
    paddingHorizontal: 15,
  },
  header: {
    fontWeight: "700",
    fontSize: tablet ? 24 : 20,
    marginBottom: 4,
    paddingHorizontal: 15,
  },
  cardContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginVertical: 16,
  },
  informationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  nameContainer: {
    gap: 4,
    marginLeft: 12,
  },
  username: {
    fontSize: tablet ? 24 : 18,
    fontWeight: "600",
  },
  timeStamp: {
    color: _.colors.brand.neutral[500],
    fontSize: tablet ? 20 : 16,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionWrapper: {
    width: "48%",
  },
  actionButton: {
    borderRadius: 9999,
  },
  actionTitle: {
    fontSize: tablet ? 18 : 15,
    lineHeight: tablet ? 30 : 20,
    fontWeight: "600",
  },
}));
