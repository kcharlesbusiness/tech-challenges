<script setup lang="ts">
defineProps<{
  title: string,
}>()
</script>

<template>
  <div>
    <img alt="Vue logo" class="logo" src="../../assets/red-badger-logo.svg" width="500" />
  </div>

  <div class="wrapper">
    <h1>{{ title }}</h1>
    <h3>By <a href="https://github.com/kcharlesbusiness/tech-challenges/tree/martian-robots" target="_blank" title="Karl Charles Github">Karl Charles</a></h3>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  line-height: 1.5;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.5rem 0.875rem;
  border-radius: 5px;
  background-color: var(--vt-c-white);
  max-width: 100%;
}
</style>