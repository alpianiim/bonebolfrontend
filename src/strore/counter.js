import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    count: 0,
  }),
  actions : {
   tambahCount(){
    this.count++
   },
   kurangCount(){
    this.count--
   }
  },
  getters : {
   ganjilGenap: (state) =>{
    if(state.count % 2 === 0) return 'Genap'
    return 'Ganjil'
   }
  }
});
