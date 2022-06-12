import { describe, it, expect } from 'vitest';
import * as numbersHelper from '../numbers';

describe('numbers helper', () => {
    describe('getRandomFrom', () => {
        it('returns a random whole number that is between 0 and 21', () => {
            expect(numbersHelper.getRandomFrom(21)).toBeLessThan(22);
            expect(numbersHelper.getRandomFrom(21)).toBeGreaterThan(-1);
        });
    });
});
