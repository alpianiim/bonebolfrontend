import { defineStore } from "pinia";

export const useHak = defineStore({
  id: "hak",
  state: () => ({
    ptsp: false,
    kakemenag: true,
    pimpinan: false,
    petugas: false,
  }),
  actions: {},
  getters: {

  },
});
