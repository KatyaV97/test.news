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
          v-if="newsStore.newsList?.items
                && newsStore.newsList.items.length > 0"
      >
        <NewsBlock
            v-for="news in newsStore.newsList.items"
            :news="news"
        />
      </template>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import {useNewsStore} from "~/store/news";

const newsStore = useNewsStore();
const pageTitle = 'Новости';

await newsStore.getNews()


console.log(newsStore.newsList.items)
</script>

<style scoped>
</style>