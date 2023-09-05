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

  useEffect(() => {
    dispatch(memberActions.fetchPlans(user?.memberID, t?.fields));
  }, []);

  useEffect(() => {
    if (!isMount) {
      setPlansState(
        plans.map((plan) => ({
          ...plan,
          start: new Date(plan.start),
          end: new Date(plan.end),
        }))
      );
    }
  }, [plans, isMount]);

  const handleEventPress = (event) => {
    dispatch(memberActions.fetchPlan(event.id));
    setEventModalVisible(true); // Open the modal when selecting a plan.
  };

  const handleDismiss = () => {
    dispatch(memberActions.createEmptyPlan(user));
    setEventModalVisible(false); // Close the modal.
  };

  return (
    <View>
      <CustomAppBar />
      {eventModalVisible &&
        selectedPlan && ( // Check if selectedPlan is defined
          <CustomDialog
            open={eventModalVisible}
            setOpen={setEventModalVisible}
            onDismiss={handleDismiss}
          >
            <PlanDetails setOpen={setEventModalVisible} />
          </CustomDialog>
        )}

      {loading ? (
        <Loading />
      ) : (
        <Calendar
          events={plansState}
          weekStartsOn={1}
          onPressEvent={handleEventPress}
          swipeEnabled={true}
          mode="month"
          height={600}
        />
      )}
    </View>
  );
};

export default withTranslations(Scheduler);
