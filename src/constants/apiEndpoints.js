// App Information
export const appInfoPath = () => `/app-info`;

// User - Member
export const loginMemberPath = () => `/login`;
export const registerMemberPath = () => `/register`;
export const logoutMemberPath = () => `/logout-member`;

// Members
const memberAPI = `/api/member`;
export const membersPath = () => memberAPI;
export const membersDTOPath = () => memberAPI + `/dto`;
export const membersIDPath = (id) => memberAPI + `/${id}`;

// Exercises
const exerciseAPI = `/api/exercise`;
export const exercisesDTOPath = () => exerciseAPI + `/dto`;
export const filtersPath = () => exerciseAPI + `/filters`;

// Plans
const planAPI = `/api/plan`;
export const plansPath = () => planAPI;
export const plansCreatedByMemberPath = () => planAPI + `/created-by-member`;
export const plansUpdatePath = () => planAPI + `/update`;
export const plansTrainerIDPath = (id) => planAPI + `/trainer/${id}`;
export const plansMemberIDPath = (id) => planAPI + `/member/${id}`;
export const plansIDPath = (id) => planAPI + `/${id}`;
export const plansRemoveTrainerByIDPath = (id) =>
  planAPI + `/remove-trainer/${id}`;
export const plansCancelByIDPath = (id) => planAPI + `/cancel/${id}`;

// Packages
const packageAPI = `/api/package`;
export const packagesPath = () => packageAPI;
export const packagesDTOPath = () => packageAPI + `/dto`;
export const packagesIDPath = (id) => packageAPI + `/${id}`;

// Trainers
const trainersAPI = `/api/trainer`;
export const trainersPath = () => trainersAPI;
export const trainersDTOPath = () => trainersAPI + `/dto`;
export const trainersIDPath = (id) => trainersAPI + `/${id}`;
export const trainersChangePasswordPath = () =>
  trainersAPI + `/change-password`;

// Statistics
const statisticsAPI = `/api/statistics`;
export const membersActivityPath = () => statisticsAPI + `/members-activity`;
