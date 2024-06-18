<template>
    <div>
        <h1>Tes résultats</h1>
        <ul>
            <li v-for="(r, i) in results" :key="r.party" class="my-2 px-4">
                <div class="flex">
                {{ i+1 }} 
                <div class="ml-4 party px-2 pl-6 text-white" :class="r.party">
                    {{ r.party }} <br>
                    {{ r.score }} / {{answers.length}}
                </div> 
                </div>
            </li>
        </ul>
        <div>
    <div class="mt-4 flex justify-center items-center content-center">
            <button class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full" @click="reset">Recommencer</button>
    </div>
        </div>
    </div>
</template>

<script setup>
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();

const results = computed(() => {
  return quizStore.getResults().sort((a, b) => b.score - a.score);
});

const answers = computed(() => {
  return quizStore.answers;
})

async function reset() {
  quizStore.reset();
    await navigateTo('/');
}
</script>

<style scoped>
.party {
    min-width: 160px;
    border-radius: 25px;
}
.NFP {
    background-color: #F76E6E;
}

.REN {
    background-color: #371ED2;
}

.RN {
    background-color: #1A1A1A;
}

</style>