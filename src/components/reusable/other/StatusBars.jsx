import React from "react";
import { Text, View } from "react-native";

const StatusBox = ({ color, backgroundColor, ...props }) => {
  const boxStyles = {
    height: "auto",
    width: "auto",
    color,
    backgroundColor,
    borderRadius: 5,
    padding: 5,
  };

  return <View style={boxStyles} {...props}></View>;
};

export const GoodStatus = (props) => (
  <StatusBox backgroundColor="rgb(219, 246, 229)" {...props}>
    <Text style={{ color: "rgb(17, 141, 87)", fontWeight: "bold" }}>
      {props.children}
    </Text>
  </StatusBox>
);

export const OkayStatus = (props) => (
  <StatusBox backgroundColor="rgb(255, 241, 214)" {...props}>
    <Text style={{ color: "rgb(183, 110, 0)", fontWeight: "bold" }}>
      {props.children}
    </Text>
  </StatusBox>
);

export const NeutralStatus = (props) => (
  <StatusBox backgroundColor="rgb(211, 211, 211)" {...props}>
    <Text style={{ color: "rgb(85, 85, 85)", fontWeight: "bold" }}>
      {props.children}
    </Text>
  </StatusBox>
);

export const BadStatus = (props) => (
  <StatusBox backgroundColor="rgb(255, 228, 222)" {...props}>
    <Text style={{ color: "rgb(183, 29, 24)", fontWeight: "bold" }}>
      {props.children}
    </Text>
  </StatusBox>
);
