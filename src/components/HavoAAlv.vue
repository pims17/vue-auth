<template>
    <h1 v-if="emailVerified">
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">Rekenen met haakjes</h5>
                    <button @click="router.push('/havoaalvhaakjes-1')" class="btn btn-primary stretched-link">Start module</button>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Rekenen met breuken</h5>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Rekenen met machten</h5>
                </div>
            </div>
        </div>
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">Rekenen met wortels</h5>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Substitutie formules</h5>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Variabele vrijmaken</h5>
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