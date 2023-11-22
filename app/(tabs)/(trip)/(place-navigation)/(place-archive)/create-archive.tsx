import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Success, TextInput } from "../../../../../components";
import { createArchive, useAllArchive } from "../../../../../api";
import { useAuth } from "../../../../../context/auth";

const CreateArchive = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const { userAuth } = useAuth();
  const { refetch } = useAllArchive(userAuth?.accessToken!);

  return (
    <>
      {isSuccess && (
        <Success
          isSuccess
          onPress={() => {
            router.back();
            refetch();
          }}
          content="Tạo thành công"
        />
      )}
      {isFail && (
        <Success
          isSuccess={!isFail}
          onPress={() => {
            router.back();
            refetch();
          }}
          content="Tạo thất bại"
        />
      )}
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            Tạo mục lưu trữ mới
          </Text>
        </View>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values) => {
            // setLoading(true);
            const res = await createArchive(
              userAuth?.accessToken!,
              values.title
            );
            if (res) setIsSuccess(true);
            else setIsFail(true);
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("*Bắt buộc"),
          })}
        >
          {({ handleChange, handleBlur, handleSubmit, errors }) => (
            <View>
              <View>
                <TextInput
                  placeholder="Tiêu đề..."
                  label="Tên thư mục"
                  onChangeText={handleChange("title")}
                  errorMessage={errors.title}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  paddingBottom: 20,
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Ảnh đại diện
                </Text>
                <TouchableOpacity style={styles.imgUpload}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: theme.colors.brand.primary[600],
                    }}
                  >
                    Comming soon!
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <Button
                  onPress={() => handleSubmit()}
                  title="Tạo"
                  radius={999}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default CreateArchive;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 10,
  },
  titleWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  imgUpload: {
    width: "100%",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: theme.colors.brand.primary[500],
  },
}));
