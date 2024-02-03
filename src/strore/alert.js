import { defineStore } from "pinia";
export const useAlert = defineStore({
  id: "alert",
  state: () => ({
    errorAlert: {
      statusAlert: false,
      statusText: "",
      message: "",
    },

    succesAlert: {
      statusAlert: false,
      message: "",
    },
  }),
  actions: {},
  getters: {},
});
