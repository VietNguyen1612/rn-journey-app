import { View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../../context/auth";
import { useArchiveDetail } from "../../../../../api";
import { Button, Text, makeStyles } from "@rneui/themed";
import { Loading, PlaceCard } from "../../../../../components";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

const ArchiveDetail = () => {
  const styles = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userAuth } = useAuth();
  const { data, isLoading } = useArchiveDetail(
    userAuth?.accessToken!,
    id as string
  );
  // useEffect(() => {
  //   console.log(data);
  //   return () =>{}
  // }, [data]);

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20 }}>
        {/* {isLoading ? <Text>Loading</Text> : <Text>{data?.title}</Text>} */}
        <View style={styles.headerContainer}>
          <Text textL medium>
            {data?.title} ({data?.placesNumber})
          </Text>
          <Button title="Chọn" type="clear" />
        </View>
        <ScrollView
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <Loading size={150} />
          ) : (
            <View>
              {data?.places?.map((place) => {
                return <PlaceCard item={place} key={place._id} />;
              })}
            </View>
          )}
          <View style={styles.createButton}>
            <Button
              onPress={() =>
                router.push({
                  pathname:
                    "/(tabs)/(trip)/(place-navigation)/(place-archive)/create-trip",
                  params: { id },
                })
              }
              title="Tạo hành trình"
              radius={9999}
              titleStyle={{ fontSize: 20, fontWeight: "500" }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ArchiveDetail;

const useStyles = makeStyles((theme) => ({
  createButton: {
    width: "100%",
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
