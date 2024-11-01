<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                Rekenen met haakjes
            </div>
            <div class="card-body">
                <Theory> </Theory>
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
                        <router-link to="/hahaakjes-2" class="page-link">Oefenen</router-link>
                        <router-link to="/hahaakjes-3" class="page-link rounded-right">Examenopgaven</router-link>
                    </ul>
                </nav>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"

import Theory from './Theory.vue'

const emailVerified = getAuth().currentUser.emailVerified
</script>

<style>

</style>