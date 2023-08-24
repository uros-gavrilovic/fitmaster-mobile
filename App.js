import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import MainComponent from "./MainComponent";

export default function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
