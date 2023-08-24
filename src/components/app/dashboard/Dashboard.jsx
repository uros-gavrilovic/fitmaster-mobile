import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import CustomBottomNavigator from "../../reusable/menu/CustomBottomNavigator";

// import withTranslations from "../../../utils/HighOrderComponent";

const Dashboard = (props) => {
  const { t } = props || {};

  console.log("OVDE");

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <View style={{ flex: 1 }} />
      <CustomBottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Pushes CustomBottomNavigator to the bottom
    padding: 16, // Add padding or adjust it as needed
  },
});

// export default withTranslations(Dashboard);
export default Dashboard;
