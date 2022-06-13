import { describe, it, expect } from 'vitest';
import * as gridHelper from '../gridHelper';
import { Robot } from '../../types/robotsType';
import type { Grid } from '../../types/gridTypes';

describe('Grid helper', () => {
    describe('getRandomOrientation', () => {
        it('returns 1 of 4 possible orientations', () => {
            const randomOrientation: Robot.Orientation = gridHelper.getRandomOrientation();

            expect(
                randomOrientation === Robot.Orientation.NORTH ||
                randomOrientation === Robot.Orientation.EAST ||
                randomOrientation === Robot.Orientation.SOUTH ||
                randomOrientation === Robot.Orientation.WEST
            ).toBeTruthy();
        });
    });

    describe('formatGridCoordinates', () => {
        const gridBounds: Grid.Position = { x: 50, y: 50 };

        describe('formats out-of-bounds coordinates to the next valid value', () => {
            it('formats x: -1 to x: 0', () => {
                expect(gridHelper.formatGridCoordinates(gridBounds, { x: -1, y: 43 })).toEqual({ x: 0, y: 43});
            });
            it('formats x: 51 to x: 50', () => {
                expect(gridHelper.formatGridCoordinates(gridBounds, { x: 51, y: 43 })).toEqual({ x: 50, y: 43});
            });
            it('formats y: -1 to y: 0', () => {
                expect(gridHelper.formatGridCoordinates(gridBounds, { x: 34, y: -1 })).toEqual({ x: 34, y: 0});
            });
            it('formats y: 51 to y: 50', () => {
                expect(gridHelper.formatGridCoordinates(gridBounds, { x: 34, y: 51 })).toEqual({ x: 34, y: 50});
            });
        });
    });
});
