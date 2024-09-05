<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="0"
  />
  <DefaultContainer>
    <FilterBlock/>
    <div class="d-flex flex-column ga-8 news-content-block">
      <h1 class="page-title _non-space">
        Список новостей
      </h1>
      <template
          v-if="news.value?.items
                && news.value.items.length > 0"
      >
        <NewsBlock
            v-for="news in news.value.items"
            :news="news"
        />
      </template>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const pageTitle = 'Список новостей';
let news = ref({})
const { data, pending, error } = await useFetch('/api/news/getNews');
news.value = data;
console.log(news)

</script>

<style scoped>
</style>