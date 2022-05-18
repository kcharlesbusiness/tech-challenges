<script setup lang="ts">
// components
import BaseTable from './base/BaseTable.vue';
// stores
import { useDataStore } from '../store/dataStore';

const dataStore = useDataStore();
</script>

<template>
  <BaseTable title="Successful Bids" :data="dataStore.getSuccessfulBids">
    <template #columns="{ props }">
      <o-table-column field="id" label="ID" width="100" numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>

      <o-table-column field="created" label="Created" width="100" numeric v-slot="props" sortable>
        {{ props.row.created }}
      </o-table-column>

      <o-table-column field="competition" label="Competition" width="100" numeric v-slot="props" sortable>
        {{ props.row.competition }}
      </o-table-column>

      <o-table-column field="seller" label="Seller" width="100" numeric v-slot="props" sortable>
        {{ props.row.seller }}
      </o-table-column>

      <o-table-column field="value" label="Value" width="100" numeric v-slot="props" sortable>
        {{ props.row.value }}
      </o-table-column>

      <o-table-column field="offered_capacity" label="Offered Capacity" width="100" numeric v-slot="props" sortable>
        {{ props.row.offered_capacity }}mw
      </o-table-column>
    </template>
  </BaseTable>
</template>
