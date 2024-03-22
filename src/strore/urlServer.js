import { defineStore } from "pinia";

export const useUrl = defineStore({
  id: "url",
  state: () => ({
    urlServer: "http://192.168.1.45/apikemenagbonebol/",
  }),
  actions: {},
  getters: {},
});