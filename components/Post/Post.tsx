import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import {
  IconArrowBigRightFilled,
  IconHeart,
  IconHeartFilled,
  IconMessages,
  IconShare3,
} from "tabler-icons-react-native";
import { Avatar, Image, makeStyles, useTheme } from "@rneui/themed";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";
import { PostInteface } from "../../types/post";
import { useAuth } from "../../context/auth";
import { GetAllComments, addComment, useQueryComments } from "../../api";

interface PostProps {
  post: PostInteface;
}

const tablet = Dimensions.get("window").width > 640 ? true : false;

export const Post: FC<PostProps> = (props) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState<string>("");
  const { userAuth } = useAuth();
  const { data, isLoading, refetch } = useQueryComments(
    userAuth?.accessToken!,
    props.post._id
  );

  const handlePress = () => {
    setImage(props.post.assests[0]);
    setIsShowImage(true);
  };

  const openComment = async () => {
    // console.log(data)
    setIsOpenComment(!isOpenComment);
  };

  const handleSendMessage = () => {
    addComment(
      userAuth?.accessToken!,
      userAuth?.user._id,
      props.post._id,
      message
    );
    setMessage('')
    refetch();
  };

  const renderCommentList = (data: GetAllComments | undefined) => {
    return (
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        {data?.data.map((i, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            <Avatar
              size={48}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibRhC_l2NylzcKzyuNT8H2PnInA0l93Rg7AVfSJqzKw&s",
              }}
              rounded
            />
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Anonymous</Text>
              <Text>{i.content}</Text>
            </View>
          </View>
        ))}
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            paddingVertical: 20,
            paddingBottom: 30,
            paddingRight: 5,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              paddingVertical: tablet ? 15 : 10,
              flex: 1,
              borderRadius: 50,
              marginRight: 10,
            }}
            value={message}
            onChangeText={(value) => setMessage(value)}
            placeholder="Enter your message"
          />

          <Pressable
            onPress={handleSendMessage}
            style={{
              width: tablet ? "8%" : "15%",
              backgroundColor: theme.colors.brand.primary[500],
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
            }}
          >
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <IconArrowBigRightFilled color="white" size={tablet ? 30 : 22} />
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View>
      {isShowImage && (
        <EnhancedImageViewing
          images={[
            {
              uri: image,
            },
          ]}
          imageIndex={1}
          visible={isShowImage}
          onRequestClose={() => setIsShowImage(false)}
        />
      )}
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.informationContainer}>
            <Avatar
              source={{
                uri: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/387737672_630564202562668_5318134621466134215_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=c932FGEVkfUAX_-ldmT&_nc_ht=scontent.fsgn5-5.fna&_nc_e2o=s&oh=00_AfDPvmz2IwAW4tRFgk16FEQvbn6OkrrRueVaM6dh6KJgKg&oe=653D2519",
              }}
              size={tablet ? "large" : "medium"}
              rounded
            />
            <View style={styles.nameContainer}>
              <Text style={styles.username}>Journese - Smart Trip Planner</Text>
              <Text style={styles.createdDate}>07/10/2023</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{props.post.content}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: props.post.assests[0],
            }}
            onPress={() => handlePress()}
          />
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => setIsLike(!isLike)}
          >
            {isLike ? (
              <IconHeartFilled size={tablet ? 32 : 24} color="red" />
            ) : (
              <IconHeart size={tablet ? 32 : 24} />
            )}
            <Text style={styles.actionText}>Quan tâm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openComment}
            style={styles.actionContainer}
          >
            <IconMessages size={tablet ? 32 : 24} />
            <Text style={styles.actionText}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionContainer}>
            <IconShare3 size={tablet ? 32 : 24} />
            <Text style={styles.actionText}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
        {isOpenComment && renderCommentList(data)}
      </View>
    </View>
  );
};

const useStyles = makeStyles((_) => ({
  container: {
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: "3%",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  imageContainer: {
    aspectRatio: 2 / 1,
  },
  footerContainer: {
    flexDirection: "row",
    padding: 12,
  },
  informationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  nameContainer: {
    gap: 4,
    marginLeft: 12,
  },
  username: {
    fontSize: tablet ? 24 : 18,
    fontWeight: "600",
  },
  createdDate: {
    color: _.colors.brand.neutral[500],
    fontSize: tablet ? 20 : 16,
  },
  contentContainer: {
    marginTop: 8,
  },
  content: {
    fontSize: tablet ? 20 : 16,
  },
  actionContainer: {
    width: "33%",
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tablet ? 13 : 7,
  },
  actionText: {
    fontWeight: "500",
    fontSize: tablet ? 22 : 16,
  },
}));
