<template>
  <div class="d-flex flex-column ga-3 mb-8 w-100 filter-container">
    <p class="title _non-space">
      Поиск по названию
    </p>
      <v-text-field
          :loading="loading"
          @click:append-inner="onClick"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search templates"
          variant="solo"
          hide-details
          single-line
          class="w-50"
      ></v-text-field>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const loaded = ref(false);
const loading = ref(false);

const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};
</script>

<style scoped>
</style>