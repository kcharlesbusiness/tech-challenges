import { describe, it, expect } from 'vitest';
import BaseTable, { BaseTableInterface } from './BaseTable.vue';
import { render, RenderResult } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import { useDataStore } from '../../store/dataStore';

describe('COMPONENT - BaseTable', () => {
  let wrapper: RenderResult;
  let dataStore: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    dataStore = useDataStore();
  });

  it('renders a vue component without searchable input', () => {
    wrapper = render(BaseTable, {
      // @ts-ignore
      shallow: true,
      props: {
        title: 'BaseTable Title',
        data: dataStore.bids,
        searchable: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders a vue component with searchable input', () => {
    wrapper = render(BaseTable, {
      // @ts-ignore
      shallow: true,
      props: {
        title: 'BaseTable Title',
        data: dataStore.bids,
        searchable: true,
      },
      // @ts-ignore
      stubs: ['o-table']
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
