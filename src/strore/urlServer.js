import { defineStore } from "pinia";

export const useUrl = defineStore({
  id: "url",
  state: () => ({
    urlServer: "http://192.168.8.118/apikemenagbonebol/",
  }),
  actions: {},
  getters: {},
});