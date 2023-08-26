import { StyleSheet, Text, View } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/reducers/store";
import MainComponent from "./MainComponent";
import { Provider as PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import Toast from "react-native-toast-notifications";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <ToastProvider>
          <MainComponent />
        </ToastProvider>
      </PaperProvider>
      <Toast ref={(ref) => (global["toast"] = ref)} />
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
