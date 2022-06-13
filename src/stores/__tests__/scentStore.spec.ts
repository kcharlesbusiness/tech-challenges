import { describe, it, expect } from 'vitest';
import { scentStore } from '../scentStore';
import { Robot } from '../../types/robotsType';

describe('scentStore', () => {
    it('has correct default values', () => {
        expect(Array.isArray(scentStore.scents)).toBeTruthy();
        expect(scentStore.scents.length).toEqual(0);
    });

    describe('addScent', () => {
        it('successfully adds a new scent to the store', () => {
            scentStore.addScent({ x: 6, y: 23 }, Robot.Orientation.WEST);
            expect(scentStore.scents.length).toEqual(1);
            expect(scentStore.scents[0].name).toEqual('6 23 W');
        });
    });

    describe('checkMove', () => {
        it('returns FALSE if there are no scents stored', () => {
            expect(scentStore.checkMove({ x: 23, y: 22 }, Robot.Orientation.NORTH)).toBeFalsy();
        });
        it('returns TRUE if a scent is found', () => {
            scentStore.addScent({ x: 23, y: 22 }, Robot.Orientation.NORTH);
            expect(scentStore.checkMove({ x: 23, y: 22 }, Robot.Orientation.NORTH)).toBeTruthy();
        });
    });
});
