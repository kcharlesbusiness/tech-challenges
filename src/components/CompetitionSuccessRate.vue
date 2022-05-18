<script setup lang="ts">
// components
import BaseTable from './base/BaseTable.vue';
// stores
import { useDataStore } from '../store/dataStore';

const dataStore = useDataStore();
</script>

<template>
  <BaseTable title="Competition Success Rates" :data="dataStore.competitions">
    <template #columns="{ props }">
      <o-table-column field="name" label="Competition" width="100" numeric v-slot="props" sortable>
        {{ props.row.name }}
      </o-table-column>

      <o-table-column field="successRate" label="Success Rate" width="100" numeric v-slot="props" sortable>
        {{ props.row.successRate }}%
      </o-table-column>
    </template>
  </BaseTable>
</template>
