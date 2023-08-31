import withTranslations from "../../../utils/HighOrderComponent";
import { ScrollView, Text, View } from "react-native";
import { Avatar, Card, IconButton, List, Button } from "react-native-paper";
import {
  capitalizeFirstLetter,
  removeUnderscores,
} from "../../../utils/utilFunctions";
import CustomCongirmDialog from "../../reusable/modals/CustomConfirmDialog";
import { useState } from "react";

const PlanDetails = (props) => {
  const { plan, t } = props;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const planStartDate = new Date(plan.startsAt);
  planStartDate.setHours(0, 0, 0, 0);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleCancel = () => {};
  const handleStart = () => {};

  return (
    <View>
      <CustomCongirmDialog
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        title={t?.messages?.cancel_workout_title}
        message={t?.messages?.cancel_workout_message}
        yesAction={handleCancel}
      />
      <Card>
        <ScrollView>
          <Card.Title
            title={t?.fields?.trainer}
            subtitle={
              plan.trainer
                ? `${plan.trainer.firstName} ${plan.trainer.lastName}`
                : t?.fields?.unassigned_trainer
            }
            left={(props) =>
              plan.trainer ? (
                <Avatar.Text
                  {...props}
                  label={plan.trainer.firstName[0] + plan.trainer.lastName[0]}
                />
              ) : (
                <Avatar.Icon {...props} icon="account-circle" />
              )
            }
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
          <Card.Title
            title={t?.fields?.time}
            subtitle={`${getTime(plan.startsAt)} - ${getTime(plan.endsAt)}`}
            left={(props) => <Avatar.Icon {...props} icon="clock-time-four" />}
          ></Card.Title>
          <List.Section>
            <List.Subheader>{`${t?.fields?.exercises}:`}</List.Subheader>
            {plan.activities.map((activity) => {
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
        <Card.Actions>
          <Button icon="cancel" onPress={() => setConfirmModalOpen(true)}>
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
      </Card>
    </View>
  );
};

export default withTranslations(PlanDetails);

const getTime = (date) => {
  date = new Date(date);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
