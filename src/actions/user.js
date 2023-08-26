import apiService from "../utils/apiService";
import { appInfoPath, loginMemberPath } from "../constants/apiEndpoints";
import { userActions } from "../reducers/user";
import { notificationType } from "../constants/globals";
import { createNotification, handleError } from "../utils/utilFunctions";

export const fetchAppInfo = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(appInfoPath())
      .then((response) => {
        dispatch(userActions.setAppInfo(response.data));
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};

export const login = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .post(loginMemberPath(), data)
      .then((response) => {
        dispatch(userActions.login(response?.data));
      })
      .then(() => {
        createNotification(notificationType.success, msg?.login_success);
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};

export const logout = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    // return apiService
    //   .post(logoutTrainerPath(), data) // TODO: Implement log-out method on back-end.
    //   .then(() => {
    dispatch(userActions.logout());
    // })
    // .then(() => {
    createNotification(
      notificationType.success,
      "You have been logged out successfully!"
    );
    // })
    // .catch((err) => {
    //   handleError(err, userActions, dispatch, undefined);
    // });
  };
};

// export const changePassword = (data, messages) => {
//   return (dispatch) => {
//     dispatch(userActions.actionStart());
//     return apiService
//       .post(trainersChangePasswordPath(), data)
//       .then((response) => {
//         dispatch(userActions.updateUser(response.data));
//       })
//       .then(() => {
//         createNotification(
//           notificationType.success,
//           messages?.titleChangePassword,
//           messages?.textPasswordChanged
//         );
//       })
//       .catch((err) => {
//         handleError(err, userActions, dispatch);
//       });
//   };
// };
