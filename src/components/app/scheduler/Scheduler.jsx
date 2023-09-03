import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import { Calendar } from "react-native-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../../actions/member";
import { useIsMount } from "../../../utils/customHooks/useIsMount";
import Loading from "../../reusable/other/Loading";
import CustomDialog from "../../reusable/modals/CustomDialog";
import PlanDetails from "./PlanDetails";
import withTranslations from "../../../utils/HighOrderComponent";

export const Scheduler = (props) => {
  const { t } = props || {};

  const isMount = useIsMount();
  const dispatch = useDispatch();

  const [plansState, setPlansState] = useState([]);
  const { plans, selectedPlan } = useSelector((state) => state.member);
  const { user, loading } = useSelector((state) => state.user);
  const [eventModalVisible, setEventModalVisible] = useState(false);

  const handleEventPress = (event) => {
    dispatch(memberActions.fetchPlan(event.id));
  };
  useEffect(() => {
    if (selectedPlan) {
      setEventModalVisible(true);
    }
  }, [selectedPlan]);

  if (isMount) dispatch(memberActions.fetchPlans(user?.memberID, t?.fields));
  useEffect(() => {
    if (isMount) return;

    setPlansState(
      plans.map((plan) => ({
        ...plan,
        start: new Date(plan.start), // Convert from ISO string to Date object
        end: new Date(plan.end), // Redux doesn't support Date objects
      }))
    );
  }, [plans]);

  return (
    <View>
      <CustomAppBar />
      <CustomDialog open={eventModalVisible} setOpen={setEventModalVisible}>
        <PlanDetails plan={selectedPlan} />
      </CustomDialog>

      {loading ? (
        <Loading />
      ) : (
        <Calendar
          events={plansState}
          weekStartsOn={1}
          onPressEvent={handleEventPress}
          // locale="X" // Requires import 'dayjs/locale/X'
          swipeEnabled={true}
          mode="month"
          height={600}
        />
      )}
    </View>
  );
};

export default withTranslations(Scheduler);
