import apiService from "../utils/apiService";
import {
  plansMemberIDPath,
  plansIDPath,
  plansCancelByIDPath,
  plansRemoveTrainerByIDPath,
  plansPath,
  plansUpdatePath,
} from "../constants/apiEndpoints";
import member, { memberActions } from "../reducers/member";
import { formatDate, handleError } from "../utils/utilFunctions";
import { planStatus } from "../constants/globals";

export const fetchPlans = (memberID, t) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .get(plansMemberIDPath(memberID))
      .then((response) => {
        const formattedData = response.data.map((plan) => ({
          id: plan.planID,
          title: plan.trainer
            ? `${plan.trainer.firstName} ${plan.trainer.lastName}`
            : t?.workout,
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
        const formattedData = {
          ...response.data,
          startsAt: formatDate(response.data.startsAt).toISOString(),
          endsAt: formatDate(response.data.endsAt).toISOString(),
        };

        dispatch(memberActions.fetchPlan(formattedData));
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};

export const addExercise = (exercise) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    dispatch(memberActions.addExercise(exercise));
  };
};

export const updatePlan = (data) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    dispatch(memberActions.updatePlan(data));
  };
};

export const removeTrainer = (planID, msg) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .post(plansRemoveTrainerByIDPath(planID))
      .then(() => {
        dispatch(memberActions.removeTrainer());
      })
      .then(() => {
        createNotification(
          notificationType.success,
          msg?.remove_trainer_success
        );
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};

export const finishWorkout = (plan, msg) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .post(plansUpdatePath(), {
        ...plan,
        status: planStatus.COMPLETED,
        completed: true,
      })
      .then(() => {
        dispatch(memberActions.updatePlan(plan));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          msg?.finish_workout_success
        );
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};

export const cancelPlan = (planID, msg) => {
  return (dispatch) => {
    dispatch(memberActions.actionStart());
    return apiService
      .post(plansCancelByIDPath(planID))
      .then(() => {
        createNotification(
          notificationType.success,
          msg?.cancel_workout_success
        );
      })
      .catch((err) => {
        handleError(err, memberActions, dispatch);
      });
  };
};
