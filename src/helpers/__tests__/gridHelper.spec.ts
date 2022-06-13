import { describe, it, expect } from 'vitest';
import * as gridHelper from '../gridHelper';
import { Robot } from '../../types/robotsType';

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
});
