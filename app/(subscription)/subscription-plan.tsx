import { View, Pressable, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Button, makeStyles, useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { IconCircleCheck } from "tabler-icons-react-native";
import { router } from "expo-router";

const subscriptionPlan = [
  {
    name: "Hành trình đồng",
    price: "20000",
    features: [
      "Được thêm tối đa 6 địa điểm",
      "Được thêm tối đa 3 thành viên",
      "Hỗ trợ tìm kiếm quán ăn và nơi ở",
      "Được chia sẻ hành trình lên cộng đồng",
    ],
  },
  {
    name: "Hành trình bạc",
    price: "30000",
    features: [
      "Được thêm tối đa 12 địa điểm",
      "Được thêm tối đa 5 thành viên",
      "Hỗ trợ tìm kiếm quán ăn và nơi ở",
      "Được chia sẻ hành trình lên cộng đồng",
    ],
  },
  {
    name: "Hành trình vàng",
    price: "50000",
    features: [
      "Không giới hạn số lượng địa điểm",
      "Không giới hạn số lượng thành viên",
      "Hỗ trợ tìm kiếm quán ăn và nơi ở",
      "Được chia sẻ hành trình lên cộng đồng",
    ],
  },
];

const SubscriptionPlan = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(0);
  const [price, setPrice] = useState(20000);
  const cardRef = useRef(null);

  const handleClick = (index: number) => {
    setIsClicked(index);
    switch (index) {
      case 0:
        setPrice(20000);
        break;
      case 1:
        setPrice(30000);
        break;
      case 2:
        setPrice(50000);
        break;
      default:
        break;
    }
  };

  const confirmPayment = (price: number) => {
    router.push({
      pathname: "/(subscription)/payment",
      params: { price: price },
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
      >
        <Text style={styles.title}>Thông tin các gói hành trình</Text>
        {subscriptionPlan.map((item, index) => (
          <Pressable
            onPress={(e) => handleClick(index)}
            ref={cardRef}
            key={index}
            style={{
              borderColor:
                index === isClicked
                  ? theme.colors.brand.primary[600]
                  : theme.colors.brand.primary[50],
              ...styles.priceCard,
            }}
          >
            <Text style={styles.priceCardTitle}>{item.name}</Text>
            <Text style={styles.priceCardMoney}>{item.price}</Text>
            <View style={styles.featureContainer}>
              {item.features.map((feature, index) => (
                <View key={index} style={styles.feature}>
                  <IconCircleCheck
                    size={18}
                    color={theme.colors.brand.primary[400]}
                  />
                  <Text style={styles.featureContent}>{feature}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.reminder}>
              *Chi phí chỉ bắt đầu tính khi hành trình bắt đầu
            </Text>
          </Pressable>
        ))}
        <View style={styles.buttonContainer}>
          <Button
            onPress={(e) => confirmPayment(price)}
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            title={"Xác nhận"}
          />
          <Button
            onPress={() => router.back()}
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            type="outline"
            title={"Quay lại"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPlan;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    gap: 16,
    marginHorizontal: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 18,
    color: theme.colors.brand.primary[600],
    fontWeight: "700",
    textAlign: "center",
  },
  priceCard: {
    width: 350,
    borderRadius: 16,
    borderWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "column",
    gap: 11,
    alignItems: "center",
    backgroundColor: "#F0FBF1",
    marginTop: 16,
  },
  priceCardTitle: {
    fontSize: 16,
    color: theme.colors.brand.neutral[800],
    fontWeight: "600",
  },
  priceCardMoney: {
    fontSize: 36,
    fontWeight: "700",
    color: theme.colors.brand.primary[700],
  },
  featureContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  featureContent: {
    fontSize: 14,
    fontWeight: "400",
    color: theme.colors.brand.neutral[700],
  },
  reminder: {
    color: theme.colors.brand.neutral[400],
    fontSize: 10,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 16,
    marginVertical: 30,
  },
  button: {
    borderRadius: 56,
    width: 340,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
}));
