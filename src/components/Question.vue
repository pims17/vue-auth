<template>
    <div class="card border-light">
        <div class="card-body">
            <h5 class="card-title">{{ questionTitle }}</h5>
            <div v-katex="questionText" class="latex"></div>
            <div style="padding-top: 3%;">
                <h5> Mijn antwoord</h5>
            </div>
            <div>
                <math-field ref="mf" readonly style="font-size:18px; width:20%;" @focusin="focus">
                    a = \ \placeholder[answer]{}
                </math-field>
            </div>
            <div>
                <math-field ref="mf2" readonly style="font-size:18px; width:20%" @focusin="focus">
                    b = \ \placeholder[answer]{}
                </math-field>
            </div>
            <div style="padding-top: 2%;">
                <button v-if="type === 'A'" type="button" @click="controleer"
                    class="btn btn-primary btn">Controleren</button>
                <button v-else-if="type === 'B'" class="btn btn-success btn">Correct!</button>
                <button v-else-if="type === 'C'" type="button" @click="controleer" class="btn btn-danger btn">Probeer
                    opnieuw</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const db = getFirestore();
const auth = getAuth();

const props = defineProps({
    questionText: String,
    questionTitle: String
})

const mf = ref();
const mf2 = ref();
let type = ref("A");

onMounted(() => {
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
    const correctAnswerOne = ce.parse("\\frac{2}{3}");
    const correctAnswerTwo = ce.parse("2 \\frac{1}{3}");
    const correct = answerOne.isSame(correctAnswerOne) && answerTwo.isSame(correctAnswerTwo);
    if (correct) {
        const docRef = doc(db, "users", auth.currentUser.uid)
        try {
            setDoc(docRef, {
                alvhaakjes: 100
            });
        } catch (error) {
            console.log(error)
        }
    }
    type.value = correct ? "B" : "C";
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
