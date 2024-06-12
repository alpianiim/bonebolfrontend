import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useOtentikasi = defineStore("otentikasi", () => {
    const otentikasi = ref();

    const getOten = () => {
        axios
            .get("otentikasi")
            .then((res) => {
                otentikasi.value = res.data.data;
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return { 
        otentikasi,
        getOten
     };
});