<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                Rekenen met haakjes
            </div>
            <div class="card-body">
                <h5 class="card-title">Rekenen met haakjes</h5>
                <p class="card-text">Hier komt de theorie en de uitleg</p>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <nav aria-label="...">
                    <ul class="pagination pagination-lg">
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                Theorie
                                <span class="sr-only">(current)</span>
                            </span>
                        </li>
                        <router-link to="/havoaalvhaakjes-2" class="page-link rounded">Oefenen</router-link>
                        <router-link to="/havoaalvhaakjes-3" class="page-link rounded">Examenopgaven</router-link>
                    </ul>
                </nav>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"

const emailVerified = getAuth().currentUser.emailVerified
</script>

<style>

</style>