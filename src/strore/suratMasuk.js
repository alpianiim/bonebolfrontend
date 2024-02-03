import { defineStore } from "pinia";
export const useSuratMasuk = defineStore({
  id: "surmas",
  state: () => ({
    data: {
      nomorSurat: "",
      radioStatus: "",
      tanggalSurat: "",
      radioSifat: "",
      diterimaTanggal: "",
      lampiran: "",
      nomorAgenda: "",
      radio: "",
      dari: "",
      perihal: "",
      fileSuratMasuk: "",
    },
    tampilData: "",
  }),
  actions: {},
});
