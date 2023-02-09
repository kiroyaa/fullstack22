import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  flexItem: {
    marginLeft: 15,
  },
  section: {
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20,
  },
  language: {
    alignSelf: "flex-start",
    color: "white",
    backgroundColor: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    padding: 6,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

// @source   https://www.html-code-generator.com/javascript/shorten-long-numbers
const intToString = (num) => {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};

const StatItem = ({ label, value }) => {
  const newValue = intToString(value);
  return (
    <View style={styles.statItem}>
      <Text style={{ fontWeight: theme.fontWeights.bold }}>{newValue}</Text>
      <Text style={{ color: theme.colors.textSecondary }}>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.section}>
      <View style={styles.userInfo}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexItem}>
          <Text style={styles.username}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.language}>
            <Text
              style={{ color: "white", fontWeight: theme.fontWeights.bold }}
            >
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem label="Stars" value={item.stargazersCount} />
        <StatItem label="Forks" value={item.forksCount} />
        <StatItem label="Reviews" value={item.reviewCount} />
        <StatItem label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
