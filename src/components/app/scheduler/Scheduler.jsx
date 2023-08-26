import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import { Calendar } from "react-native-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../../actions/member";

const events = [
  {
    title: "Meeting",
    start: new Date(2023, 8, 26, 10, 0),
    end: new Date(2023, 8, 26, 10, 30),
  },
  {
    title: "Coffee break",
    start: new Date(2023, 8, 26, 15, 45),
    end: new Date(2023, 8, 26, 16, 30),
  },
  {
    title: "Lunch",
    start: new Date(2023, 8, 27, 12, 0),
    end: new Date(2023, 8, 27, 13, 0),
  },
  {
    title: "Lunch",
    start: new Date(),
    end: new Date(),
  },
];

export default function Scheduler() {
  const dispatch = useDispatch();

  const [plansState, setPlansState] = useState([]);
  const { plans } = useSelector((state) => state.member);
  const { user } = useSelector((state) => state.user);

  dispatch(memberActions.fetchPlans(user?.memberID));
  useEffect(() => {
    setPlansState(plans);
    console.log(plans);
  }, [plans]);

  return (
    <View>
      <CustomAppBar />

      <Calendar
        events={events}
        weekStartsOn={0} // Sunday (0) to Saturday (6)
        weekEndsOn={6}
        locale="en"
        swipeEnabled={true}
        mode="month"
        height={600}
      />
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
