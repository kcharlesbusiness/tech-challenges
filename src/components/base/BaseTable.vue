<script setup lang="ts">
import { onMounted } from 'vue';
// composables
import type { TableData } from '../../composables/tableComposable';
import { useSearch } from '../../composables/tableComposable';
// services
import { debounce } from '../../services/eventsService';

export interface BaseTableInterface {
  triggerSearchTable: () => void;
  handleSearch: (...args: any) => void;
}

const props = defineProps<{
  title: string,
  data: TableData,
  searchable?: Boolean,
}>();

const { state, searchTable } = useSearch();

const triggerSearchTable = () => {
  searchTable(state.default as unknown as TableData, state.searchTerm);
}
const handleSearch = debounce(triggerSearchTable);

onMounted(() => {
  state.loading = true;
  state.data = props.data;
  state.default = props.data;
  state.loading = false;
});

defineExpose<BaseTableInterface>({
  triggerSearchTable,
  handleSearch,
});
</script>

<template>
  <section class="v-base-table">
    <div class="container">
      <div class="v-base-table__table">
        <h2 class="">{{ props.title }}</h2>
        <section>
          <template v-if="props.searchable">
            <div>
              <input
                  type="search"
                  name="search"
                  v-model="state.searchTerm"
                  placeholder="search..."
                  @keyup.prevent="handleSearch"
              />
            </div>
          </template>
          <template v-if="data.length">
            <o-table
                :data="state.data"
                :bordered="true"
                :striped="false"
                :narrowed="false"
                :hoverable="true"
                :loading="state.loading"
                :focusable="false"
                :mobile-cards="false"
                :paginated="true"
                :per-page="24"
                :current-page.sync="1"
                :pagination-simple="true"
                :default-sort="Object.keys(data[0])[0]"
                sort-icon="arrow-up"
                sort-icon-size="small"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
            >
              <slot name="columns" :props="props" />
            </o-table>
          </template>
        </section>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.v-base-table {
  .o-table__wrapper {
    overflow: scroll;
  }

  input {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }

  &__table {
    margin-top: 4rem;
    text-align: left;

    h2 {
      margin-bottom: 2rem;
    }
  }
}
</style>
