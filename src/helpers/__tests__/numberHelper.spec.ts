import { describe, it, expect } from 'vitest';
import * as numberHelper from '../numberHelper';

describe('Number helper', () => {
    describe('getRandom', () => {
        it('returns a random whole number that is between 0 and 21', () => {
            expect(numberHelper.getRandom(21)).toBeLessThan(22);
            expect(numberHelper.getRandom(21)).toBeGreaterThan(-1);
        });
    });
});
