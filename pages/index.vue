<template>
  <Head>
    <Title>
      {{ pageTitle }}
    </Title>
  </Head>

  <Header
      :active-tab="-1"
  />
</template>

<script setup lang="ts">
const pageTitle = 'Главная';
</script>

<style scoped>

</style>