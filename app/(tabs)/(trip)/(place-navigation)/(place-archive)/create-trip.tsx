import React, { FC, useState } from "react";
import {
  Avatar,
  Button,
  Image,
  ListItem,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import {
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ListFriends,
  Loading,
  Success,
  TextInput,
} from "../../../../../components";
import { useArchiveDetail } from "../../../../../api";
import { useAuth } from "../../../../../context/auth";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconPointFilled,
} from "tabler-icons-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createTripPlanByArchiveId } from "../../../../../api/map/trip";
import { User } from "../../../../../types/user";
import LottieView from "lottie-react-native";
const tablet = Dimensions.get("window").width > 640 ? true : false;
const { width, height } = Dimensions.get("screen");

const CreateTrip: FC = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const styles = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userAuth } = useAuth();
  const [participates, setParticipates] = useState<User[]>([]);
  const { data, isLoading } = useArchiveDetail(
    userAuth?.accessToken!,
    id as string
  );
  const [showFriends, setShowFriends] = useState(false);

  const handleAddFriend = (user: User) => {
    if (!participates.includes(user)) setParticipates((pre) => [...pre, user]);
    setShowFriends(false);
  };
  const handleRemoveFriend = (user: User) => {
    const newParticipates = participates.filter(
      (item) => item._id !== user._id
    );
    setParticipates(newParticipates);
  };

  return (
    <>
      {showFriends && (
        <Pressable
          style={styles.friendListBackground}
          onPress={() => setShowFriends(false)}
        >
          <View style={styles.friendListContainer}>
            <ListFriends onPress={(e) => handleAddFriend(e)} />
          </View>
        </Pressable>
      )}
      {isLoading ? (
        <Loading size="50%" />
      ) : (
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values) => {
            setIsSubmit(true);
            createTripPlanByArchiveId(
              userAuth?.accessToken!,
              values.title,
              participates,
              id
            );
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("*Bắt buộc"),
          })}
        >
          {({ handleChange, handleBlur, handleSubmit, errors }) => (
            <View style={styles.page}>
              {isSubmit && (
                <Success
                  isSuccess={isSubmit}
                  onPress={() => router.back()}
                  content="Tạo thành công"
                />
              )}
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 60, paddingBottom: 30 }}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Tạo hành trình</Text>
                  </View>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      placeholder="Hành trình..."
                      label="Tên hành trình"
                      defaultValue={data?.title}
                      onChangeText={handleChange("title")}
                      errorMessage={errors.title}
                    />

                    <TextInput
                      placeholder="Địa điểm..."
                      label="Địa điểm bắt đầu"
                    />
                    <TextInput
                      placeholder="Thời gian..."
                      label="Thời gian bắt đầu"
                    />
                  </View>
                  <View style={styles.addFriendContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text style={styles.buttonTitle}>Thêm bạn bè</Text>
                      <TouchableOpacity onPress={() => setShowFriends(true)}>
                        <IconCirclePlus
                          size={36}
                          color={theme.colors.brand.primary[700]}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      contentContainerStyle={styles.friendFlatList}
                      scrollEnabled={false}
                      data={participates}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={styles.friendCardContainer}>
                            <Avatar
                              size={44}
                              rounded
                              source={{ uri: item.avatarUrl }}
                            />
                            <Text style={{ fontSize: 14, fontWeight: "500" }}>
                              {item.username}
                            </Text>
                          </View>

                          <Pressable onPress={() => handleRemoveFriend(item)}>
                            <IconCircleMinus
                              size={36}
                              color={theme.colors.brand.red[300]}
                            />
                          </Pressable>
                        </View>
                      )}
                    />
                  </View>
                  <View>
                    <Text style={styles.buttonTitle}>Các địa điểm</Text>
                    <View style={styles.placeContainer}>
                      <ListItem.Accordion
                        content={
                          <ListItem.Content>
                            <View style={styles.locationInfor}>
                              <View style={styles.locationImageContainer}>
                                <Image
                                  style={styles.locationImage}
                                  borderRadius={5}
                                  source={{
                                    uri: data?.places[0].thumbnail,
                                  }}
                                />
                              </View>
                              <Text style={styles.locationTitle}>
                                Danh sách
                              </Text>
                            </View>
                          </ListItem.Content>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                          setExpanded(!expanded);
                        }}
                      >
                        <FlatList
                          contentContainerStyle={styles.locationContainer}
                          scrollEnabled={false}
                          data={data?.places}
                          renderItem={({ item, index }) => (
                            <Pressable style={styles.locationInfor}>
                              {index !== 0 && (
                                <View
                                  style={styles.locationConectionLineContainer}
                                >
                                  <Text style={styles.locationConectionLine}>
                                    - - -
                                  </Text>
                                </View>
                              )}
                              <View style={styles.scale}>
                                <IconPointFilled
                                  size={20}
                                  color={theme.colors?.brand?.primary?.[500]}
                                />
                              </View>
                              <View style={styles.locationImageContainer}>
                                <Image
                                  style={styles.locationImage}
                                  borderRadius={5}
                                  source={{
                                    uri: item.thumbnail,
                                  }}
                                />
                              </View>
                              <View style={styles.locationContent}>
                                <Text style={styles.locationTitle}>
                                  {item.name}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  ellipsizeMode="tail"
                                  style={styles.locationPlace}
                                >
                                  {item.city} - {item.province}
                                </Text>
                              </View>
                            </Pressable>
                          )}
                        />
                      </ListItem.Accordion>
                    </View>
                  </View>
                  <Button
                    onPress={() => handleSubmit()}
                    title="Tạo"
                    titleStyle={styles.buttonTitle}
                    radius={999}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.page,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    paddingVertical: 16,
    fontWeight: "600",
    color: theme.colors.brand.primary[600],
  },
  inputFieldContainer: {
    gap: 6,
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  addFriendContainer: {
    marginVertical: 10,
  },
  placeContainer: {
    paddingBottom: 20,
  },
  locationContainer: {
    gap: 20,
  },
  locationInfor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  locationImageContainer: {
    width: tablet ? 100 : 60,
    aspectRatio: 1,
  },
  locationImage: {
    width: "100%",
    height: "100%",
  },
  locationContent: {
    maxWidth: "70%",
    gap: 5,
  },
  locationTitle: {
    fontSize: tablet ? 22 : 15,
    fontWeight: "500",
  },
  locationPlace: {
    fontSize: tablet ? 19 : 12,
    opacity: 0.6,
  },
  locationConectionLineContainer: {
    position: "absolute",
    transform: [{ rotate: "90deg" }, { scale: tablet ? 1.6 : 1 }],
    top: -25,
    left: -11,
  },
  locationConectionLine: {
    fontSize: tablet ? 27 : 26,
    color: theme.colors?.brand?.primary?.[200],
  },
  scale: {
    transform: [{ scale: tablet ? 1.4 : 1 }],
  },
  friendListContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    height: height / 3,
    width: (width * 3) / 4,
  },
  friendListBackground: {
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  friendFlatList: {
    borderColor: theme.colors.brand.primary[600],
    borderWidth: 0.4,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  friendCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 5,
  },
}));

export default CreateTrip;
