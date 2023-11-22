import { TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { Image, Text, makeStyles, ListItem, Button } from "@rneui/themed";
import { Archive } from "../../types/archive";
import { IconDots, IconX } from "tabler-icons-react-native";
import { Link, router } from "expo-router";
interface ArchiveCardProps {
  archive: Archive;
  onNavigate?: () => void;
  onDelete?: () => void;
  onModify?: () => void;
}

export const ArchiveCard: FC<ArchiveCardProps> = ({
  archive,
  onNavigate,
  onDelete,
  onModify,
}) => {
  const [expandFunction, setExpandFunction] = useState(false);
  const styles = useStyles({ expandFunction });

  return (
    <Link
      href={{
        pathname:
          "/(tabs)/(trip)/(place-navigation)/(place-archive)/[archive-detail]",
        params: { id: archive._id },
      }}
      replace
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.img}
          />
          <View style={styles.description}>
            <Text textM medium>
              {archive.title}
            </Text>
            <Text>{archive.placesNumber} địa điểm</Text>
          </View>
        </View>
        <View>
          <ListItem.Accordion
            containerStyle={{
              padding: 0,
              position: "relative",
            }}
            isExpanded={expandFunction}
            expandIcon={<IconX />}
            onPress={() => setExpandFunction(!expandFunction)}
            icon={<IconDots />}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                gap: 2,
              }}
            >
              <Button
                title="Sửa"
                color="warning"
                size="sm"
                titleStyle={styles.buttonFont}
              />
              <Button
                title="Xoá"
                color="error"
                size="sm"
                titleStyle={styles.buttonFont}
              />
            </View>
          </ListItem.Accordion>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const useStyles = makeStyles(
  (theme, { expandFunction }: { expandFunction: boolean }) => ({
    container: {
      marginTop: 10,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: theme.colors.brand.neutral[100],
      padding: 12,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      opacity: expandFunction ? 0.2 : undefined,
    },
    description: {
      maxWidth: 200,
      gap: 5,
    },
    img: {
      width: 75,
      height: 75,
      borderRadius: 5,
      aspectRatio: 1,
    },
    buttonFont: {
      fontSize: 16,
    },
  })
);
