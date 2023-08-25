import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import CustomNavigator from "../../reusable/menu/CustomNavigator";

// import withTranslations from "../../../utils/HighOrderComponent";

const Dashboard = (props) => {
  const { t } = props || {};

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <View style={{ flex: 1 }} />
      <CustomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

// export default withTranslations(Dashboard);
export default Dashboard;
