import { reactive } from 'vue';

export interface TableComposableState {
  loading: boolean;
  searchTerm: string;
  data: TableData;
  default: TableData;
}
export type TableDataItem = Record<string, unknown>;
export type TableData = Array<TableDataItem>;

export function useSearch() {
  const state = reactive<TableComposableState>({
    loading: false,
    searchTerm: '',
    data: [] as TableData,
    default: [] as TableData,
  });

  const searchTable: (data: TableData, searchTerm: string) => void = (data: TableData, searchTerm: string) => {
    let matching: TableData = [];

    data.filter((item: TableDataItem) => {
      // Search individual column(s)
      Object.keys(item).forEach((itemProperty: string) => {
        if (JSON.stringify(item[itemProperty]).search(searchTerm.toLowerCase()) > -1) matching.push(item);
      });
    });

    state.data = Array.from(new Set(matching));
  };

  return {
    state,
    searchTable,
  };
}
