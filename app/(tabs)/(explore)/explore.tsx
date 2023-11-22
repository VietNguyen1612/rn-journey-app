import { Chip, SearchBar, makeStyles, useTheme } from "@rneui/themed";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Dimensions } from "react-native";
import PlaceCard from "../../../components/Explore/PlaceCard/PlaceCard";
import { addPlaceToArchive, useQueryAllPlacesPagination } from "../../../api";
import { Place } from "../../../types/place";
import { useAuth } from "../../../context/auth";
import { ListArchives, LoadingScreen, Success } from "../../../components";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");

// const Places: PlaceType[] = [
//   {
//     id: 1,
//     name: "Khu du lịch Sun World Bà Nà Hills",
//     distance: "600km",
//     duration: "10 tiếng",
//     price: "6 lít",
//     image: ["https://shorturl.at/bwS09"],
//     category: "leo núi",
//   },
//   {
//     id: 2,
//     name: "Khu du lịch Sun World Bà Nà Hills",
//     distance: "600km",
//     duration: "10 tiếng",
//     price: "6 lít",
//     image: [
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/39/d0/86/caption.jpg?w=500&h=400&s=1",
//     ],
//     category: "biển",
//   },
//   {
//     id: 3,
//     name: "Khu du lịch Sun World Bà Nà Hills",
//     distance: "600km",
//     duration: "10 tiếng",
//     price: "6 lít",
//     image: [
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/39/d0/86/caption.jpg?w=500&h=400&s=1",
//     ],
//     category: "khu sinh thái",
//   },
//   {
//     id: 4,
//     name: "Khu du lịch Sun World Bà Nà Hills",
//     distance: "600km",
//     duration: "10 tiếng",
//     price: "6 lít",
//     image: ["https://shorturl.at/aKLW4"],
//     category: "leo núi",
//   },
//   {
//     id: 5,
//     name: "Khu du lịch Sun World Bà Nà Hills",
//     distance: "600km",
//     duration: "10 tiếng",
//     price: "6 lít",
//     image: [
//       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/39/d0/86/caption.jpg?w=500&h=400&s=1",
//     ],
//     category: "khu vui chơi",
//   },
// ];

const Explore = () => {
  const styles = useStyles();
  const [showArchives, setShowArchives] = useState(false);
  const [success, setSuccess] = useState(false);
  const [placeId, setPlaceId] = useState<string>();
  const { theme } = useTheme();
  const { userAuth } = useAuth();
  const { data: places, isLoading } = useQueryAllPlacesPagination(
    userAuth?.accessToken!,
    5,
    ""
  );

  //cái này để lấy list category từ list place
  const categoryList = useMemo(() => {
    return Array.from(new Set(places?.map((place) => place.category)));
  }, [places]);
  return (
    <View style={styles.container}>
      {success && (
        <Success
          isSuccess={success}
          onPress={() => setSuccess(false)}
          content="Đưa vào lưu trữ thành công"
        />
      )}
      {showArchives && (
        <Pressable
          style={styles.archiveListBackground}
          onPress={() => setShowArchives(false)}
        >
          <View style={styles.archiveListContainer}>
            <ListArchives
              onPress={(archiveId) => {
                addPlaceToArchive(
                  userAuth?.accessToken!,
                  placeId as string,
                  archiveId
                );
                setShowArchives(false);
                setSuccess(true);
              }}
            />
          </View>
        </Pressable>
      )}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View style={{ paddingTop: 60, paddingBottom: 16 }}>
            <SearchBar
              inputContainerStyle={styles.searchBarInputContainer}
              containerStyle={styles.searchBarContainer}
              placeholder="tìm kiếm"
              platform="android"
            />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.filterContainer}
              contentContainerStyle={styles.contentContainerStyle}
            >
              {categoryList.map((item) => (
                <Chip
                  key={item}
                  title={item}
                  type="solid"
                  color={theme.colors.background}
                  containerStyle={styles.categoryContainer}
                  titleStyle={styles.categoryText}
                  onPress={() => {}}
                />
                // <Pressable key={item} style={styles.categoryContainer}>
                //   <Text textS>{item}</Text>
                // </Pressable>
              ))}
            </ScrollView>
            {/* <RecommendedPlaceList
          title="Địa điểm đề xuất hôm nay"
          placesArray={Places}
        /> */}
            <View style={styles.placeList}>
              {places?.map((item: Place, key) => (
                <PlaceCard
                  key={key}
                  item={item}
                  addToArchive={() => {
                    setShowArchives(true), setPlaceId(item._id);
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  //fix conflict nhớ giữ của main
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 10,
    borderRadius: 30,
  },
  searchBarInputContainer: {
    height: 30,
  },
  filterContainer: {
    height: 40,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 14,
  },
  contentContainerStyle: {
    alignItems: "center",
  },
  filterText: {
    lineHeight: 20,
  },
  categoryContainer: {
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.brand.neutral[400],
  },
  placeList: {
    margin: 17,
    rowGap: 12,
  },
  archiveListContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    height: height / 3,
    width: (width * 3) / 4,
  },
  archiveListBackground: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
}));
export default Explore;
