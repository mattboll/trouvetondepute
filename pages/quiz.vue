<template>
    <div>
        <h1>Quiz</h1>
        <div v-for="question in questions" :key="question.id">
            <h2>{{ question.text }}</h2>
        </div>
    </div>
</template>

<script setup>
import { questions } from "../data/questions.js";

</script>