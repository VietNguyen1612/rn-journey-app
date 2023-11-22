import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "@rneui/themed";

const { height, width } = Dimensions.get("screen");
const payment = () => {
    const { price } = useLocalSearchParams<{ price: string }>();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
                style={{ height: height, width: width, resizeMode: "contain" }}
                source={{
                    uri: `https://img.vietqr.io/image/tpbank-00001876953-compact2.jpg?amount=${price}&addInfo=thanh%20toan%20journese&accountName=VO%20MINH%20BAO`,
                }}
            />
        </View>
    );
};

export default payment;
