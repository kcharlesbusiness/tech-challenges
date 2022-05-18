<script setup lang="ts">
// components
import BaseTable from './base/BaseTable.vue';
// stores
import { useDataStore } from '../store/dataStore';

const dataStore = useDataStore();
</script>

<template>
  <BaseTable title="Closed Competitions" :data="dataStore.getClosedCompetitions">
    <template #columns="{ props }">
      <o-table-column field="id" label="ID" width="100" numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>

      <o-table-column field="name" label="Buyer" width="100" numeric v-slot="props" sortable>
        {{ props.row.name }}
      </o-table-column>

      <o-table-column field="theBuyer.name" label="Buyer" width="100" numeric v-slot="props" sortable>
        {{ props.row.theBuyer.name }}
      </o-table-column>

      <o-table-column field="totalSuccessfulBids" label="Successful Bids" width="100" numeric v-slot="props" sortable>
        {{ props.row.totalSuccessfulBids }}
      </o-table-column>

      <o-table-column field="bidVolume" label="Bid Volume" width="100" numeric v-slot="props" sortable>
        {{ props.row.bidVolume }}mw
      </o-table-column>

      <o-table-column field="status" label="Status" width="100" numeric v-slot="props">
        {{ props.row.status }}
      </o-table-column>
    </template>
  </BaseTable>
</template>
