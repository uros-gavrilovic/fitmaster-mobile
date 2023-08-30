import apiService from "../utils/apiService";
import { plansMemberIDPath } from "../constants/apiEndpoints";
import { memberActions } from "../reducers/member";
import { formatDate, handleError } from "../utils/utilFunctions";

export const fetchPlans = (id) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .get(plansMemberIDPath(id))
      .then((response) => {
        const formattedData = response?.data.map((plan) => ({
          title: `${plan.trainer.firstName} ${plan.trainer.lastName}`,
          start: formatDate(plan.startsAt).toISOString(),
          end: formatDate(plan.endsAt).toISOString(),
        }));
        dispatch(memberActions.fetchPlans(formattedData));
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};
