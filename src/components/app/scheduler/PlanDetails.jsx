import withTranslations from "../../../utils/HighOrderComponent";
import { ScrollView, Text } from "react-native";
import { List } from "react-native-paper";

const PlanDetails = (props) => {
  const { plan, t } = props;

  console.log("PlanDetails", plan);
  return (
    <ScrollView>
      {plan &&
        plan.activities.map((activity, index) => {
          let exercise = activity.exercise;
          return (
            <List.Accordion
              // expanded={true}
              key={exercise.exerciseID}
              title={exercise.name}
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item
                title="Description"
                description={
                  "Description of the exercise " + exercise.description
                }
              />
            </List.Accordion>
          );
        })}
    </ScrollView>
  );
};

export default withTranslations(PlanDetails);
