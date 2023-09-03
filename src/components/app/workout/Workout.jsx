import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { List, TextInput, Button, Checkbox } from "react-native-paper";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import WorkoutBanner from "./WorkoutBanner";
import withTranslations from "../../../utils/HighOrderComponent";
import * as memberActions from "../../../actions/member";
import { useIsMount } from "../../../utils/customHooks/useIsMount";
import ChooseExerciseModal from "./ChooseExerciseModal";

const Workout = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();
  const isMount = useIsMount();

  const [open, setOpen] = useState(false);
  const { selectedPlan } = useSelector((state) => state.member);
  const { user } = useSelector((state) => state.user);
  const [planState, setPlanState] = useState(selectedPlan);
  const [checkboxStates, setCheckboxStates] = useState([]);

  useEffect(() => {
    if (selectedPlan) {
      console.log("imam");
      setPlanState(selectedPlan);
    } else {
      console.log("nemam");
      dispatch(memberActions.createEmptyPlan(user));
      setPlanState(selectedPlan);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (planState?.activities) {
      const initialStates = planState.activities.map((activity) =>
        Array(activity.sets).fill(false)
      );
      setCheckboxStates(initialStates);
    }

    if (isMount) return;
    dispatch(memberActions.updatePlan(planState));
  }, [planState]);

  const handleAddSet = (activityID) => {
    const updatedActivities = planState.activities.map((activity) => {
      if (activity.activityID === activityID) {
        return {
          ...activity,
          sets: activity.sets + 1,
        };
      }
      return activity;
    });

    setPlanState({ ...planState, activities: updatedActivities });
    setCheckboxStates([...checkboxStates, false]);
  };
  const handleFinishSet = (activityIndex, setIndex) => {
    const updatedStates = checkboxStates.map((activityStates, index) => {
      if (index === activityIndex) {
        return activityStates.map((state, i) =>
          i === setIndex ? !state : state
        );
      }
      return activityStates;
    });

    setCheckboxStates(updatedStates);
  };
  const handleAddExercise = () => {
    setOpen(true);
  };

  return (
    <View>
      <CustomAppBar />
      <WorkoutBanner />

      <ChooseExerciseModal open={open} setOpen={setOpen} />

      <ScrollView>
        <List.Section title={t?.fields?.exercises}>
          {planState?.activities?.map((activity, activityIndex) => (
            <List.Accordion
              key={activity.activityID}
              title={activity.exercise.name}
              left={(props) => (
                <List.Icon {...props} icon={`numeric-${activityIndex + 1}`} />
              )}
            >
              {[...Array(activity.sets)].map((_, setIndex) => (
                <List.Item
                  key={setIndex}
                  left={(props) => (
                    <List.Icon {...props} icon="circle-medium" />
                  )}
                  right={() => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "80%",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextInput
                        label="kg"
                        mode="outlined"
                        style={{ flexGrow: 1 }}
                        editable={!checkboxStates[activityIndex][setIndex]}
                      />
                      <TextInput
                        label="reps"
                        mode="outlined"
                        style={{ flexGrow: 1 }}
                        editable={!checkboxStates[activityIndex][setIndex]}
                      />
                      <Checkbox
                        style={{ flexGrow: 1 }}
                        status={
                          checkboxStates[activityIndex][setIndex]
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => handleFinishSet(activityIndex, setIndex)}
                      />
                    </View>
                  )}
                />
              ))}
              <List.Item
                right={() => (
                  <Button onPress={() => handleAddSet(activity.activityID)}>
                    Add set
                  </Button>
                )}
              />
            </List.Accordion>
          ))}
        </List.Section>
        <Button icon="plus" mode="contained" onPress={handleAddExercise}>
          {t?.buttons?.add_exercise}
        </Button>
      </ScrollView>
    </View>
  );
};

export default withTranslations(Workout);
