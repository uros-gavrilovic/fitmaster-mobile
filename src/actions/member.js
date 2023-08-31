import apiService from "../utils/apiService";
import { plansMemberIDPath, plansIDPath } from "../constants/apiEndpoints";
import { memberActions } from "../reducers/member";
import { formatDate, handleError } from "../utils/utilFunctions";

export const fetchPlans = (memberID) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .get(plansMemberIDPath(memberID))
      .then((response) => {
        const formattedData = response.data.map((plan) => ({
          id: plan.planID,
          title: plan.trainer
            ? `${plan.trainer.firstName} ${plan.trainer.lastName}`
            : "Workout",
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

export const fetchPlan = (planID) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .get(plansIDPath(planID))
      .then((response) => {
        dispatch(memberActions.fetchPlan(response.data));
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};
