<template>
    <div class="card border-light">
        <div class="card-body">
            <h5 class="card-title">{{ questionTitle }}</h5>
            <div v-katex="questionText" class="latex"></div>
            <div style="padding-top: 3%;">
                <h5> Mijn antwoord</h5>
            </div>
            <div>
                <math-field ref="mf" readonly style="font-size:18px; width:160px;" @focusin="focus">
                    {{ answerOneHeader }} = \ \placeholder[answer]{}
                </math-field>
            </div>
            <div>
                <math-field ref="mf2" readonly style="font-size:18px; width:160px" @focusin="focus">
                    {{ answerTwoHeader }} = \ \placeholder[answer]{}
                </math-field>
            </div>
            <div style="padding-top: 2%;">
                <button v-if="type === 'A'" type="button" @click="controleer"
                    class="btn btn-primary btn">Controleren</button>
                <button v-else-if="type === 'B'" class="btn btn-success btn">Correct!</button>
                <button v-else-if="type === 'C'" type="button" class="btn btn-danger btn">Helaas</button>
                <button v-if="type === 'B' || type === 'C'" @click="changeQuestion" class="btn btn-primary btn"
                    style="float: right;">Ga verder</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, defineEmits } from 'vue'

import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const db = getFirestore();
const auth = getAuth();

const emit = defineEmits(['changeQuestion'])

const changeQuestion = () => {
    type.value = 'A'
    clearAnswer(mf)
    clearAnswer(mf2)
    emit('changeQuestion')
}

const props = defineProps({
    questionText: String,
    questionTitle: String,
    questionCategory: String,
    questionId: String,
    answerOne: String,
    answerTwo: String,
    answerOneHeader: String,
    answerTwoHeader: String
})

const mf = ref();
const mf2 = ref();
let type = ref("A");

onMounted(() => {
    MathfieldElement.decimalSeparator = ",";
    mf.value.menuItems = [];
    mf2.value.menuItems = [];
    mf.value.mathModeSpace = '\\:';
    mf2.value.mathModeSpace = '\\:';
});

const focus = () => {
    mathVirtualKeyboard.layouts = {
        rows: [
            [
                "\\frac{#?}{#?}", "#?\\frac{#?}{#?}", "\\sqrt{#?}", "#?^{#?}",
            ],
        ]
    };
}

const controleer = () => {
    const ce = MathfieldElement.computeEngine;
    const answerOne = ce.parse(mf.value.getPromptValue("answer"));
    const answerTwo = ce.parse(mf2.value.getPromptValue("answer"));
    const correctAnswerOne = ce.parse(props.answerOne);
    const correctAnswerTwo = ce.parse(props.answerTwo);
    const correct = answerOne.isSame(correctAnswerOne) && answerTwo.isSame(correctAnswerTwo);
    const docRef = doc(db, "users", auth.currentUser.uid)
    try {
        setDoc(docRef, {
            [props.questionCategory]: {
                [props.questionId]: correct
            }
        },
            { merge: true });
    } catch (error) {
        console.log(error)
    }
    type.value = correct ? "B" : "C";
}

const clearAnswer = (mf) => {
    if (mf.value) {
        let currentValue = mf.value.getValue();
        // Assuming you want to clear only the user input after the equal sign
        // This regex will replace the user input while keeping the structure intact
        let newValue = currentValue.replace(/(=\s*)\S.*/g, '$1\\placeholder[answer]{}'); // Resetting to a placeholder
        mf.value.setValue(newValue);
    }
}
</script>

<style>
.form-control {
    size: 5;
}

.normaltext {
    font-size: 16;
}

.latex {
    font-size: 16px;
    font-weight: 400;
}

math-field::part(menu-toggle) {
    display: none;
}

math-field::part(prompt) {
    outline: none
}

body {
    --keycap-height: 70px;
}
</style>
