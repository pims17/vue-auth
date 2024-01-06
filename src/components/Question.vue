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
            <button type="button" class="btn btn-primary btn">Controleren</button>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    questionText: String,
    questionTitle: String
})

const mf = ref();
const mf2 = ref();

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

math-field {
    scriptDepth: 1
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
