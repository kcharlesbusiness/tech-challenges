import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MarsExplorer from '../MarsExplorer.vue';

describe('MarsExplorer', () => {
    let wrapper = mount(MarsExplorer);

    it('has button to begin exploring Mars', () => {
        const button = wrapper.find('.explore');
        expect(button.exists()).toBeTruthy();
    });
});
