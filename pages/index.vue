<template>
  <div class="mt-4">
    <question @onSubmit="setAnswer"></question>

    <div v-if="hasResults">
        <NuxtLink to="/results">Voir les résultats</NuxtLink>
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

function onSubmit() {

}

function decide(choice) {
      if (choice === 'rewind') {
        if (history.length) {
          this.$refs.tinder.rewind(
            history.splice(-Math.ceil(Math.random() * 3))
          )
        }
      } else {
        this.$refs.tinder.decide(choice)
      }
}

const hasResults = computed(() => {
  return quizStore.answers.length > 2;
});

const results = computed(() => {
  return quizStore.getResults();
});

</script>

<style>


</style>