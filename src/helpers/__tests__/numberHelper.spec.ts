import { describe, it, expect } from 'vitest';
import * as numberHelper from '../numberHelper';

describe('Number helper', () => {
    describe('getRandomFrom', () => {
        it('returns a random whole number that is between 0 and 21', () => {
            expect(numberHelper.getRandomFrom(21)).toBeLessThan(22);
            expect(numberHelper.getRandomFrom(21)).toBeGreaterThan(-1);
        });
    });
});
