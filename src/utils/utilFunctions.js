export function handleError(error, actions, dispatch) {
  // Creates notification and dispatches error action.

  console.log(error);

  //   const messages = error.response.data;
  //   dispatch(actions.actionError(error?.response?.data));
  //   createNotification(
  //     notificationType.error,
  //     messages?.title,
  //     messages?.message
  //   );
}
export function getTranslationFile() {
  // Returns translation file name

  const appName = sessionStorage.getItem("appName") || appInfo.name;
  const language =
    sessionStorage.getItem("appLocale") || appInfo.default_locale;
  return `${appName}_${language}`;
}

export function validateField(field, fieldName, setErrorState) {
  // Validates whetever field is empty or not.

  const error = !field;
  setErrorState((prevState) => ({ ...prevState, [fieldName]: error }));
  return error;
}
