<template>
    <h1 v-if="emailVerified">
        <Module :module-name="'hahaakjes'" :module-title="'Rekenen met haakjes'"></Module>
    </h1>
    <p v-else>Je moet nog je email verifiëren 😢</p>
</template>

<script setup>
import Module from './Module.vue'

const emailVerified = true

</script>

<style>

</style>