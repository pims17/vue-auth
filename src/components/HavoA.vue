<template>
    <h1 v-if="emailVerified">
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">Algemene vaardigheden</h5>
                    <p class="card-text">4 modules</p>
                    <button @click="router.push('/havoaav')" class="btn btn-primary stretched-link">Oefen met dit onderwerp</button>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Algebraïsche vaardigheden</h5>
                    <p class="card-text"> 5 modules </p>
                    <button @click="router.push('/havoaalv')" class="btn btn-primary stretched-link">Oefen met dit onderwerp</button>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Statistiek</h5>
                    <p class="card-text"> 5 modules </p>
                </div>
            </div>
        </div>
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Lineaire verbanden en formules</h5>
                    <p class="card-text"> 5 modules </p>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Exponentiële verbanden</h5>
                    <p class="card-text"> 5 modules </p>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Onderzoeksopgaven</h5>
                    <p class="card-text"> 5 modules </p>
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
.card-header{
    font-size: xx-large;
    padding: 20px;
}

.card {
    border-radius: 15px;
}

.card-img-top {
    border-radius: 15px;
    padding-left: 15px;
}

.card-body {
    background-color: #f7f7f7;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.card-text {
    font-size: 16px;
    font-weight: normal;
}

.card-deck {
    padding: 15px;
}
</style>