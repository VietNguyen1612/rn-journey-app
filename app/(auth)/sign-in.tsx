import React, { useState } from "react";
import { Text, makeStyles } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { Button, LoadingScreen, TextInput } from "../../components";
import { UserLoginRequest, login } from "../../api/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../utils/regex";
import { useAuth } from "../../context/auth";
import { router } from "expo-router";

const SignIn = () => {
  const styles = useStyles();
  const { setUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.container}>
            <Formik<UserLoginRequest>
              initialValues={{ phone: "0399716348", password: "123456" }}
              onSubmit={async (values) => {
                setIsLoading(true);
                const user = await login(values);
                if (!user) {
                  return;
                }
                setUserAuth(user);
              }}
              validationSchema={Yup.object().shape({
                phone: Yup.string()
                  .length(10, "Số điện thoại phải gồm chính xác 10 số")
                  .matches(phoneRegExp, "Số điện thoại không hợp lệ")
                  .required("Số điện thoại bắt buộc "),
                password: Yup.string()
                  .min(6, "Độ dài tối thiểu là 6 kí tự")
                  .max(20, "Độ dài tối đa là 20 kí tự")
                  .required("Mật khẩu bắt buộc"),
              })}
            >
              {({ handleChange, handleBlur, handleSubmit, errors }) => (
                <View>
                  <Text headingM style={styles.title}>
                    Đăng nhập
                  </Text>
                  <TextInput
                    label="Số điện thoại"
                    placeholder="xxxx-xxx-xxx"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    errorMessage={errors.phone}
                  />
                  <TextInput
                    label="Mật khẩu"
                    placeholder="*********"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    errorMessage={errors.password}
                  />
                  {/* <View style={styles.problemContainer}>
                    <Text style={styles.problemTitle}>
                      Gặp vấn đề với việc đăng nhập?
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(auth)/sign-up")}
                    >
                      <Text style={styles.problemText}>Giải quyết ngay</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Đăng nhập"
                      color="primary"
                      size="md"
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
          <View style={[styles.problemContainer, { height: 100 }]}>
            <Text style={[styles.problemTitle, styles.footerText]}>
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text style={[styles.problemText, styles.footerText]}>
                Đăng ký tại đây
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  screenContainer: {
    backgroundColor: theme.colors.page,
    flex: 1,
  },
  container: {
    marginTop: 76,
    marginHorizontal: 16,
  },
  problemTitle: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 48,
    color: theme.colors.brand.primary["600"],
  },
  problemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginBottom: 20,
  },
  problemText: {
    color: theme.colors.brand.primary["600"],
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "500",
  },
}));

export default SignIn;
