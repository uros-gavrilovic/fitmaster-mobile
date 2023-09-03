import apiService from "../utils/apiService";
import {
  appInfoPath,
  changeMemberPass,
  loginMemberPath,
  membersPath,
  registerMemberPath,
} from "../constants/apiEndpoints";
import { userActions } from "../reducers/user";
import { notificationType, userRole } from "../constants/globals";
import {
  convertEmptyFieldsToNull,
  createNotification,
  handleError,
} from "../utils/utilFunctions";

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
      .post(loginMemberPath(), { ...data, role: userRole.MEMBER })
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

export const register = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .post(registerMemberPath(), { ...data, role: userRole.MEMBER })
      .then((response) => {
        dispatch(userActions.login(response?.data));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          "Successfull registration"
        );
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};

export const changeMemberPassword = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .post(changeMemberPass() + `/${data.memberID}`, data)
      .then((response) => {
        dispatch(userActions.updateUser(response?.data));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          "Successfully changed password"
        );
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};

export const updateMember = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .put(
        membersPath(),
        convertEmptyFieldsToNull({ ...data, role: userRole.MEMBER })
      )
      .then((response) => {
        dispatch(userActions.updateUser(response?.data));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          "Successfully updated user"
        );
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
  };
};

export const deleteMember = (data, msg) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .delete(membersPath() + `/${data.memberID}`, {
        ...data,
        role: userRole.MEMBER,
      })
      .then((response) => {
        dispatch(userActions.logout(response?.data));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          "Successfully deleted account"
        );
      })
      .catch((err) => {
        handleError(err, userActions, dispatch);
      });
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
