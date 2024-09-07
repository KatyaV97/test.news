<template>
  <div class="d-flex flex-column ga-2 pa-8 news-item">
    <div class="d-flex justify-space-between ga-8">
      <NuxtLink
          :to="'/news/' + news.guid"
          class="d-flex align-center"
      >
        <h3 class="news-title _non-space">
          {{ news.title }}
        </h3>
      </NuxtLink>
      <div class="d-flex align-center date-block">
        <p class="_non-space">
          {{ getShortFormattedDate(news.pubDate) }}
        </p>
      </div>
    </div>
    <div
        v-html="news.content"
        class="d-flex justify-space-between ga-8 news-description"
    />
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"
import {getShortFormattedDate} from "~/composables/useFormatedDate";

defineProps({
  news: Object,
})
</script>

<style scoped>
</style>