<template>
    <h1 v-if="emailVerified">
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">HAVO Wiskunde A</h5>
                    <p class="card-text">Oefen met 16 verschillende examenonderwerpen en 33 bijbehorende modules.</p>
                    <button @click="router.push('/havoa')" class="btn btn-primary stretched-link">Ga naar de onderwerpen</button>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">HAVO Wiskunde B</h5>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">VWO Wiskunde A</h5>
                </div>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"
import router from "@/router";

const emailVerified = getAuth().currentUser.emailVerified
</script>

<style>


</style>