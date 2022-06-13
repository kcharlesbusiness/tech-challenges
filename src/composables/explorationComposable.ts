import { reactive } from 'vue';
import type { Exploration } from '@/types/explorationType';
import type { Grid } from '@/types/gridTypes';
import RobotModel from '@/models/RobotModel';
import { getRandomFrom } from '@/helpers/numberHelper';
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
            alert('When need to scan the terrain before prepping the robots!');
            return;
        }

        // Prepping the robot bay
        state.robots = [];

        // initialising the robots
        for (let i = 0; i <= state.units; i++) {
            const initialPosition: Grid.Position = {
                x: getRandomFrom(state.units),
                y: getRandomFrom(state.units),
            }

            state.robots.push(
                new RobotModel({
                    position: initialPosition,
                    orientation: getRandomOrientation(),
                    instructions: generateScoutPath(),
                })
            );
        }
    };

    const scoutTerrain = (): void => {
        if (!state.robots) {
            alert('When need to scan the terrain and initialise the robots before prepping the robots!');
            return;
        }

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
