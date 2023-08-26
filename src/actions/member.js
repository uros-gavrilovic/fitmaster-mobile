import apiService from "../utils/apiService";
import { plansMemberIDPath } from "../constants/apiEndpoints";
import { memberActions } from "../reducers/member";
import { handleError } from "../utils/utilFunctions";
import { userActions } from "../reducers/user";

export const fetchPlans = (id) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(plansMemberIDPath(id))
      .then((response) => {
        dispatch(memberActions.fetchPlans(response?.data));
      })
      .catch((err) => {
        console.log(err);
        handleError(err, memberActions, dispatch);
      });
  };
};
