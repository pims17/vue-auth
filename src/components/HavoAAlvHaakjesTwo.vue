<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                Rekenen met haakjes
            </div>
            <div class="card-body">
                <Question :question-title="'De opgave'" 
                :question-text="questionData[cq].questionText" 
                :question-category="'hahaakjes'"
                :question-id="cq"
                :answer-one="questionData[cq].answerOne"
                :answer-two="questionData[cq].answerTwo"
                :answer-one-header="questionData[cq].answerOneHeader"
                :answer-two-header="questionData[cq].answerTwoHeader"/>
                <div class="card-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{width: score + '%'}"></div>
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <nav aria-label="...">
                    <ul class="pagination pagination-lg">
                        <router-link to="/havoaalvhaakjes-1" class="page-link rounded-left">Theorie</router-link>
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                Oefenen
                                <span class="sr-only">(current)</span>
                            </span>
                        </li>
                        <router-link to="/havoaalvhaakjes-3" class="page-link rounded-right">Examenopgaven</router-link>
                    </ul>
                </nav>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"
import Question from './Question.vue'
import { ref } from "vue"

import {getFirestore, doc, onSnapshot } from "firebase/firestore"

const db = getFirestore();
const docRef = doc(db, "users", getAuth().currentUser.uid)
const emailVerified = getAuth().currentUser.emailVerified
const score = ref(0);

onSnapshot(docRef, (doc) => {
    score.value = doc.data().alvhaakjes;
})

const cq = ref(2);
const questionData = { 1: {
    "questionText": 'Herleid $N=\\frac{2}{3}(t-1)+3$ tot de vorm $N=at+b$. Wat zijn de waarden van $a$ en $b$?',
    "answerOne": '\\frac{2}{3}',
    "answerTwo": '2 \\frac{1}{3}',
    "answerOneHeader": 'a',
    "answerTwoHeader": 'b'
},
2: {
    "questionText": 'Herleid $y=-3(x-\\frac{1}{3})$ tot de vorm $y=ax+b$. Wat zijn de waarden van $a$ en $b$?',
    "answerOne": '-3',
    "answerTwo": '1',
    "answerOneHeader": 'a',
    "answerTwoHeader": 'b'
},
3: {
    "questionText": 'Herleid $N=0{\\small,}02(0{\\small,}3t^2-t)\\cdot 5$ tot de vorm $N=at^2+bt$. Wat zijn de waarden van $a$ en $b$?',
    "answerOne": '0.03',
    "answerTwo": '-0.1',
    "answerOneHeader": 'a',
    "answerTwoHeader": 'b'
}}

</script>

<style>

</style>