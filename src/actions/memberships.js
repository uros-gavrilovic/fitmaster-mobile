import apiService from "../utils/apiService";
import { membershipsIDPath } from "../constants/apiEndpoints";
import { handleError } from "../utils/utilFunctions";
import { membershipsActions } from "../reducers/memberships";

export const fetchMemberships = (memberID) => {
  return (dispatch) => {
    dispatch(membershipsActions.actionStart());
    return apiService
      .get(membershipsIDPath(memberID))
      .then((response) => {
        dispatch(membershipsActions.fetchMemberships(response.data));
      })
      .catch((err) => {
        handleError(err, membershipsActions, dispatch);
      });
  };
};
