<template>
  <div>
    <h1 class="text-3xl font-bold underline">Quiz</h1>
    <div v-for="question in questions" :key="question.id">
      <h2>{{ question.text }}</h2>
      {{ question }}
    </div>
  </div>
</template>

<script setup>
import { questions } from "../data/questions.js";
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();
</script>
