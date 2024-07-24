<template>
    <form @submit.prevent="register">
        <h3> Registreren</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>

        <div class="form-group">
            <label>Wachtwoord</label>
            <input type="password" class="form-control" v-model="password" placeholder="Wachtwoord" />
        </div>

        <button class="btn btn-primary btn-block">Registreren</button>
    </form>

    <button @click="signInWithGoogle" class="btn btn-primary btn-block mt-3">Registreren met Google</button>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth"
import { useRouter } from "vue-router"
import { getFirestore, doc, setDoc, } from "firebase/firestore"

const email = ref('')
const password = ref('')

const router = useRouter()
const auth = getAuth()

const db = getFirestore()

auth.languageCode = 'nl_NL'

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Succesfully registered!");
            console.log(auth.currentUser)

            sendVerificationEmail()
            router.push("/verificationsent")
            const docRef = doc(db, "users", auth.currentUser.uid)
            setDoc(docRef, {
                email: email.value
            });
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
}

const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
        .then()
        .catch(error => {
            console.error(error)
        })
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
