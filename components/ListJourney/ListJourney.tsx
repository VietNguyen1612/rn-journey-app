import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Card, Text, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import {
  IconBuildingCommunity,
  IconClockHour4,
  IconEdit,
  IconRoad,
} from "tabler-icons-react-native";
import { useAuth } from "../../context/auth";
import { useAllTripPlan } from "../../api/map/trip";
import LottieView from "lottie-react-native";
import { Loading } from "../Loading";

const tablet = Dimensions.get("window").width > 640 ? true : false;

const TRIPS = [
  {
    id: 1,
    title: "Hành trình khám phá Đà Lạt lần 1",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
  {
    id: 2,
    title: "Hành trình khám phá Đà Lạt lần 2",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
  {
    id: 3,
    title: "Hành trình khám phá Đà Lạt lần 3",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
  {
    id: 4,
    title: "Hành trình khám phá Đà Lạt lần 4",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
  {
    id: 5,
    title: "Hành trình khám phá Đà Lạt lần 5",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
  {
    id: 6,
    title: "Hành trình khám phá Đà Lạt lần 6",
    locations: "Hồ Chí Minh, Đồng Nai, Lâm Đồng",
    startDate: "24.01.2023",
    endDate: "25.01.2023",
    numLocation: 3,
    numPost: 5,
    distance: 60,
    time: "5 tiếng",
  },
];

interface LabelProps {
  name: string;
  icon: React.ReactElement;
}

const Label: FC<LabelProps> = (props) => {
  const styles = useStyles();
  return (
    <View style={styles.labelContainer}>
      {props.icon}
      <Text style={styles.labelName}>{props.name}</Text>
    </View>
  );
};

export const ListJourney: FC = (/* list post */ props) => {
  const styles = useStyles();
  const { userAuth } = useAuth();
  const { data, isLoading } = useAllTripPlan(userAuth?.accessToken!);

  return (
    <View>
      {isLoading ? (
        <Loading size={150} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/journey",
                  params: { tripId: item._id },
                });
              }}
            >
              <Card
                wrapperStyle={styles.cardWrapperStyle}
                containerStyle={styles.cardContainerStyle}
              >
                <Card.Title>{item.title}</Card.Title>
                <View style={styles.inforContainer}>
                  <Text style={styles.labelName}>
                    {item.places[0].province}
                  </Text>
                  <Text style={styles.labelName}>
                    {"10/7/2023" + " -> " + "22/7/2023"}
                  </Text>
                  <View style={styles.labelWrapper}>
                    <Label
                      icon={<IconBuildingCommunity size={tablet ? 22 : 16} />}
                      name={item.places.length + " địa điểm"}
                    />
                    <Label
                      icon={<IconEdit size={tablet ? 22 : 16} />}
                      name={"3 bài viết"}
                    />
                    <Label
                      icon={<IconRoad size={tablet ? 22 : 16} />}
                      name={"20 km"}
                    />
                    <Label
                      icon={<IconClockHour4 size={tablet ? 22 : 16} />}
                      name={"24 hour"}
                    />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const useStyles = makeStyles((_) => ({
  cardWrapperStyle: {
    alignItems: "flex-start",
  },
  cardContainerStyle: {
    borderRadius: 12,
    shadowOpacity: 0,
    paddingHorizontal: tablet ? 30 : 20,
    paddingVertical: tablet ? 20 : 12,
    marginHorizontal: 0,
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: tablet ? 6 : 2,
  },
  labelName: {
    fontSize: tablet ? 22 : 14,
  },
  inforContainer: {
    gap: 6,
    opacity: 0.5,
  },
}));
