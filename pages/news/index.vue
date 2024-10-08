<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="0"
  />

  <div class="error-alert">
    <v-alert
        v-if="newsStore.error?.hasError"
        :text="newsStore.error.message"
        :closable="true"
        @click:close="closeAlert"
        type="error"
    ></v-alert>
  </div>

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
            v-for="news in filteredNews"
            :news="news"
        />
        <div class="text-center mb-10">
          <v-pagination
              v-if="newsStore.pagination.pageCount > 1"
              v-model="newsStore.parameters.page"
              :length="newsStore.pagination.pageCount"
              rounded="circle"
          ></v-pagination>
        </div>
      </template>
      <template
          v-else
      >
        <v-skeleton-loader
            v-for="sn in skeletonsCount"
            :key="`sn${sn}`"
            class="mx-auto border"
            width="100%"
            type="paragraph"
        ></v-skeleton-loader>
      </template>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import {computed, watch, ref} from 'vue';
import {useNewsStore} from "@/store/news";
import {initParams} from "@/composables/useFilter";

const newsStore = useNewsStore();
const pageTitle = 'Новости';
const skeletonsCount = 3;
const allNewsList = ref(null);

(async () => {
  initParams()
  if (!newsStore.newsList?.items
      || newsStore.newsList.items.length === 0) {
    await newsStore.getNews()
  }
  allNewsList.value = newsStore.allNewsList
})();

watch(allNewsList, (newVal) => {
      if (newVal?.items) {
        newsStore.initNewsByParams()
      }
    }, {deep: true}
)

const filteredNews = computed(() => {
  if (!newsStore.newsList?.items
      || !Array.isArray(newsStore.newsList.items)) {
    return [];
  }
  const startIndex = (newsStore.parameters.page - 1) * newsStore.pagination.newsCount;
  const endIndex = newsStore.pagination.newsCount * newsStore.parameters.page;
  return newsStore.newsList.items.slice(startIndex, endIndex);
})

function closeAlert() {
  newsStore.setError({
    hasError: false,
    message: ''
  })
}
</script>

<style scoped>
</style>