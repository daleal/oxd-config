<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>

<template>
  <p>{{ props.message }}</p>
</template>
