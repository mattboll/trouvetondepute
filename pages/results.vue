<template>
    <div>
        <h1>Résultats</h1>
        <p>
            {{ results }}
        </p>
    </div>
</template>

<script setup>
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();

const results = computed(() => {
  return quizStore.getResults();
});
</script>