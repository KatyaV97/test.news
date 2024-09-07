<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="0"
  />

  <v-overlay
      v-model="overlay"
      @click="toggleOverlay"
      class="align-center justify-center"
      contained
  >
    <div class="d-flex align-center justify-center w-25 popup-block">
      <img
          :src="newsStore.selectedNews.enclosure.url"
          alt="Картинка нновости"
      >
    </div>
  </v-overlay>

  <DefaultContainer>
    <NuxtLink
        to="/news"
        class="d-flex align-center ga-2 mb-8 breadcrumb-container"
    >
      <svg
          class="back-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H5.41421L9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289Z"
            fill="#030953"/>
      </svg>
      <p class="_non-space">
        Новости
      </p>
      {{overlay}}
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
          {{ newsStore.selectedNews.pubDate }}
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
    <div
        @click="toggleOverlay"
        class="d-flex align-content-center"
    >
      <v-img
          v-if="newsStore.selectedNews?.enclosure
              && newsStore.selectedNews.enclosure?.url"
          :src="newsStore.selectedNews.enclosure.url"
          width="50%"
          aspect-ratio="16/9"
          cover
      ></v-img>
    </div>

  </DefaultContainer>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {useNewsStore} from "~/store/news";

const pageTitle = 'Новости';
const route = useRoute()
const newsStore = useNewsStore();

let overlay = false;
if (!newsStore.newsList?.items
    || newsStore.newsList.items.length === 0) {
  console.log(23)
  await newsStore.getNews();
  console.log(newsStore.newsList)
} else {
  console.log(11)
  newsStore.setNewsById(route.params.id);
  console.log(newsStore.selectedNews)
}

watch(
    () => [newsStore.newsList],
    ([newsData]) => {
      console.log('Новости:', newsData);
      if (newsData && route.params.id) {
        newsStore.setNewsById(route.params.id);
        console.log('Выбранная новость:', newsStore.selectedNews);
      }
    }
);

function toggleOverlay() {
  this.overlay = !this.overlay;
  console.log(this.overlay);
}
</script>

<style scoped>
</style>