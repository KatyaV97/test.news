<template>
  <div class="d-flex flex-column ga-3 mb-8 w-100 filter-container">
    <p class="title _non-space">
      Поиск по названию
    </p>
    <v-text-field
        v-model="searchValue"
        @click:append-inner="onHandleSearchByValue"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Введите заголовок новости"
        variant="solo"
        hide-details
        single-line
        class="w-25"
    ></v-text-field>
  </div>
  <div class="d-flex flex-column ga-3 mb-2 w-25">
    <p class="title _non-space">
      Поиск по дате
    </p>
    <v-date-input
        v-model="searchDate"
        @update:modelValue="onHandleSearchByDate"
        label="Выберете дату"
        max-width="368"
        multiple="range"
    ></v-date-input>
  </div>
  <v-btn
      @click="clearFilter"
      class="mb-8 w-25"
      color="info"
  >
    Очистить фильтр
  </v-btn>
</template>

<script lang="ts" setup>
import {VDateInput} from "vuetify/labs/VDateInput"
import {ref} from 'vue';
import {useNewsStore} from "~/store/news";
import moment from "moment/moment";
import {useUrlParams} from "~/composables/useQueryParams"

let searchValue = ref('')
let searchDate = ref(null)
const newsStore = useNewsStore();
const {setQueryParameter, deleteQueryParameter, deleteQueryParameters} = useUrlParams()
initParameters()

function initParameters() {
  if (newsStore.parameters.search !== '') {
    searchValue.value = newsStore.parameters.search
  }
  if (newsStore.parameters.date) {
    searchDate.value = newsStore.parameters.date
  }
}

function clearFilter() {
  searchValue.value = ''
  newsStore.parameters.search = ''
  newsStore.parameters.date = null
  searchDate.value = null
  deleteQueryParameters(['dateFrom', 'dateTo', 'search'])
  newsStore.initNewsByParams()
}

function onHandleSearchByValue() {
  if (searchValue.value === '') {
    newsStore.parameters.search = ''
    deleteQueryParameter('search')
  } else {
    newsStore.parameters.search = searchValue.value.toLowerCase().trim()
    setQueryParameter('search', newsStore.parameters.search)
  }
  newsStore.initNewsByParams()
}

function onHandleSearchByDate() {
  if (searchDate.value.length === 1) {
    newsStore.parameters.date = {
      from: moment(searchDate.value[0]).format('DD.MM.YYYY'),
      to: moment(searchDate.value[0]).format('DD.MM.YYYY')
    }
    setQueryParameter('dateFrom', newsStore.parameters.date.from)
    setQueryParameter('dateTo', newsStore.parameters.date.to)
  } else if (searchDate.value.length > 1) {
    newsStore.parameters.date = {
      from: moment(searchDate.value[0]).format('DD.MM.YYYY'),
      to: moment(searchDate.value.at(-1)).format('DD.MM.YYYY')
    }
    setQueryParameter('dateFrom', newsStore.parameters.date.from)
    setQueryParameter('dateTo', newsStore.parameters.date.to)
  } else {
    newsStore.parameters.date = null
    deleteQueryParameter('dateFrom')
    deleteQueryParameter('dateTo')
  }
  newsStore.initNewsByParams()
}
</script>

<style scoped>
</style>