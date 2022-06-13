import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentPublicInstance } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import MarsExplorer from '../MarsExplorer.vue';

describe('MarsExplorer', () => {
    let wrapper: VueWrapper<ComponentPublicInstance<MarsExplorer>>;

    beforeEach(() => {
        wrapper = mount(MarsExplorer);
    });

    it('initially renders with only the "Begin Exploration" button visible', () => {
        const initExplorationBtn = wrapper.find('#init-exploration');
        expect(initExplorationBtn.exists()).toBeTruthy();

        const initRobotsBtn = wrapper.find('#init-robots');
        expect(initRobotsBtn.exists()).toBeFalsy();

        const scoutTerrainBtn = wrapper.find('#scout-terrain');
        expect(scoutTerrainBtn.exists()).toBeFalsy();
    });

    it('sequentially renders the following button correctly', async () => {
        const initExplorationBtn = wrapper.find('#init-exploration');
        await initExplorationBtn.trigger('click');
        expect(wrapper.find('#init-exploration').exists()).toBeFalsy();

        const initRobotsBtn = wrapper.find('#init-robots');
        expect(initRobotsBtn.exists()).toBeTruthy();

        await initRobotsBtn.trigger('click');
        expect(wrapper.find('#init-robots').exists()).toBeFalsy();

        const scoutTerrainBtn = wrapper.find('#scout-terrain');
        expect(scoutTerrainBtn.exists()).toBeTruthy();

        await scoutTerrainBtn.trigger('click');

        expect(wrapper.find('#scout-terrain')).toBeTruthy();
        expect(wrapper.find('#scout-terrain').text()).toEqual('Rerun Exploration');
    });
});
