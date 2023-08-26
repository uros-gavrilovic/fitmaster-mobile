import { notificationType } from "../constants/globals";

export function handleError(error, actions, dispatch) {
  // Creates notification and dispatches error action.

  console.log(JSON.stringify(error));
  createNotification(notificationType.error, "Error has occured!");
}

export function createNotification(type, message, duration = 3000) {
  // Creates notification.

  toast.show(message, {
    type: type,
    placement: "top",
    duration: duration,
    offset: 3000,
    animationType: "slide-in",
  });
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
