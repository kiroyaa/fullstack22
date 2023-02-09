import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBarBackground,
    display: "flex",
    flexDirection: "row",
  },
  link: {
    color: "white",
    marginLeft: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.link}>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text style={styles.link}>Sign In</Text>
      </Link>
    </View>
  );
};

export default AppBar;
