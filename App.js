import { StyleSheet, Text, View } from "react-native";
import { Provider as ReduxProvider } from "react-redux"; // Rename ReduxProvider
import store from "./src/reducers/store";
import MainComponent from "./MainComponent";
import { Provider as PaperProvider } from "react-native-paper"; // Rename PaperProvider

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <MainComponent />
      </PaperProvider>
    </ReduxProvider>
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
