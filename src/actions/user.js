import apiService from "../utils/apiService";
import { appInfoPath, loginMemberPath } from "../constants/apiEndpoints";
import { userActions } from "../reducers/user";
import { sessionStorageConstants } from "../constants/globals";
import { handleError } from "../utils/utilFunctions";
import createNotification from "../utils/NotificationService";

export const fetchAppInfo = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(appInfoPath())
      .then((response) => {
        setAppInfo(response.data, dispatch);
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
        dispatch(userActions.login(response.data));
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
    // createNotification(
    //   notificationType.success,
    //   msg?.logoutTitle,
    //   msg?.logoutSuccessMessage
    // );
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

function setAppInfo(data, dispatch) {
  sessionStorage.setItem(sessionStorageConstants.APP_NAME, data?.appName);
  sessionStorage.setItem(sessionStorageConstants.APP_VERSION, data?.appVersion);
  sessionStorage.setItem(sessionStorageConstants.LOCALE, data?.appLocale);
}
