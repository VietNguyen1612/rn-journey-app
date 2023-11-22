import { View, Dimensions, StyleSheet } from "react-native";
import React, { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ListImage, ListPost } from "../../components";
const { height, width } = Dimensions.get("window");

const Home: FC = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <View style={styles.reelContainer}>
            <ListImage horizontal={true} numColums={1} />
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={["", "", "", "", "", ""]}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.reelContainer,
                  {
                    paddingLeft: index === 0 ? (tablet ? 16 : 10) : 0,
                  },
                ]}
              >
                <Reel
                  isBegin={index === 0}
                  rounded={9}
                  url="https://s3-alpha-sig.figma.com/img/505a/4dc9/a1892ef9f12283c5ce80e3f1fb48a660?Expires=1692576000&Signature=BiYp0YoCl2i6iI6QP9pi4CV6eNych-KgDJyP~nnMNHhcCaTo9r3yC2qmsF8NgiSh~wA75sscFd6YhSv3efRBBJwnkP-D9CZfNrHCsDQ55itglBKPD6CmiBXTYgDBodNhOf9zFyjqfWCEQ4cYLKlWlREXoR~NTiYiPpiBIj1oUgau02~o46lgKxSryMi19UGhNX1hBc0oY2FdCq8DbO~3dnVnbDgBIzwGzOSROHIxNp1AtdVgHIMh78le8ccTN1pT-X5WtM5jYSzVEf2r9Q39fRtQ7qS0D3UOZjvvTF4gj7TVaUzAXXbmSxI1BWF0p0-tL4EY5Ve~N1xRsPDEnPtvPw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                />
              </View>
            )}
          />
          </View> */}
          <ListPost />
        </View>
      </ScrollView>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      {/* <Image source={}/> */}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: { paddingBottom: 30, paddingTop: 60 },
  reelContainer: {
    height: Math.floor(height / 3.8),
    marginBottom: 10,
    paddingTop: 50,
    backgroundColor: "white",
  },
});
