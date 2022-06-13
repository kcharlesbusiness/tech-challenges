import { reactive } from 'vue';
import type { Exploration } from '@/types/explorationType';
import type { Grid } from '@/types/gridTypes';
import RobotModel from '@/models/RobotModel';
import { getRandom } from '@/helpers/numberHelper';
import { getRandomOrientation } from '@/helpers/gridHelper';
import { generateScoutPath } from '@/helpers/robotHelper';

export function useExploration(): Exploration.Interface {
    const state = reactive<Exploration.StateInterface>({
        units: null,
        robots: null,
        output: [],
    });

    // Sets the scope of the mission
    const scanTerrain = (units: number): void => {
        state.units = units;
    };

    const initialiseScoutRobots = (): void => {
        if (!state.units) {
            throw new Error('We need to scan the terrain before prepping the robots!');
        }

        // Prepping the robot bay
        state.robots = [];

        // initialising the robots
        const maxRobots: number = Math.floor(state.units * 0.75);
        for (let i = 0; i < maxRobots; i++) {
            const initialPosition: Grid.Position = {
                x: getRandom(state.units),
                y: getRandom(state.units),
            }

            state.robots.push(
                new RobotModel({
                    position: initialPosition,
                    orientation: getRandomOrientation(),
                    instructions: generateScoutPath(),
                    gridBounds: { x: state.units, y: state.units },
                })
            );
        }
    };

    const scoutTerrain = (): void => {
        if (state.output.length) state.output = [];
        if (!state.robots?.length) {
            throw new Error('We need to scan the terrain and initialise the robots before prepping the robots!');
        }

        // Sequentially scout the terrain with the robots
        for (const [index, robot] of state.robots.entries()) {
            (robot as RobotModel).executeInstructions();
            state.output.push((robot as RobotModel).lastKnownPosition);
        }
    }

    return {
        state,
        scanTerrain,
        initialiseScoutRobots,
        scoutTerrain,
    };
}
