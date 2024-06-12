import { defineStore } from "pinia";

export const useUrl = defineStore({
  id: "url",
  state: () => ({
    urlServer: "http://192.168.1.10/apikemenagbonebol/",
  }),
  actions: {},
  getters: {},
});
