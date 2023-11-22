import { Dimensions, FlatList, View } from "react-native";
import React, { FC, useState } from "react";
import { Image, makeStyles } from "@rneui/themed";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";

const IMAGES = [
  {
    _id: "1",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "2",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwDl7-K0TN0Zkx1MyGlsLwX2rMHHi_C16fQ&usqp=CAU",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "3",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "4",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "5",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "6",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "7",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "8",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "9",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
  {
    _id: "10",
    content: "1231232",
    createdDate: "312",
    like: 1,
    author: {
      _id: "1",
      avatarUrl:
        "https://vcdn-dulich.vnecdn.net/2020/01/08/sac-mau-cua-bien-vnexpress-1-6641-1578454676.jpg",
      username: "Sy",
    },
    comment_count: 2,
  },
];

interface ImagesProps {
  disableTitle?: boolean;
  numColums: number;
  horizontal?: boolean;
}

const tablet = Dimensions.get("window").width > 640 ? true : false;

export const ListImage: FC<ImagesProps> = (/* list image */ props) => {
  const [image, setImage] = useState(-1);
  const styles = useStyles(props.numColums);

  const imageURL = IMAGES.map((item, index) => ({
    index,
    uri: item.author.avatarUrl,
  }));

  return (
    <View>
      {image != -1 && (
        <EnhancedImageViewing
          // Trùng key bug - lên prod là hết ez
          images={imageURL}
          imageIndex={image}
          visible={image != -1 ? true : false}
          onRequestClose={() => setImage(-1)}
        />
      )}
      <FlatList
        contentContainerStyle={styles.container}
        scrollEnabled={props.horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={props.horizontal}
        data={IMAGES}
        renderItem={({ item, index }) => (
          <View
            style={
              props.horizontal
                ? styles.wrapperHorizontal
                : styles.wrapperVertical
            }
          >
            <Image
              style={styles.image}
              source={{ uri: item.author.avatarUrl }}
              borderRadius={6}
              onPress={() => setImage(index)}
            />
            {/* {props.disableTitle || (
              <View className="absolute bottom-0 pl-3 flex flex-row items-center w-full h-1/6 bg-neutral-800/60 rounded-bl-md rounded-br-md">
                <HeartIcon size={14} color="red" />
                <Text className="text-white text-xs ml-1">100.3k</Text>
              </View>
            )} */}
          </View>
        )}
        numColumns={props.numColums}
      />
    </View>
  );
};
const useStyles = makeStyles((_, numColumns: number) => ({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  wrapperVertical: {
    width: `${100 / numColumns}%`,
    aspectRatio: 0.7,
    paddingHorizontal: tablet ? 9 : 6,
    marginVertical: tablet ? 9 : 6,
  },
  wrapperHorizontal: {
    height: `100%`,
    aspectRatio: 0.6,
    marginHorizontal: tablet ? 9 : 6,
    paddingVertical: tablet ? 9 : 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
}));
