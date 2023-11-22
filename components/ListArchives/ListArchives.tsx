import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { useAuth } from "../../context/auth";
import { Avatar, Card, Image, makeStyles } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { User } from "../../types/user";
import { useAllArchive } from "../../api";
import LottieView from "lottie-react-native";
import { Loading } from "../Loading";
const tablet = Dimensions.get("window").width > 640 ? true : false;

interface ListArchivesProps {
  onPress: (archiveId: string) => void;
}

export const ListArchives: FC<ListArchivesProps> = (
  /* list post */ { onPress }
) => {
  const { userAuth } = useAuth();
  const styles = useStyles();
  const { isLoading, data } = useAllArchive(userAuth?.accessToken!);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 16 }}
          scrollEnabled={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item._id)}>
              <Card
                wrapperStyle={styles.cardContainer}
                containerStyle={{ borderRadius: 10 }}
              >
                <View style={{ width: tablet ? "14%" : "20%" }}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: "https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    }}
                  />
                </View>
                <Text style={styles.text}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
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
  img: {
    width: "100%",
    borderRadius: 5,
    aspectRatio: 1,
  },
}));
