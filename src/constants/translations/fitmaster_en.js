export const translation = {
  Login: {
    title: "Login",
    fields: {
      username: "Username",
      password: "Password",
    },
    buttons: {
      login: "Sign In",
      register: "Register",
    },
    messages: {
      login_success: "You have been logged in successfully!",
    },
  },

  CustomNavigator: {
    tabs: {
      home: "Home",
      scheduler: "Scheduler",
      start_workout: "Start Workout",
      settings: "Settings",
    },
  },

  Scheduler: {
    fields: {
      workout: "Workout",
    },
  },

  PlanDetails: {
    fields: {
      time: "Time",
      exercises: "Exercises",
      unassigned_trainer: "Unassigned",
      trainer: "Trainer",
      sets: "sets",
      reps: "reps",
      instructions: "Instructions",
      yes: "Yes",
      no: "No",
      remove_trainer: "Remove Trainer",
      completed: "Completed",
      awaiting: "Awaiting",
      cancelled: "Cancelled",
      expired: "Expired",
    },
    buttons: {
      cancel_workout: "Abort",
      start_workout: "Start Workout",
    },
    messages: {
      cancel_workout_title: "Abort Workout",
      cancel_workout_message:
        "Are you sure you want to abort this workout? This action is irreversible.",
      cancel_workout_success: "Plan cancelled successfully!",
      remove_trainer_title: "Remove Trainer",
      remove_trainer_message:
        "Are you sure you want to remove this trainer? This action is irreversible.",
      remove_trainer_success: "Trainer removed successfully!",
    },
  },
};
