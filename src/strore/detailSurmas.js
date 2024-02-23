import axios from "axios"
import { defineStore } from "pinia"

export const useDetailSurmas = defineStore({
    id: "detail",
    state: () => ({
        detail: [],
        idParams: ""
    }),

    actions: {
        async getDetail(id) {
            try {
                const response = await axios.get('suratmasuk/' + id)
                this.detail = response.data.data[0]
            }
            catch (error) {
         
            }
        }
    },
    getters: {}
})