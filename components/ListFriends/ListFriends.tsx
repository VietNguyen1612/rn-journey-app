import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { useAuth } from "../../context/auth";
import { Avatar, Card, makeStyles } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { User } from "../../types/user";

interface ListFriendsProps {
  onPress: (user: User) => void;
}

export const ListFriends: FC<ListFriendsProps> = (
  /* list post */ { onPress }
) => {
  const { userAuth } = useAuth();
  const styles = useStyles();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 16 }}
        scrollEnabled={false}
        data={userAuth?.user.friends}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <Card
              wrapperStyle={styles.cardContainer}
              containerStyle={{ borderRadius: 10 }}
            >
              <Avatar rounded size={50} source={{ uri: item.avatarUrl }} />
              <Text style={styles.text}>{item.username}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
}));
