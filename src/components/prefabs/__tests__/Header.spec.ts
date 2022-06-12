import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import Header from '../Header.vue';

describe('Header', () => {
    let wrapper: VueWrapper<ComponentPublicInstance<Header>>;
    beforeEach(() => {
        wrapper = mount(Header, { props: { title: 'Martian Robots' } });
    })

    it('renders correctly with required prop', () => {
        expect(wrapper.text()).includes('Martian Robots');
    });

    it('permanently renders the author', () => {
        expect(wrapper.text()).includes('Karl Charles');
    })
});
