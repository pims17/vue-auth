<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                Rekenen met haakjes
            </div>
            <div v-if="!completed" class="card-body">
                <Question :question-title="'De opgave'" :question-text="questionData[cq].questionText"
                    :question-category="moduleName" :question-id="cq" :answer-one="questionData[cq].answerOne"
                    :answer-two="questionData[cq].answerTwo" :answer-one-header="questionData[cq].answerOneHeader"
                    :answer-two-header="questionData[cq].answerTwoHeader" @change-question="handleChangeQuestion" />
                <div class="card-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar" role="progressbar"
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{ width: score + '%' }">
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="card">
                <div class="card-body">
                    <h5>Je hebt deze module gehaald </h5>
                    <button @click="setAllQuestionsToFalse()" class="btn btn-primary btn" style="float: left;">Nogmaals
                        oefenen</button>
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
import { ref, onMounted } from "vue"
import { getFirestore, doc, onSnapshot, setDoc, getDoc, updateDoc } from "firebase/firestore"

const moduleName = 'hahaakjes'
const db = getFirestore();
const docRef = doc(db, "users", getAuth().currentUser.uid)
const emailVerified = getAuth().currentUser.emailVerified
const completed = ref(true)
const score = ref(0);
const loading = ref(true);

let falseKeys = [];

const handleChangeQuestion = () => {
    if (questionQueue.value.length > 0) {
        cq.value = questionQueue.value.shift()
        console.log(questionQueue.value)
        console.log(cq.value)
    }
    else {
        questionQueue.value = [...falseKeys]
        if (questionQueue.value.length == 0) {
            //User has completed all the questions
            try {
                setDoc(docRef, {
                    completed: true
                },
                    { merge: true });
            } catch (error) {
                console.log(error)
            }
            if (falseKeys.length === 0) {
                completed.value = true
            }
        }
        else {
            cq.value = questionQueue.value.shift()
        }
    }
}

const setAllQuestionsToFalse = async () => {
    const updates = {};

    const docSnap = await getDoc(docRef);

    for (const key in docSnap.data().hahaakjes) {
        console.log('apple')
        updates[`hahaakjes.${key}`] = false;
    }

    // Update the document with the new values
    updateDoc(docRef, updates);
    completed.value = false
    cq.value = 1
}

onSnapshot(docRef, (doc) => {
    score.value = Object.values(doc.data().hahaakjes).filter(value => value === true).length;
    falseKeys = Object.entries(doc.data().hahaakjes)
        .filter(([key, value]) => value === false)
        .map(([key]) => key);
})

onMounted(async () => {
    const docSnap = await getDoc(docRef);
    completed.value = docSnap.data().completed
    loading.value = false
})

let cq = ref(1);
const questionData = {
    1: {
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
    }
}

const questionQueue = ref(Array.from({ length: Object.keys(questionData).length - 1 }, (_, i) => i + 2));

</script>

<style>
[v-cloak] {
    display: none;
}
</style>