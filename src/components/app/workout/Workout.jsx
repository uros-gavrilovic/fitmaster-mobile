import { StyleSheet, Text, View } from "react-native";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import CustomListAccordion from "../../reusable/other/CustomListAccordion";

export default function Workout() {
  return (
    <View>
      <CustomAppBar />
      <CustomListAccordion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
