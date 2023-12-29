<template>
    <h1 v-if="emailVerified">
        <div class="card-deck">
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body text-center">
                    <h5 class="card-title">Module 1</h5>
                    <p class="card-text"> 5 modules</p>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Module 2</h5>
                    <p class="card-text"> 5 modules </p>
                </div>
            </div>
            <div class="card text-center">
                <img src="../assets/wisAhavo.svg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Module 3</h5>
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

</style>