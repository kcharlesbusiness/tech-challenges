<script setup lang="ts">
// components
import BaseTable from './base/BaseTable.vue';
// stores
import { useDataStore } from '../store/dataStore';

const dataStore = useDataStore();
</script>

<template>
  <BaseTable title="Top Buyers" :data="dataStore.getTopBuyers">
    <template #columns="{ props }">
      <o-table-column field="name" label="Name" width="100" numeric v-slot="props">
        {{ props.row.name }}
      </o-table-column>

      <o-table-column field="totalBoughtCompetitions" label="Total" width="100" numeric v-slot="props">
        {{ props.row.totalBoughtCompetitions }}
      </o-table-column>
    </template>
  </BaseTable>
</template>

<style scoped>

</style>