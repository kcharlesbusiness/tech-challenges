<script setup lang="ts">
import { useExploration } from '@/composables/explorationComposable';
</script>

<template>
  <div id="mars-explorer">
    <button class="explore">Begin Exploration</button>
  </div>
</template>

<style scoped lang="scss">
#mars-explorer {
  text-align: center;
  padding: 5rem 0.2rem;
}
</style>