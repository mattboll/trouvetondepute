<template>
  <div>
    {{ address.properties.label }}
    <br>
    {{ currentCirco.properties?.nomDepartement }} <br>
    {{ currentCirco.properties?.nomCirconscription }} <br>
  </div>
</template>

<script setup>
import { useQuizStore } from "../stores/quiz";

const quizStore = useQuizStore();
const currentCirco = ref({});

const address = computed(() => {
  return quizStore.address;
});

onMounted(async () => {
  const dept = address.value.properties.postcode.slice(0, 2);

  // const data = await $fetch(`/api/circonscription/${dept}`)
  const data = await $fetch(`/circonscriptions-legislatives-p10.geojson`);

  const px = address.value.geometry.coordinates[0];
  const py = address.value.geometry.coordinates[1];
  let isInside = false;


  for (const circo of data.circos) {
    if (circo.properties.codeDepartement === dept) {
      for (const polygon of circo.geometry.coordinates) {
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [xi, yi] = polygon[i];
          const [xj, yj] = polygon[j];

          const intersect =
            yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
          if (intersect) {
            isInside = !isInside;
          }
        }
        if (isInside) {
            currentCirco.value = circo
            console.dir(currentCirco.value)
          break;
        }
          if (circo.properties !== undefined) {
              break;
        }
      }
    }
  }
});
</script>
