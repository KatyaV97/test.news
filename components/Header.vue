<template>
  <header id="header" class="d-flex flex-column align-center w-100">
    <ul class="d-flex justify-space-between w-75 pa-6 header-container">
      <perfect-scrollbar
          :options="{
                     wheelPropagation: false,
                     suppressScrollY: true,
                     useBothWheelAxes: true
                  }"
          class="center"
      >
        <NuxtLink
            to="/news"
        >
          <li
              :class="{
                  '_active' : activeTab === 0
              }"
              class="menu-item"
          >
            Новости
          </li>
        </NuxtLink>
      </perfect-scrollbar>
    </ul>
    <div class="line"/>
  </header>
</template>

<script setup lang="ts">
import {PerfectScrollbar} from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css'

export interface Props {
  activeTab: number
}
withDefaults(defineProps<Props>(), {
  activeTab: -1,
});
</script>

<style scoped>
</style>