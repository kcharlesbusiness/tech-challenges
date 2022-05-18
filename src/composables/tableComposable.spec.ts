import { useSearch, TableComposableState, TableData } from './tableComposable';
import { hasOwnProp } from '../services/objectService';
import { getCompetitionList } from '../services/dataService';

describe('COMPOSABLE - tableComposable', () => {
  const { state, searchTable } = useSearch();

  describe('useSearch - state', () => {
    it('has the needed state variables', () => {
      expect(hasOwnProp<TableComposableState>(state, 'loading')).toBeTruthy();
      expect(hasOwnProp<TableComposableState>(state, 'searchTerm')).toBeTruthy();
      expect(hasOwnProp<TableComposableState>(state, 'loading')).toBeTruthy();
      expect(hasOwnProp<TableComposableState>(state, 'loading')).toBeTruthy();
    });

    it('has the correct default data', () => {
      expect(state.loading).toEqual(false);
      expect(state.searchTerm).toEqual('');
      expect(state.data).toEqual([]);
      expect(state.default).toEqual([]);
    });
  });

  describe('useSearch - searchTable', () => {
    it('filters the table data depending on text input', () => {
      const defaultData: TableData = getCompetitionList() as unknown as TableData;
      state.data = defaultData;
      state.default = defaultData;

      expect(state.data).toEqual(state.default);

      state.searchTerm = 'EUR';
      searchTable(state.default, state.searchTerm);

      expect(state.data).not.toEqual(defaultData);
      expect(state.data.length).not.toEqual(defaultData);
      expect(state.data.length).not.toEqual(defaultData.length);
      expect(state.data.length).toBeLessThan(defaultData.length);
    });
  });
});
