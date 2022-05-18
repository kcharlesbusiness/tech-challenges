<script setup lang="ts">
import SuccessfulBids from './components/SuccessfulBids.vue';
import ClosedCompetitions from './components/ClosedCompetitions.vue';
import CompetitionSuccessRate from './components/CompetitionSuccessRate.vue';
import TopBuyers from './components/TopBuyers.vue';
import { onMounted, reactive } from 'vue';
import { useDataStore } from './store/dataStore';

const dataStore = useDataStore();
const state = reactive({
  loading: true,
});

onMounted(async () => {
  await dataStore.hydrateStore();
  state.loading = false;
});
</script>

<template>
  <h1>Vue3 Tech Challenge | Karl Charles</h1>

  <template v-if="!state.loading">
    <SuccessfulBids :searchable="false" />
    <ClosedCompetitions :searchable="false" />
    <CompetitionSuccessRate :searchable="false" />
    <TopBuyers />
  </template>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
