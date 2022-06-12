import { describe, it, expect, beforeEach } from 'vitest';
import { useColonisationOperation } from '../explorationComposable';
import { getRandomFrom } from '../../helpers/numbers';
import { Robot } from '../../types/robotsType';

describe('colonisationComposable', () => {
    const { scanTerrain, scoutTerrain, initialiseScoutRobots, state } = useColonisationOperation();

    it('returns null when accessing the states\' "units" property before scouting the terrain', () => {
        expect(state.units).toBeNull();
    });

    it('returns null when accessing the states\' "robots" property before scouting the terrain', () => {
        expect(state.robots).toBeNull();
    });

    describe('Scanning', () => {
        let expectedUnits: number;
        beforeEach(() => {
            expectedUnits = getRandomFrom(51);
            scanTerrain(expectedUnits);
        });

        it('successfully scouts the terrain to a specific unit count', () => {
            expect(state.units).toEqual(expectedUnits);
        });

        it('initiates the robots required to scout the terrain, based on the total "units"', () => {
            initialiseScoutRobots();

            expect(Array.isArray(state.robots)).toBeTruthy();
            expect(state.robots?.length).toBeGreaterThan(0);
        });
    });

    describe('Scouting', () => {
        beforeEach(() => {
            scanTerrain(getRandomFrom(51));
            initialiseScoutRobots();
        });

        it('scouting begins and robots no longer have the "STANDBY" status', () => {
            scoutTerrain();

            setTimeout(() => {
                state.robots?.forEach((robot: Robot.Interface) => {
                    expect(robot.status).not.toEqual(Robot.Statuses.STANDBY);
                });
            }, 2000);
        });
    });
});
