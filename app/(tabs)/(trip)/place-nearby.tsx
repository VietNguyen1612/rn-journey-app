import { View, FlatList } from "react-native";
import React, { FC, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { useQueryNearbyPlaces } from "../../../api/map";

import { Chip, makeStyles } from "@rneui/themed";
import PlaceItemCard from "../../../components/PlaceItemCard/PlaceItemCard";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { Loading } from "../../../components";

const PlaceNearby: FC = () => {
  const styles = useStyles();
  const { long, lat } = useLocalSearchParams<{ long: string; lat: string }>();

  const { data, isLoading } = useQueryNearbyPlaces([Number(long), Number(lat)]);

  return (
    <View style={styles.conatiner}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 30, backgroundColor: "white" }}>
          <View style={styles.chipListContainer}>
            <Chip title="Tất cả" />
            <Chip title="Giải khát" type="outline" />
            <Chip title="Quán ăn" type="outline" />
            <Chip title="Giải trí" type="outline" />
            <Chip title="Giải trí" type="outline" />
          </View>
          {isLoading ? (
            <Loading size={200} />
          ) : (
            <FlatList
              data={data?.features}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              initialNumToRender={5}
              renderItem={({ item }) => (
                <PlaceItemCard
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(trip)/place-detail",
                      params: { placeId: item.properties.place_id },
                    })
                  }
                  item={item}
                />
              )}
            />
          )}
          <StatusBar style="light" />
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  conatiner: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
  },
  chipListContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
}));

export default PlaceNearby;
