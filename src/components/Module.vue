<template>
    <h1 v-if="emailVerified">
        <div class="card">
            <div class="card-header text-center">
                {{ moduleTitle }}
            </div>
            <div v-if="!completed" class="card-body">
                <QuestionTypeOne :question-title="'De opgave'" :question-text="props.questionData[cq].props.questionText"
                    :question-category="moduleName" :question-id="cq" :answer-one="props.questionData[cq].props.answerOne"
                    :answer-two="props.questionData[cq].props.answerTwo" :answer-one-header="props.questionData[cq].props.answerOneHeader"
                    :answer-two-header="props.questionData[cq].props.answerTwoHeader" @change-question="handleChangeQuestion" />
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
                        <router-link :to="moduleName + '-1'"  class="page-link rounded-left">Theorie</router-link>
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">
                                Oefenen
                                <span class="sr-only">(current)</span>
                            </span>
                        </li>
                        <router-link :to="moduleName + '-3'"  class="page-link rounded-right">Examenopgaven</router-link>
                    </ul>
                </nav>
            </div>
        </div>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import { getAuth } from "firebase/auth"
import QuestionTypeOne from './QuestionTypeOne.vue'
import { ref, onMounted } from "vue"
import { getFirestore, doc, onSnapshot, setDoc, getDoc, updateDoc } from "firebase/firestore"

const props = defineProps({
    moduleName: {
        type: String
    },
    moduleTitle: {
        type: String
    },
    questionData: {
        type: Object,
        required: true
    }
}
)

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

    for (const key in docSnap.data()[props.moduleName]) {
        updates[`${props.moduleName}.${key}`] = false;
    }

    // Update the document with the new values
    updateDoc(docRef, updates);
    completed.value = false
    cq.value = 1
}

onSnapshot(docRef, (doc) => {
    score.value = Object.values(doc.data()[props.moduleName]).filter(value => value === true).length;
    falseKeys = Object.entries(doc.data()[props.moduleName])
        .filter(([key, value]) => value === false)
        .map(([key]) => key);
})

onMounted(async () => {
    const docSnap = await getDoc(docRef);
    completed.value = docSnap.data().completed
    loading.value = false
})

let cq = ref(1);

const questionQueue = ref(Array.from({ length: Object.keys(props.questionData).length - 1 }, (_, i) => i + 2));

</script>

<style></style>