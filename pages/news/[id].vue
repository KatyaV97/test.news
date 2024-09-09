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
    <v-overlay
        v-model="overlay"
        @click="toggleOverlay"
        class="align-center justify-center custom-popup"
        contained
    >
      <div class="d-flex align-center justify-center popup-block">
        <img
            :src="newsStore.selectedNews.enclosure.url"
            alt="Картинка нновости"
        >
      </div>
    </v-overlay>

    <NuxtLink
        to="/news"
        class="d-flex align-center ga-2 mb-8 breadcrumb-container"
    >
      <p class="_non-space">
        / Новости
      </p>
    </NuxtLink>
    <div
        v-if="newsStore.selectedNews"
        class="d-flex flex-column ga-8 mb-8 news-content-block"
    >
      <h1 class="_non-space">
        {{ newsStore.selectedNews.title }}
      </h1>
      <div class="d-flex flex-column ga-2">
        <p
            v-if="newsStore.selectedNews?.pubDate"
            class="_non-space"
        >
          {{ getFullFormattedDate(newsStore.selectedNews.pubDate) }}
        </p>
        <p
            v-if="newsStore.selectedNews?.author"
            class="_non-space"
        >
          {{ newsStore.selectedNews.author }}
        </p>
        <a
            v-if="newsStore.selectedNews?.link"
            :href="newsStore.selectedNews.link"
            target="_blank"
        >
          {{ newsStore.selectedNews.link }}
        </a>
      </div>
      <div
          v-if="newsStore.selectedNews?.content"
          v-html="newsStore.selectedNews.content"
      />
    </div>
    <div class="d-flex justify-center w-100">
    <div
        @click="toggleOverlay"
        class="d-flex justify-center img-block"
    >
      <v-img
          v-if="newsStore.selectedNews?.enclosure
              && newsStore.selectedNews.enclosure?.url"
          :src="newsStore.selectedNews.enclosure.url"
          class="d-flex justify-center"
          width="50%"
          aspect-ratio="16/9"
          cover
      ></v-img>
    </div>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import {ref, watch} from "vue"
import {useRoute} from "vue-router"
import {useNewsStore} from "@/store/news";
import {getFullFormattedDate} from "@/composables/useFormatedDate";

const pageTitle = 'Новости';
const route = useRoute()
const newsStore = useNewsStore();
let overlay = ref(false);

if (!newsStore.newsList?.items
    || newsStore.newsList.items.length === 0) {
  await newsStore.getNews();
} else {
  newsStore.setNewsById(route.params.id.toString());
}

watch(
    () => [newsStore.newsList],
    ([newsData]) => {
      if (newsData && route.params.id) {
        newsStore.setNewsById(route.params.id.toString());
      }
    }
);

function toggleOverlay(): void {
  overlay.value = !overlay.value;
}
</script>

<style scoped>
</style>