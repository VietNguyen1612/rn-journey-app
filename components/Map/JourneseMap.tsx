import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import DirectionFactory, { Step } from "@mapbox/mapbox-sdk/services/directions";
import { Avatar, makeStyles, useTheme } from "@rneui/themed";
import Mapbox, {
  Camera,
  LineLayer,
  MapView,
  MarkerView,
  PointAnnotation,
  ShapeSource,
  UserTrackingMode,
} from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/types/Position";
import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { getExactPlace } from "../../api/map";
import { useAuth } from "../../context/auth";
import { Place, PlaceItem, TripPlace } from "../../types/map";
import { useDirection } from "../../context/direction";
import { IconCurrentLocation } from "tabler-icons-react-native";
import MapAttachInfor from "../MapAttach/MapAttachInfor";
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_API || "");

interface JourneseMapProps {
  initLocation: Coordinates;
  pointLocation?: PlaceItem;
  handleMapPress: (place: PlaceItem) => void;
  isDirection: boolean;
  planDirection?: TripPlace[];
}

export const JourneseMap: FC<JourneseMapProps> = ({
  pointLocation,
  initLocation,
  planDirection,
  handleMapPress,
}) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const map = useRef<MapView>(null);
  const camera = useRef<Camera>(null);
  const { userAuth } = useAuth();
  const [coorrdinate, setCoordinate] = useState<Position[]>([]);
  const [tripPlanLocation, setTripPlanLocation] = useState<any>();
  const { directions, setDirections, searchMarker, setSearchMarker } =
    useDirection();
  const directionService = DirectionFactory({
    accessToken:
      process.env.EXPO_PUBLIC_MAPBOX_API ||
      "pk.eyJ1Ijoic2FuZ3RyYW4xMjciLCJhIjoiY2xoYjBpajVlMG1xaTNlczJvYjV1aWc0MiJ9.RbxBSE0jMWav-f1YPbOFig",
  });
  const [waypoints, setWaypoints] =
    useState<Array<{ coordinates: Coordinates }>>();
  const [basicModalInfor, setBasicModalInfor] = useState<
    undefined | { distance: number; duration: number; steps: Step[] }
  >();
  useEffect(() => {
    setWaypoints(
      searchMarker.map((item) => {
        return { coordinates: item };
      })
    );
  }, [searchMarker]);

  useEffect(() => {
    (async () => {
      camera.current?.setCamera({
        centerCoordinate: initLocation,
        animationDuration: 1000,
        zoomLevel: 12,
        animationMode: "none",
      });
    })();
    // setLoading(false);
  }, []);

  //   const getLiveLocation = async () => {yy
  //     const myLocation = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.High,
  //       distanceInterval: 50,
  //     });
  //     console.log(myLocation);
  //     setUserLocation([myLocation.coords.longitude, myLocation.coords.latitude]);
  //   };
  // redirect to point location
  useEffect(() => {
    // if (searchMarket && directions === true) {
    if (waypoints?.length != 0 && waypoints) {
      // Calling directionService service from rnmapbox
      // console.log("searchMarket", searchMarket)
      directionService
        .getDirections({
          profile: "driving",
          geometries: "geojson",
          // overview: "full",
          waypoints: [
            {
              coordinates: initLocation,
            },
            ...waypoints,
          ],
        })
        .send()
        .then((res) => {
          const coorrdinate = res.body.routes[0].geometry.coordinates;
          setCoordinate(coorrdinate as Position[]);
        });
      // Call getDirections when searchMarket changes
    }
    setDirections(false);
  }, [waypoints, directions]);

  // useEffect(() => {
  //   const directions = planDirection?.map((item) => {
  //     return {
  //       coordinates: [item.longitude, item.latitude],
  //     };
  //   });

  //   directionService
  //     .getDirections({
  //       steps: true,
  //       profile: "driving",
  //       geometries: "geojson",
  //       overview: "full",
  //       language: "vi",
  //       waypoints: [
  //         {
  //           coordinates: initLocation,
  //         },
  //         ...(directions! as DirectionsWaypoint[]),
  //       ],
  //     })
  //     .send()
  //     .then((res) => {
  //       setBasicModalInfor({
  //         distance: res.body.routes[0].distance,
  //         duration: res.body.routes[0].duration,
  //         steps: res.body.routes[0].legs[0].steps,
  //       });
  //       setTripPlanLocation(res.body.routes[0].geometry);
  //     });
  // }, []);

  return (
    <View>
      <MapView
        ref={map}
        style={styles.mapContainer}
        localizeLabels={{ locale: "current" }}
        logoEnabled={false}
        scaleBarEnabled={false}
        styleURL={process.env.EXPO_PUBLIC_MAPBOX_STYLE}
        onLongPress={async (e: any) => {
          setSearchMarker([e.geometry.coordinates]);
          try {
            const res = await getExactPlace(e.geometry.coordinates as Place);
            if (!res) return;
            handleMapPress(res);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <View>
          <Camera
            ref={camera}
            followUserMode={UserTrackingMode.Follow}
            followUserLocation
            centerCoordinate={initLocation}
          />
          <MarkerView
            children={
              <Avatar
                source={{ uri: userAuth?.user.avatarUrl }}
                rounded
                size="medium"
              />
            }
            coordinate={initLocation}
          />
        </View>
        {searchMarker && coorrdinate.length !== 0 && (
          <>
            <ShapeSource
              id="user_location_shape_source"
              shape={{
                type: "MultiLineString",
                coordinates: [coorrdinate],
              }}
            >
              <LineLayer
                id="user_location"
                style={{
                  lineWidth: 5,
                  lineColor: theme.colors.brand.primary[600],
                }}
              />
            </ShapeSource>
            {searchMarker.map((item, index) => (
              <PointAnnotation
                key={(index + 1).toString()}
                id={(index + 1).toString()}
                coordinate={[item[0], item[1]]}
                children={
                  <View style={{ zIndex: 100 }}>
                    <IconCurrentLocation
                      color={theme.colors.brand?.red?.[500]}
                      size={40}
                      style={{ zIndex: 100 }}
                    />
                    {/* <MagnifyingGlassCircleIcon size={50} /> */}
                  </View>
                }
              />
            ))}
          </>
        )}
        {planDirection && (
          <>
            <ShapeSource
              id="trip_list_location_shape_source"
              shape={{
                type: "Feature",
                properties: {},
                geometry: tripPlanLocation,
              }}
            >
              <LineLayer
                id="trip_list_location"
                style={{
                  lineWidth: 5,
                  lineColor: theme.colors.brand.primary[500],
                }}
              />
            </ShapeSource>
            {planDirection?.map((item, index) => (
              <PointAnnotation
                key={(index + 1).toString()}
                id={(index + 1).toString()}
                coordinate={[item.longitude, item.latitude]}
                children={
                  <View style={{ zIndex: 100 }}>
                    <IconCurrentLocation
                      color={theme.colors?.brand?.red?.[500]}
                      size={40}
                      style={{ zIndex: 100 }}
                    />
                    {/* <MagnifyingGlassCircleIcon size={50} /> */}
                  </View>
                }
              />
            ))}
            {basicModalInfor && <MapAttachInfor {...basicModalInfor} />}
          </>
        )}
      </MapView>
    </View>
  );
};

const useStyles = makeStyles((_) => ({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
}));
