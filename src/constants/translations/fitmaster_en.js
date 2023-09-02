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
      cancel_workout: "Cancel",
      start_workout: "Start Workout",
    },
    messages: {
      cancel_workout_title: "Cancel Workout",
      cancel_workout_message:
        "Are you sure you want to cancel this workout? This action is irreversible.",
      cancel_workout_success: "Plan cancelled successfully!",
      remove_trainer_title: "Remove Trainer",
      remove_trainer_message:
        "Are you sure you want to remove this trainer? This action is irreversible.",
      remove_trainer_success: "Trainer removed successfully!",
    },
  },

  Workout: {
    fields: {
      exercises: "Exercises",
    },
    buttons: {
      add_exercise: "Add Exercise",
    },
  },

  WorkoutBanner: {
    fields: {
      workout_in_progress: "Workout in progress",
    },
    buttons: {
      finish_workout: "Finish Workout",
      cancel_workout: "Cancel Workout",
    },
    messages: {
      cancel_workout_title: "Cancel Workout",
      cancel_workout_message:
        "Are you sure you want to cancel this workout? This action is irreversible.",
      cancel_workout_success: "Workout cancelled successfully!",
      finish_workout_title: "Finish Workout",
      finish_workout_message:
        "Are you sure you want to finish this workout? This action is irreversible.",
      finish_workout_success: "Workout finished successfully!",
    },
  },

  ExerciseTable: {
    table: {
      name: "Name",
      category: "Category",
      body_part: "Body Part",
      select: "Select",
    },
    fields: {
      of: "of",
      rows_per_page: "Rows per page",
    },
  },
};
