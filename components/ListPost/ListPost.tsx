import { FlatList, View } from "react-native";
import React, { FC, useEffect } from "react";
import { Post } from "../Post";
import { useAuth } from "../../context/auth";
import { useAllPosts } from "../../api";
import LottieView from "lottie-react-native";
import { Loading } from "../Loading";
import { useNavigation } from "expo-router";

export const ListPost: FC = (/* list post */ props) => {
  const navigation = useNavigation()
  const { userAuth } = useAuth();
  const { data, isLoading, refetch } = useAllPosts(
    userAuth?.accessToken!,
    6,
    ""
  );

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => { refetch() })
    return unsubcribe
  }, [navigation]);
  return (
    <View>
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={data?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Post post={item} />}
        />
      )}
    </View>
  );
};
