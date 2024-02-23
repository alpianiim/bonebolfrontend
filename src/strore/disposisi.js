// import axios from "axios";
import { defineStore } from "pinia";


export const useDisposisi = defineStore({
  id: "dispo",
  state: () => ({
    dataDispo: "",
    isDispo: {
      idDisposisi:"",
      disposKakan : "",
      petunjuk:"",
      catatan:""
    },
    idSurmas:"",
    fileSurmas:""
  }),
  actions: {
    clearDispo (){
      this.isDispo.idDisposisi = ""
      this.isDispo.disposKakan = ""
      this.isDispo.petunjuk = ""
      this.isDispo.catatan = ""
    }
  },
  getters: {},
});
