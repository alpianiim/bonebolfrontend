import { defineStore } from "pinia";
import axios from "axios";

export const useSuratMasuk = defineStore({
  id: "surmas",
  state: () => ({
    data: {
      nomorSurat: "",
      radioStatus: "",
      tanggalSurat: "",
      radioSifat: "",
      diterimaTanggal: "",
      lampiran:"",
      nomorAgenda: "",
      radio: "",
      dari: "",
      perihal: "",
      fileSuratMasuk:"",
    },
  }),
  actions: {
    saveSurmas() {
      //
    },
  },
});
