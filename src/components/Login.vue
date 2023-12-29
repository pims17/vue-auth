<template>
    <form @submit.prevent="signIn">
        <h3>Login</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </div>

        <div class="form-group">
            <label>Wachtwoord</label>
            <input type="password" class="form-control" placeholder="Wachtwoord" v-model="password" />
        </div>
        <a href="/forgotpassword">Wachtwoord vergeten?</a>

        <button class="btn btn-primary btn-block mt-3">Inloggen</button>
    </form>
    

    <button @click="signInWithGoogle" class="btn btn-primary btn-block mt-3">Inloggen met Google</button>

    <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
    </div>

</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const auth = getAuth()

const signIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Succesfully logged in!");
            console.log(auth.currentUser)
            router.push("/feed")
        })
        .catch((error) => {
            console.log(error.code);
            switch(error.code){
                case "auth/invalid-email":
                    errorMessage.value = "Email niet gevonden";
                    break;
                case "auth/user-not-found":
                    errorMessage.value = "Er bestaat geen account met deze email"
                    break;
                case "auth/wrong-password":
                    errorMessage.value = "Verkeerde wachtwoord"
                    break;
                default:
                    errorMessage.value = "Verkeerde email of wachtwoord" 
            }
        });
}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push("/feed");
    })
    .catch((error) => {

    })
}

</script>