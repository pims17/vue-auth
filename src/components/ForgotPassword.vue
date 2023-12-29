<template>
    <form @submit.prevent="handleForgotPassword">
        <h3>Wachtwoord resetten</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </div>
        <button class="btn btn-primary btn-block">Wachtwoord opnieuw instellen</button>
    </form>

    <div v-if="clicked & !showError" class="alert alert-success mt-3">
        Email met resetlink verzonden
    </div>
    <div v-if="clicked & showError" class="alert alert-danger mt-3">
        {{ errorMessage }}
    </div>


</template>
<script setup>
import { ref } from "vue"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

const email = ref('')
const clicked = ref(false)
const success = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const auth = getAuth()
auth.languageCode = 'nl_NL'

async function handleForgotPassword(){
    success.value = true
    await sendPasswordResetEmail(auth, email.value)
    .catch((error) => {
            success.value = false
            console.log(error.code);
            switch(error.code){
                case "auth/invalid-email":
                    errorMessage.value = "Email niet gevonden";
                    break;
                case "auth/user-not-found":
                    errorMessage.value = "Er bestaat geen account met deze email"
                    break;
                case "auth/too-many-requests":
                    errorMessage.value = "Te vaak geprobeerd"
                    break;
                default:
                    errorMessage.value = "Verkeerde email" 
            }
        });
    showError.value = !success.value
    clicked.value = true
    if(success){
        email.value = ''
    }
}
</script>