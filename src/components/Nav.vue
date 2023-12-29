<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/feed" v-if="isLoggedIn" class="nav-link">Modules</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" v-if="!isLoggedIn" class="nav-link">Inloggen</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" v-if="!isLoggedIn" class="nav-link">Registreren</router-link>
          </li>
          <li class="nav-item">
            <button @click="handleSignOut" v-if="isLoggedIn" class="nav-link">Uitloggen</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import router from "@/router";

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    }
    else {
      isLoggedIn.value = false
    }
  });
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  })
}

</script>

<style scoped>
  .nav-link{
    border: none; 
    background: none
  }

  .nav-link:active{
    border: none; 
    background: none;
    outline: none;
  }

  .nav-link:focus{
    border: none; 
    background: none;
    outline: none;
  }


</style>
