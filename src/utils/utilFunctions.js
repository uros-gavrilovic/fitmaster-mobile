import { useSelector } from "react-redux";
import { notificationType } from "../constants/globals";

export function handleError(error, actions, dispatch) {
  // Creates notification and dispatches error action.
  console.log(error);

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

export function formatDate(backEndDate) {
  // Formats date received from back-end from format [YYYY, MM, DD, HH, MM] to the one applicable for Date JS class.

  return new Date(
    Date.UTC(
      backEndDate[0], // Year
      backEndDate[1] - 1, // Month (0-based)
      backEndDate[2], // Day
      backEndDate[3], // Hour
      backEndDate[4] // Minute
    )
  );
}

export function capitalizeFirstLetter(str, capitalizeEachWord = false) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  if (capitalizeEachWord) {
    return str
      .split(" ")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}

export function removeUnderscores(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str.split("_").join(" ");
}

export function formatISOStringDate(date) {
  // Formats date received from back-end from format [YYYY, MM, DD, HH, MM] to the one applicable for Date JS class.

  return new Date(date).toISOString();
}
