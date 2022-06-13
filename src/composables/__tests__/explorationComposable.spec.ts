import { describe, it, expect, beforeEach } from 'vitest';
import { useExploration } from '../explorationComposable';
import { getRandom } from '../../helpers/numberHelper';
import { Robot } from '../../types/robotsType';

describe('colonisationComposable', () => {
    const { scanTerrain, scoutTerrain, initialiseScoutRobots, state } = useExploration();

    it('returns null when accessing the states\' "units" property before scouting the terrain', () => {
        expect(state.units).toBeNull();
    });

    it('returns null when accessing the states\' "robots" property before scouting the terrain', () => {
        expect(state.robots).toBeNull();
    });

    describe('Scanning', () => {
        let expectedUnits: number;
        beforeEach(() => {
            expectedUnits = getRandom(50);
            scanTerrain(expectedUnits);
        });

        it('successfully scouts the terrain to a specific unit count', () => {
            expect(state.units).toEqual(expectedUnits);
        });

        it('throws an error when "initialiseScoutRobots" is executed without the state units set', () => {
            state.units = null;
            expect(() => initialiseScoutRobots()).toThrow('We need to scan the terrain before prepping the robots!');
        });

        it('initiates the robots required to scout the terrain, based on the total "units"', () => {
            initialiseScoutRobots();

            expect(Array.isArray(state.robots)).toBeTruthy();
            expect(state.robots?.length).toBeGreaterThan(0);
        });
    });

    describe('Scouting', () => {
        beforeEach(() => {
            scanTerrain(getRandom(50));
            initialiseScoutRobots();
        });

        it('resets the output list when executing "scoutTerrain"', () => {
            state.output.push('999 999 N'); // A coordinate that should never exist in current logic
            expect(state.output.length).toEqual(1);

            scoutTerrain();

            expect(state.output.find((entry: string) => entry.includes('999 999 N'))).toBeFalsy();
        });

        it('throws an error when executing "scoutTerrain" when robots have not been initiated yet', () => {
            state.robots = [];
            expect(() => scoutTerrain()).toThrow('We need to scan the terrain and initialise the robots before prepping the robots!');
        });

        it('scouting begins and robots no longer have the "STANDBY" status', () => {
            scoutTerrain();

            expect(state.robots?.length).toBeTruthy();
            state.robots?.forEach((robot: Robot.Interface) => {
                expect(robot.status).not.toEqual(Robot.Statuses.STANDBY);
            });
        });
    });
});
