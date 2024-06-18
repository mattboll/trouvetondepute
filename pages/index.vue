<template>
  <div class="mt-4">
    <question @onSubmit="setAnswer"></question>

<div class="flex flex-col justify-center items-center mt-3">
    <div class="mt-4" v-show="hasResults">
        <NuxtLink class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full" to="/results">Tes résultats</NuxtLink>
    </div>
    <div class="mt-4">
        <NuxtLink class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full" to="/legals">On est qui ?</NuxtLink>
    </div>
    </div>
  </div>
</template>

<script setup>
import question from "../components/question";
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();

const currentIndex = ref(0);
const history = []

function setAnswer(data) {
  let value = 0;
  if (data.type === 'like' || data.type==='super') {
    value = 1
  } else if (data.type === 'nope') {
    value = -1
  }
  quizStore.setAnswer(data.key, value);
  currentIndex.value = currentIndex.value + 1;
}

const hasResults = computed(() => {
  return quizStore.answers.length > 2;
});

</script>

<style scoped>
.btn:hover {
  background-color: red;
}
.btn {
  background-color: blueviolet;
}
</style>