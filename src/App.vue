<script setup lang="ts">
import Header from './components/prefabs/Header.vue';
import MarsExplorer from './components/containers/MarsExplorer.vue';
</script>

<template>
  <Header title="Martian Robots" />
  <MarsExplorer />
</template>

<style>
@import 'assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}


</style>
