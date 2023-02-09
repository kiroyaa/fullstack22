import { Text, Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#0366d6",
    padding: 10,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry="true"
        style={styles.input}
      />
      <Pressable onPress={onSubmit}>
        <View style={styles.submitButton}>
          <Text style={{ color: "white" }}>Sign In</Text>
        </View>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
