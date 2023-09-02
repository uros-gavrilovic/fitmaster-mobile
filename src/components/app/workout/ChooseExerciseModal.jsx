import withTranslations from "../../../utils/HighOrderComponent";
import CustomDialog from "../../reusable/modals/CustomDialog";
import ExerciseTable from "./ExerciseTable";

export const ChooseExerciseModal = (props) => {
  const { t, open, setOpen } = props || {};

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <ExerciseTable />
    </CustomDialog>
  );
};

export default withTranslations(ChooseExerciseModal);
