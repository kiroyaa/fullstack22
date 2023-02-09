import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBarBackground,
  },
  link: {
    color: "white",
    marginLeft: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("pressed")}>
        <Text style={styles.link}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
