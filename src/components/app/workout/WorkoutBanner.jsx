import { useState } from "react";
import { Image, View } from "react-native";
import { Banner } from "react-native-paper";
import withTranslations from "../../../utils/HighOrderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";
import CustomConfirmDialog from "../../reusable/modals/CustomConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../../actions/member";

const WorkoutBanner = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState({
    title: "",
    message: "",
    yesAction: () => {},
  });

  const { selectedPlan } = useSelector((state) => state.member);

  const handleCancelWorkout = () => {
    console.log(selectedPlan);
  };
  const handleFinishWorkout = () => {
    dispatch(memberActions.finishWorkout(selectedPlan));
  };

  return (
    <View>
      <CustomConfirmDialog
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        yesAction={confirmModalState.yesAction}
      />
      <Banner
        visible={true}
        actions={[
          {
            label: t?.buttons?.cancel_workout,
            onPress: () => {
              setConfirmModalState({
                title: t?.messages?.cancel_workout_title,
                message: t?.messages?.cancel_workout_message,
                yesAction: handleCancelWorkout,
              });
              setConfirmModalOpen(true);
            },
          },
          {
            label: t?.buttons?.finish_workout,
            onPress: () => {
              setConfirmModalState({
                title: t?.messages?.finish_workout_title,
                message: t?.messages?.finish_workout_message,
                yesAction: handleFinishWorkout,
              });
              setConfirmModalOpen(true);
            },
          },
        ]}
        icon={({ size }) => (
          <Animatable.View animation="pulse" iterationCount="infinite">
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                width: size,
                height: size,
              }}
            />
          </Animatable.View>
        )}
      >
        {t?.fields?.workout_in_progress}
      </Banner>
    </View>
  );
};

export default withTranslations(WorkoutBanner);
