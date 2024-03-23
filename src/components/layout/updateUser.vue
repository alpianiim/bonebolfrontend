<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useAlert } from '@/strore/alert'
import { onBeforeRouteLeave } from 'vue-router'
import divAlert from '@/components/Alert.vue'
import { useAuth } from '@/strore/auth';
import { useRouter } from 'vue-router'


const submitErrorWa = ref(false)
const submitErrorTe = ref(false)
const router = useRouter()
const storeAlert = useAlert()
const auth = useAuth();
const userData = reactive({
    id: "",
    namaLengkap: "",
    jenisKelamin: "",
    nomorHp: "",
})

// auth.getUser()

const cekUser = () => {
    if (auth.user.nomor_hp === "") {
        router.push('update-user')
    } else {
        router.push('dashboard')
    }
}

cekUser()

const submitForm = async () => {
    storeAlert.$reset()
    userData.id = auth.user.id

    const formData = new FormData()
    Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key])
    })
    try {
        const response = await axios.put('user/' + userData.id, userData)
        router.push('dashboard')
    } catch (error) {
        storeAlert.errorAlert.statusAlert = true
        storeAlert.errorAlert.message = error.response.data.message
        storeAlert.errorAlert.statusText = error.response.statusText
    }

}


const nomorHpValid = (event) => {
    const value = event.target.value
    const nomorHpRegex = /^08\d{8,12}$/
    return nomorHpRegex.test(value)
}
const nomorHpErrorMessage = (event) => {
    const value = event.target.value
    const message = `Nomor Hp tidak valid, format nomor Hp harus 08XXXXXXXXXX, `
    const minLength = 10
    const maxLength = 13
    const length = value.length

    if (length < minLength) {
        return `${message}dan minimal ${minLength} angka`
    }
    if (length > maxLength) {
        return `${message}dan maksimal ${maxLength} angka`
    }
    return ''
}
const handleKeyUp = (event) => {
    if (userData.nomorHp === "") {

        storeAlert.$reset()
        return
    }
    const isValid = nomorHpValid(event)
    const errorMessage = nomorHpErrorMessage(event)
    if (!isValid) {
        submitErrorWa.value = false
        storeAlert.errorAlert.statusAlert = true
        storeAlert.errorAlert.message = errorMessage
    }
    if (isValid) {
        submitErrorWa.value = true
        storeAlert.errorAlert.statusAlert = false
    }
}

const fullNameValid = (event) => {
    const value = event.target.value
    const fullNameRegex = /^[a-zA-Z. ]{6,}$/
    return fullNameRegex.test(value)
}

const fullNameErrorMessage = (event) => {
    const value = event.target.value
    const message = 'Nama lengkap tidak valid, hanya huruf, spasi, titik, dan tanda petik  yang diizinkan.'
    const minLength = 6
    const length = value.length
    if (length < minLength) {
        return `${message} minimal ${minLength} huruf`
    }
    return ''
}

const handleKeyUpText = (event) => {
    if (userData.namaLengkap === "") {
        storeAlert.$reset()
        return
    }
    const isValid = fullNameValid(event)
    const errorMessage = fullNameErrorMessage(event)
    if (!isValid) {
        submitErrorTe.value = false
        storeAlert.errorAlert.statusAlert = true
        storeAlert.errorAlert.message = errorMessage
    }
    if (isValid) {
        submitErrorTe.value = true
        storeAlert.errorAlert.statusAlert = false
    }

}



const logout = () => {
    alert("Logout")
    auth.token = null;
    auth.user = {};
    auth.otentikasi = false;
    sessionStorage.removeItem('otentikasi');
    sessionStorage.removeItem('token');
    router.push("/login")
}

onBeforeRouteLeave(() => {
    storeAlert.$reset()
})


</script>

<template>
    <div class="d-flex justify-content-center align-items-center bg-gradient-info" style="height: 100vh">
        <div class="col-12 col-md-10">
            <div class="card mb-3 shadow-lg">
                <div class="card-header bg-gradient-secondary">
                    <h5 class="text-white m-0 text-center">Lengkapi data User</h5>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="d-flex">
                            <div class="col">
                                <input type="hidden" name="id" v-model="userData.id">
                                <div class="mb-3">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">Nama Lengkap
                                                :</span>
                                        </div>
                                    </div>
                                    <div class="input-group input-group-sm">
                                        <input v-model="userData.namaLengkap" type="text" class="form-control"
                                            autocomplete="off" required @input="fullNameValid"
                                            @keyup="handleKeyUpText" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">WhatsApp :</span>
                                        </div>
                                    </div>
                                    <div class="input-group input-group-sm">
                                        <input v-model="userData.nomorHp" type="text" class="form-control"
                                            autocomplete="off" required name="nomorHp" @input="validateNomorHp"
                                            @keyup="handleKeyUp" />
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">+62</span>
                                        </div>

                                    </div>
                                </div>
                                <button type="button" class="btn btn-warning mr-2" @click="logout()"> <i
                                        class=" fa-solid fa-circle-arrow-left"></i>
                                    Kembali</button>
                                <button type="reset" class="btn btn-primary mr-2"><i class="fa-brands fa-x-twitter"></i>
                                    Batal</button>
                                <button type="submit" class="btn btn-success"
                                    v-if="submitErrorWa === true && submitErrorTe === true">
                                    <i class="fa-solid fa-paper-plane"></i>
                                    Simpan
                                </button>
                            </div>
                            <div class="col">
                                <divAlert />
                                <div class="alert alert-danger">
                                    Sebelum melanjutkan silahkan lengkapi data anda
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.boxRol-label-only {
    display: inline-block;
    padding-left: 0.5rem;
}

.boxRol {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.boxRol-label {
    position: relative;
    cursor: pointer;
}


.box-check-checked {
    background-color: #43908d;
    color: #fff;
}

.custom-boxRol:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, .25);
}
</style>