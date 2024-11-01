<template>
    <h1 v-if="emailVerified">
        <Module :module-name="'hahaakjes'" :module-title="'Rekenen met haakjes'" :question-data="questionData"/>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import Module from './Module.vue'
import QuestionTypeOne from './QuestionTypeOne.vue';
const emailVerified = true

const questionData = {
    1: {
        component: QuestionTypeOne,
        props: {
            questionText: 'Herleid $N=\\frac{2}{3}(t-1)+3$ tot de vorm $N=at+b$. Wat zijn de waarden van $a$ en $b$?',
            answerOne: '\\frac{2}{3}',
            answerTwo: '2 \\frac{1}{3}',
            answerOneHeader: 'a',
            answerTwoHeader: 'b'
        }
    },
    2: {
        component: QuestionTypeOne,
        props: {
            questionText: 'Herleid $y=-3(x-\\frac{1}{3})$ tot de vorm $y=ax+b$. Wat zijn de waarden van $a$ en $b$?',
            answerOne: '-3',
            answerTwo: '1',
            answerOneHeader: 'a',
            answerTwoHeader: 'b'
        }
    },
    3: {
        component: QuestionTypeOne,
        props: {
            questionText: 'Herleid $N=0{\\small,}02(0{\\small,}3t^2-t)\\cdot 5$ tot de vorm $N=at^2+bt$. Wat zijn de waarden van $a$ en $b$?',
            answerOne: '0.03',
            answerTwo: '-0.1',
            answerOneHeader: 'a',
            answerTwoHeader: 'b'
        }
    }
}
</script>

<style>
</style>