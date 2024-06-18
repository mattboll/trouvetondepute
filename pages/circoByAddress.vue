<template>
  <div class="flex flex-col justify-center items-center mt-3">
    <label for="search">Saisir l'adresse</label><br>

    <input
      type="text"
      id="search"
      placeholder="57 Rue de Varenne, 75007 Paris"
      v-model="searchTerm"
    >

    <ul v-if="searchAddress.length">
      <li>
        {{ searchAddress.length }} adresses
      </li>
      <li
        v-for="(address, k) in searchAddress"
        :key="k"
        @click="selectAddress(address)"
      >
        {{ address.properties.label }}
      </li>
    </ul>

    <div class="flex flex-col justify-center items-center mt-3">
      <cta class="mt-4" to="/circoByName">Je connais le nom de ma circonscription</cta>
    </div>
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce'
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();

const searchTerm = ref('');
const searchAddress = ref([]);

function selectAddress(address) {
  quizStore.setAddress(address);
  navigateTo("/deputeByCirco");
}

const debounceTimer = ref(null);

watch(searchTerm, debounce(async(newTerm) => {
    if (newTerm && newTerm.length > 3) {
      searchAddress.value = await getAddresses(newTerm);
    } else {
      searchAddress.value = [];
    }
}, 500));

async function getAddresses(query) {
  const data = await $fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${query}&limit=15`
  );
  if (data.type === 'FeatureCollection') {
    return data.features;
  }
  return [];
}
</script>
