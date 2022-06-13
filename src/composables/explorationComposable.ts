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
    });

    // Sets the scope of the mission
    const scanTerrain = (units: number): void => {
        state.units = units;
    };

    const initialiseScoutRobots = (): void => {
        if (!state.units) {
            throw new Error('When need to scan the terrain before prepping the robots!');
        }

        // Prepping the robot bay
        state.robots = [];

        // initialising the robots
        for (let i = 0; i <= state.units; i++) {
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
        if (!state.robots) {
            throw new Error('When need to scan the terrain and initialise the robots before prepping the robots!');
        }

        // Sequentially scout the terrain with the robots
        state.robots.forEach((robot: RobotModel) => {
            robot.executeInstructions();
        });
    }

    return {
        state,
        scanTerrain,
        initialiseScoutRobots,
        scoutTerrain,
    };
}
