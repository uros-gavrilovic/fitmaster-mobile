export const translation = {
  Login: {
    title: "Prijava",
    fields: {
      username: "Korisničko ime",
      password: "Šifra",
    },
    buttons: {
      login: "Prijavi se",
      register: "Registracija",
    },
    messages: {
      login_success: "Uspešno ste se prijavili!",
    },
  },

  CustomNavigator: {
    tabs: {
      home: "Početna",
      scheduler: "Raspored",
      start_workout: "Započni Trening",
      settings: "Podešavanja",
    },
  },

  Scheduler: {
    fields: {
      workout: "Trening",
    },
  },

  PlanDetails: {
    fields: {
      time: "Vreme",
      exercises: "Vežbe",
      unassigned_trainer: "Nenaznačen",
      trainer: "Trener",
      sets: "serija",
      reps: "ponavljanja",
      instructions: "Uputstva",
      yes: "Da",
      no: "Ne",
      remove_trainer: "Ukloni Trenera",
      completed: "Završen",
      awaiting: "Čeka",
      cancelled: "Otkazan",
      expired: "Istekao",
    },
    buttons: {
      cancel_workout: "Otkaži",
      start_workout: "Započni Trening",
    },
    messages: {
      cancel_workout_title: "Otkaži Trening",
      cancel_workout_message:
        "Da li ste sigurni da želite da otkažete ovaj trening? Ova akcija je nepovratna.",
      cancel_workout_success: "Trening je uspešno otkazan!",
      remove_trainer_title: "Ukloni Trenera",
      remove_trainer_message:
        "Da li ste sigurni da želite da uklonite ovog trenera? Ova akcija je nepovratna.",
      remove_trainer_success: "Trener je uspešno uklonjen!",
    },
  },

  Workout: {
    fields: {
      exercises: "Vežbe",
    },
    buttons: {
      add_exercise: "Dodaj Vežbu",
    },
  },

  WorkoutBanner: {
    fields: {
      workout_in_progress: "Trening u toku",
    },
    buttons: {
      finish_workout: "Završi Trening",
      cancel_workout: "Otkaži Trening",
    },
    messages: {
      cancel_workout_title: "Otkaži Trening",
      cancel_workout_message:
        "Da li ste sigurni da želite da otkažete ovaj trening?",
      cancel_workout_success: "Trening je uspešno otkazan!",
      finish_workout_title: "Završi Trening",
      finish_workout_message:
        "Da li ste sigurni da želite da završite ovaj trening?",
      finish_workout_success: "Trening je uspešno završen!",
    },
  },

  ExerciseTable: {
    table: {
      name: "Naziv",
      category: "Kategorija",
      body_part: "Deo tela",
      select: "Izaberi",
    },
    fields: {
      of: "od",
      rows_per_page: "Redova po stranici",
    },
  },
};
