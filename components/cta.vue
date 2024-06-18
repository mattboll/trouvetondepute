<template>
  <NuxtLink v-bind="$attrs" :to="to" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true
  }
});
</script>