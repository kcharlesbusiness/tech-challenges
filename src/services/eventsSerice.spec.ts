import { vi } from 'vitest';
import { debounce } from './eventsService';
import MockedFn = jest.MockedFn;

describe('SERVICE - eventsService', () => {
  describe('METHOD - debounce', () => {
    it('triggers 1 event within 1 second', () => {
      const fn: () => MockedFn<any> = vi.fn();
      const triggerDebounceMethod = debounce(fn, 800);

      triggerDebounceMethod();
      setTimeout(() => triggerDebounceMethod(), 300);

      setTimeout(() => expect(fn).toBeCalledTimes(1), 1100);
    });

    it('triggers 2 event within 2 second', () => {
      const fn: () => MockedFn<any> = vi.fn();
      const triggerDebounceMethod = debounce(fn, 800);

      triggerDebounceMethod();
      setTimeout(() => triggerDebounceMethod(), 300);
      setTimeout(() => triggerDebounceMethod(), 1300);

      setTimeout(() => expect(fn).toBeCalledTimes(2), 2000);
    });
  });
});