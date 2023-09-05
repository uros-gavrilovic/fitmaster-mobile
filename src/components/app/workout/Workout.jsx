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

  const [planState, setPlanState] = useState(selectedPlan);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [kgInputs, setKgInputs] = useState([]);
  const [repsInputs, setRepsInputs] = useState([]);
  const [accordionOpenStates, setAccordionOpenStates] = useState([]);
  const [open, setOpen] = useState(false);
  const { selectedPlan } = useSelector((state) => state.member);
  const [finishDisabled, setFinishDisabled] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectedPlan) {
      setPlanState(selectedPlan);
    } else {
      dispatch(memberActions.createEmptyPlan(user));
      setPlanState(selectedPlan);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (planState?.activities) {
      const initialCheckboxStates = planState.activities.map((activity) => {
        return Array(activity.sets).fill(false);
      });
      setCheckboxStates(initialCheckboxStates);

      const initialKgInputs = planState.activities.map((activity) => {
        return Array(activity.sets).fill("");
      });
      setKgInputs(initialKgInputs);

      const initialRepsInputs = planState.activities.map((activity) => {
        return Array(activity.sets).fill("");
      });
      setRepsInputs(initialRepsInputs);

      // Initialize accordion open states based on planState
      setAccordionOpenStates(planState.activities.map(() => false));
    }

    if (isMount) return;
    dispatch(memberActions.updatePlan(planState));
  }, [planState]);

  useEffect(() => {
    const checkAllCheckboxes = () => {
      const allCheckboxesChecked = checkboxStates.every((activityStates) =>
        activityStates.every((state) => state)
      );
      setFinishDisabled(!allCheckboxesChecked);
    };

    if (isMount) return;

    checkAllCheckboxes();
  }, [checkboxStates]);

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

    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates.push(Array(1).fill(false));
    setCheckboxStates(updatedCheckboxStates);

    const updatedKgInputs = [...kgInputs];
    updatedKgInputs.push([""]);
    setKgInputs(updatedKgInputs);

    const updatedRepsInputs = [...repsInputs];
    updatedRepsInputs.push([""]);
    setRepsInputs(updatedRepsInputs);
  };

  const handleFinishSet = (activityIndex, setIndex) => {
    // Check if kg and reps inputs are not empty
    if (
      kgInputs[activityIndex][setIndex] !== "" &&
      repsInputs[activityIndex][setIndex] !== ""
    ) {
      const updatedStates = checkboxStates.map((activityStates, index) => {
        if (index === activityIndex) {
          return activityStates.map((state, i) =>
            i === setIndex ? !state : state
          );
        }
        return activityStates;
      });

      const repsValue = parseInt(repsInputs[activityIndex][setIndex]);

      const updatedActivities = [...planState.activities];
      updatedActivities[activityIndex] = {
        ...updatedActivities[activityIndex],
        reps: repsValue,
      };

      setPlanState({ ...planState, activities: updatedActivities });
      console.log("PlanState: ", planState);
      setCheckboxStates(updatedStates);
    }
  };

  const handleKgInputChange = (activityIndex, setIndex, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    const updatedKgInputs = [...kgInputs];
    updatedKgInputs[activityIndex] = [...kgInputs[activityIndex]];
    updatedKgInputs[activityIndex][setIndex] = numericValue;
    setKgInputs(updatedKgInputs);
  };

  const handleRepsInputChange = (activityIndex, setIndex, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    const updatedRepsInputs = [...repsInputs];
    updatedRepsInputs[activityIndex] = [...repsInputs[activityIndex]];
    updatedRepsInputs[activityIndex][setIndex] = numericValue;
    setRepsInputs(updatedRepsInputs);
  };

  const handleAddExercise = () => {
    setOpen(true);
  };

  // Function to toggle accordion open/close state
  const toggleAccordion = (activityIndex) => {
    const newOpenStates = [...accordionOpenStates];
    newOpenStates[activityIndex] = !newOpenStates[activityIndex];
    setAccordionOpenStates(newOpenStates);
  };

  return (
    <View>
      <CustomAppBar />
      <WorkoutBanner buttonDisabled={finishDisabled} />

      <ChooseExerciseModal open={open} setOpen={setOpen} />

      <ScrollView>
        <List.Section title={t?.fields?.exercises}>
          {planState?.activities?.map((activity, activityIndex) => (
            <List.Accordion
              key={Math.random()}
              title={activity.exercise.name}
              expanded={accordionOpenStates[activityIndex]} // Use the open state from the array
              onPress={() => toggleAccordion(activityIndex)} // Toggle the open state
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
                        value={kgInputs[activityIndex][setIndex]}
                        onChangeText={(text) =>
                          handleKgInputChange(activityIndex, setIndex, text)
                        }
                      />
                      <TextInput
                        label="reps"
                        mode="outlined"
                        style={{ flexGrow: 1 }}
                        editable={!checkboxStates[activityIndex][setIndex]}
                        value={repsInputs[activityIndex][setIndex]}
                        onChangeText={(text) =>
                          handleRepsInputChange(activityIndex, setIndex, text)
                        }
                      />
                      <Checkbox
                        style={{ flexGrow: 1 }}
                        status={
                          checkboxStates[activityIndex][setIndex]
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => handleFinishSet(activityIndex, setIndex)}
                        disabled={
                          kgInputs[activityIndex][setIndex] === "" ||
                          repsInputs[activityIndex][setIndex] === ""
                        }
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
