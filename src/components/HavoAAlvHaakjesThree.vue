<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                Rekenen met haakjes
            </div>
            <div class="card-body">
                <ExamQuestion></ExamQuestion>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <nav aria-label="...">
                    <ul class="pagination pagination-lg">
                        <router-link to="/havoaalvhaakjes-1" class="page-link rounded">Theorie</router-link>
                        <router-link to="/havoaalvhaakjes-2" class="page-link rounded">Oefenen</router-link>
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                Examenopgaven
                                <span class="sr-only">(current)</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"

import ExamQuestion from './ExamQuestion.vue'

const emailVerified = getAuth().currentUser.emailVerified
</script>

<style>

</style>