import { useSelector } from "react-redux";
import { notificationType } from "../constants/globals";

export function handleError(error, actions, dispatch) {
  // Creates notification and dispatches error action.

  const messages = error.response.data;
  createNotification(notificationType.error, messages?.message);
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

export function validateField(field, fieldName, setErrorState) {
  // Validates whetever field is empty or not.

  const error = !field;
  setErrorState((prevState) => ({ ...prevState, [fieldName]: error }));
  return error;
}
