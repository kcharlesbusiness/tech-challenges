<script setup lang="ts">
import { useExploration } from '@/composables/explorationComposable';

// composables
const { state, scanTerrain, initialiseScoutRobots, scoutTerrain } = useExploration();
</script>

<template>
  <div class="explorer--mars">
    <div class="explorer--mars__controls">
      <template v-if="!state.units">
        <button id="init-exploration" class="explorer__button" @click="scanTerrain(50)">Begin Exploration</button>
      </template>
      <template v-if="!state.robots && state.units">
        <button id="init-robots" class="explorer__button" @click="initialiseScoutRobots">Initialise Robots</button>
      </template>
      <template v-if="state.robots?.length && state.units">
        <button id="scout-terrain" class="explorer__button" @click="scoutTerrain">
          {{ !state.output?.length ? 'Scout Mars Terrain' : 'Rerun Exploration' }}
        </button>
      </template>
    </div>

    <div class="explorer--mars__stats">
      <p v-if="state.units">Grid units (x, y): {{ state.units }}</p>
      <p v-if="state.robots?.length">Total Robots: {{ state.robots?.length }}</p>
    </div>
    <template v-if="state.output?.length">
      <div class="explorer--mars__results">
        <h2>Exploration Stats</h2>
        <p>We are able to rerun the mission using the data we've collected. This means the likelihood of losing more robots is lessened. Give it a try!</p>
        <div v-for="(result, index) in state.output" :key="index">
          {{ result }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.explorer--mars {
  text-align: center;
  padding: 5rem 0.2rem;

  &__controls {
    margin-bottom: 1rem;
  }

  &__results {
    margin-top: 2rem;

    h2,
    p {
      margin-bottom: 1rem;
    }
  }
}

.explorer__button {
  padding: 1rem;
  cursor: pointer;
  border: 0;
  border-radius: 5px;
  background-color: #d9d9d9;
}
</style>