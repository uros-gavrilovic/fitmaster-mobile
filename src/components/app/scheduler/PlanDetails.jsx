import withTranslations from "../../../utils/HighOrderComponent";
import { ScrollView, Text, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  List,
  Button,
  Menu,
  Divider,
} from "react-native-paper";
import {
  capitalizeFirstLetter,
  removeUnderscores,
} from "../../../utils/utilFunctions";
import CustomCongirmDialog from "../../reusable/modals/CustomConfirmDialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../../actions/member";
import { planStatus } from "../../../constants/globals";
import {
  BadStatus,
  GoodStatus,
  NeutralStatus,
  OkayStatus,
} from "../../reusable/other/StatusBars";

const PlanDetails = (props) => {
  const { t } = props;

  const { selectedPlan } = useSelector((state) => state.member);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const planStartDate = new Date(selectedPlan.startsAt);
  planStartDate.setHours(0, 0, 0, 0);

  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState({
    title: "",
    message: "",
    yesAction: () => {},
  });
  const [statusState, setStatusState] = useState(selectedPlan.status);

  const handleCancel = () => {
    dispatch(memberActions.cancelPlan(selectedPlan.planID), t?.messages);
    setStatusState(planStatus.CANCELLED);
    setMenuOpen(false);
  };
  const handleStart = () => {};
  const handleRemoveTrainer = () => {
    dispatch(memberActions.removeTrainer(selectedPlan.planID), t?.messages);
  };

  return (
    <View>
      <CustomCongirmDialog
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        yesAction={confirmModalState.yesAction}
      />
      <Card>
        <ScrollView>
          <Card.Title
            title={t?.fields?.trainer}
            subtitle={
              selectedPlan.trainer
                ? `${selectedPlan.trainer.firstName} ${selectedPlan.trainer.lastName}`
                : t?.fields?.unassigned_trainer
            }
            left={(props) =>
              selectedPlan.trainer ? (
                <Avatar.Text
                  {...props}
                  label={
                    selectedPlan.trainer.firstName[0] +
                    selectedPlan.trainer.lastName[0]
                  }
                />
              ) : (
                <Avatar.Icon {...props} icon="account-circle" />
              )
            }
            right={(props) => {
              return (
                selectedPlan.trainer &&
                statusState === planStatus.AWAITING && (
                  <Menu
                    visible={menuOpen}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        onPress={() => setMenuOpen(true)}
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        setConfirmModalState({
                          title: t?.messages?.remove_trainer_title,
                          message: t?.messages?.remove_trainer_message,
                          yesAction: handleRemoveTrainer,
                        });
                        setMenuOpen(false);
                        setConfirmModalOpen(true);
                      }}
                      leadingIcon="account-remove"
                      title={t?.fields?.remove_trainer}
                    />
                  </Menu>
                )
              );
            }}
          />
          <Card.Title
            title={t?.fields?.time}
            subtitle={`${getTime(selectedPlan.startsAt)} - ${getTime(
              selectedPlan.endsAt
            )}`}
            left={(props) => <Avatar.Icon {...props} icon="clock-time-four" />}
            right={() => {
              const statuses = statusComponentMap(t?.fields);
              return (
                <View style={{ marginRight: 10 }}>{statuses[statusState]}</View>
              );
            }}
          />
          <List.Section>
            <List.Subheader>{`${t?.fields?.exercises}:`}</List.Subheader>
            {selectedPlan.activities.map((activity) => {
              let exercise = activity.exercise;
              return (
                <View key={exercise.exerciseID}>
                  <List.Accordion
                    title={
                      <View>
                        <Text style={{ fontWeight: "bold" }}>
                          {exercise.name}
                        </Text>
                        <Text>{`(${capitalizeFirstLetter(
                          removeUnderscores(exercise.category),
                          true
                        )})`}</Text>
                      </View>
                    }
                    description={`${activity.sets} ${t?.fields?.sets} x ${activity.reps} ${t?.fields?.reps}`}
                    left={(props) => (
                      <List.Icon {...props} icon="circle-medium" />
                    )}
                  >
                    <List.Item
                      title={t?.fields?.instructions}
                      description={exercise.instructions}
                    />
                  </List.Accordion>
                </View>
              );
            })}
          </List.Section>
        </ScrollView>
        {statusState === planStatus.AWAITING && (
          <Card.Actions>
            <Button
              icon="cancel"
              onPress={() => {
                setConfirmModalState({
                  title: t?.messages?.cancel_workout_title,
                  message: t?.messages?.cancel_workout_message,
                  yesAction: handleCancel,
                });
                setConfirmModalOpen(true);
              }}
            >
              {t?.buttons?.cancel_workout}
            </Button>
            <Button
              icon="plus-circle"
              disabled={currentDate === planStartDate}
              onPress={handleStart}
            >
              {t?.buttons?.start_workout}
            </Button>
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};

export default withTranslations(PlanDetails);

const getTime = (date) => {
  date = new Date(date);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

const statusComponentMap = (t) => ({
  [planStatus.COMPLETED]: (
    <GoodStatus>{t?.completed?.toUpperCase()}</GoodStatus>
  ),
  [planStatus.CANCELLED]: <BadStatus>{t?.cancelled?.toUpperCase()}</BadStatus>,
  [planStatus.AWAITING]: (
    <NeutralStatus>{t?.awaiting?.toUpperCase()}</NeutralStatus>
  ),
  [planStatus.EXPIRED]: <OkayStatus>{t?.expired?.toUpperCase()}</OkayStatus>,
});
