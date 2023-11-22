import BottomSheet from "@gorhom/bottom-sheet";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { Text } from "@rneui/themed";
import * as Location from "expo-location";
import { router } from "expo-router";
import * as TaskManager from "expo-task-manager";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  JourneseMap,
  MapSideFunctionBar,
  MyBottomSheet,
  PlaceDetailBottomSheet,
} from "../../../components";
import { PlaceItem } from "../../../types/map";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription: Location.LocationSubscription | undefined =
  undefined;

// Define the background task for location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({ data, error }: { data: any; error: any }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      // Extract location coordinates from data
      const { locations } = data;
      const location = locations[0];
      if (location) {
      }
    }
  }
);

const Trip = () => {
  const [place, setPlace] = useState<Coordinates | undefined>(undefined);
  const [location, setLocation] = useState<PlaceItem | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [onPointPlace, setOnPointPlace] = useState<PlaceItem | undefined>(
    undefined
  );
  const [directions, setDirections] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
  }, []);
  useEffect(() => {
    startForegroundUpdate();
  }, []);
  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      return;
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        setPlace([location.coords.longitude, location.coords.latitude]);
      }
    );
  };

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    setPlace(undefined);
  };

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };
  useEffect(() => {
    if (directions) {
      bottomSheetRef.current?.snapToIndex(-1);
    }
  }),
    [directions];

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  };

  const handleNearbyPress = () => {
    if (place) {
      router.push({
        pathname: "/(tabs)/(trip)/place-nearby",
        params: { long: place[0], lat: place[1] },
      });
    }
  };
  const updateLocation = (isDirection: boolean) => {
    setDirections(isDirection);
    console.log("isDirection", isDirection);
  };

  return (
    <View style={{ position: "relative" }}>
      {place && (
        <JourneseMap
          initLocation={place}
          pointLocation={onPointPlace}
          // planDirection={[
          //   {
          //     images: [],
          //     operating_hours: {},
          //     service_options: {},
          //     _id: "650e1df0fd78ed339edd97eb",
          //     name: "Anna's Coffee House",
          //     place_id: "",
          //     phone: "0975033773",
          //     website: "https://directions-ca-phe.business.site/?m=true",
          //     thumbnail:
          //       "https://lh5.googleusercontent.com/p/AF1QipOK2mnbcfxDRgP3_7YWmWJaFK-9SKKnF7vTvERp=w122-h92-k-no",
          //     latitude: 11.9233329,
          //     longitude: 108.44457039999999,
          //     latitudeDelta: 0,
          //     longitudeDelta: 0,
          //     rating: 3.7,
          //     category: "coffee",
          //     reviews: 459,
          //     viewCount: 0,
          //     province: "Lâm Đồng",
          //     city: "Đà Lạt",
          //   },
          //   {
          //     images: [],
          //     operating_hours: {},
          //     service_options: {},
          //     _id: "650e1df0fd78ed339edd97fd",
          //     name: "Kan Coffee",
          //     place_id: "",
          //     phone: "02636500888",
          //     website: "",
          //     thumbnail:
          //       "https://lh5.googleusercontent.com/p/AF1QipNgtZ_v6iN-rpCGqbQQPaT_E5QAVeot0WYFF-lH=w122-h92-k-no",
          //     latitude: 11.927863799999999,
          //     longitude: 108.4322546,
          //     latitudeDelta: 0,
          //     longitudeDelta: 0,
          //     rating: 4.3,
          //     category: "coffee",
          //     reviews: 85,
          //     viewCount: 0,
          //     province: "Lâm Đồng",
          //     city: "Đà Lạt",
          //   },
          // ]}
          isDirection={directions}
          handleMapPress={(placeItem) => {
            setOnPointPlace(placeItem);
            setDirections(false);
            bottomSheetRef.current?.snapToIndex(0);
          }}
        />
      )}
      <MapSideFunctionBar onNearbyPress={handleNearbyPress} />
      <MyBottomSheet
        ref={bottomSheetRef}
        children={<PlaceDetailBottomSheet place={onPointPlace} />}
      />
    </View>
  );
};

export default Trip;
