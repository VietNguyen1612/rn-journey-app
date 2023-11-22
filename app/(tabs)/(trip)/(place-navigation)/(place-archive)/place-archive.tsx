import React, { useEffect } from "react";
import { Button, Text, makeStyles } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { useAuth } from "../../../../../context/auth";
import { useAllArchive } from "../../../../../api";
import { ArchiveCard } from "../../../../../components/ArchiveCard/ArchiveCard";
import LottieView from "lottie-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Loading } from "../../../../../components";

// const data = [
//   {
//     _id: "6523a3254dcb8b1ada1ed457",
//     places: ["650e1df0fd78ed339edd97eb", "650e1df0fd78ed339edd97fd"],
//     authorId: "65223367ab148dfc04079a3a",
//     title: "Dia diem di du lich",
//     placesNumber: 2,
//   },
// ];

const TripArchive = () => {
  const styles = useStyles();
  const { userAuth } = useAuth();
  const { rerender } = useLocalSearchParams();
  // const isLoading = false;
  const { isLoading, data, refetch } = useAllArchive(userAuth?.accessToken!);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text textL semiBold>
          Mục lưu trữ
        </Text>
        <Button
          title="Tạo mục lưu trữ mới"
          type="outline"
          buttonStyle={styles.createArchiveButton}
          onPress={() =>
            router.push(
              "/(tabs)/(trip)/(place-navigation)/(place-archive)/create-archive"
            )
          }
        />
        <View>
          {isLoading ? (
            <Loading size={150} />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <ArchiveCard archive={item} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  page: {
    flex: 1,
    backgroundColor: theme.colors.page,
  },
  container: {
    padding: 20,
    gap: 12,
  },
  createArchiveButton: {
    borderWidth: 1,
    borderRadius: 10,
  },
}));

export default TripArchive;
