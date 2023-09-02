import apiService from "../utils/apiService";
import { exercisesDTOPath } from "../constants/apiEndpoints";
import { handleError } from "../utils/utilFunctions";
import { exercisesActions } from "../reducers/exercises";

export const fetchExercises = () => {
  return (dispatch) => {
    dispatch(exercisesActions.actionStart());
    return apiService
      .get(exercisesDTOPath())
      .then((response) => {
        dispatch(exercisesActions.fetchExercises(response.data));
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};
