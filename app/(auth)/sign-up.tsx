import React from "react";
import { Text, makeStyles } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "../../components";
import { UserRegisterRequest, register } from "../../api/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../utils/regex";
import { useAuth } from "../../context/auth";
import { router } from "expo-router";

const SignUp = () => {
  const styles = useStyles();
  const { setUserAuth } = useAuth();
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <Formik<UserRegisterRequest>
          initialValues={{ phone: "", password: "", repeatPassword: "" }}
          onSubmit={async (values) => {
            const user = await register(values);
            if (!user) return;
            setUserAuth(user);
          }}
          validationSchema={Yup.object().shape({
            phone: Yup.string()
              .length(10)
              .matches(phoneRegExp, "Số điện thoại không hợp lệ")
              .required("*Bắt buộc "),
            password: Yup.string()
              .min(6, "Độ dài tối thiểu là 6 kí tự")
              .max(20, "Độ dài tối đa là 20 kí tự")
              .required("*Bắt buộc"),
            repeatPassword: Yup.string()
              .min(6, "Độ dài tối thiểu là 6 kí tự")
              .max(20, "Độ dài tối đa là 20 kí tự")
              .required("*Bắt buộc")
              .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp"),
          })}
        >
          {({ handleChange, handleBlur, handleSubmit, errors }) => (
            <View>
              <Text headingM style={styles.title}>
                Đăng ký tài khoản
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
              <TextInput
                label="Nhập lại mật khẩu"
                placeholder="*********"
                secureTextEntry
                onChangeText={handleChange("repeatPassword")}
                onBlur={handleBlur("repeatPassword")}
                errorMessage={errors.repeatPassword}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Đăng ký"
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
          Bạn đã có tài khoản?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={[styles.problemText, styles.footerText]}>
            Đăng nhập tại đây
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom: 32,
  },
  problemText: {
    color: theme.colors.brand.primary["600"],
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "500",
  },
}));

export default SignUp;
