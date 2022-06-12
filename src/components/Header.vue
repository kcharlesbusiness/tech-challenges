<script setup lang="ts">
defineProps<{
  title: {
    type: string,
    required: true,
  },
}>()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/red-badger-logo.svg" width="500" />
  </header>

  <main>
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <h3>By Karl Charles</h3>
    </div>
  </main>
</template>

<style scoped>
header {
  width: 100%;
  line-height: 1.5;
}

main {
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.5rem 0.875rem;
  border-radius: 5px;
  background-color: var(--vt-c-white);
}
</style>