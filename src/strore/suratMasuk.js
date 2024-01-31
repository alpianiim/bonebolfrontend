import { defineStore } from "pinia";

export const useSuratMasuk = defineStore({
  id: "surmas",
  state: () => ({
   data : {
    nomorSurat: "",
    radioStatus: "",
    tanggalSurat: "",
    radioSifat: "",
    diterimaTanggal: "",
    nomorAgenda: "",
    radio: "",
    dari: "",
    perihal: "",
    fileSuratMasuk: "",
   }
  }),
  actions: {
    saveSurmas() {
     console.log(this.data)
    },
  },
});
