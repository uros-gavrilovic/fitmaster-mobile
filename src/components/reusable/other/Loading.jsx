import { ActivityIndicator, DefaultTheme, MD2Colors } from "react-native-paper";
import { View } from "react-native";

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={DefaultTheme.colors.accent}
      />
    </View>
  );
}
