import { Robot } from '@/types/robotsType';
import { getRandom } from '@/helpers/numberHelper';
import type { Grid } from '@/types/gridTypes';

export function generateScoutPath(max: number = 100): string {
    const actualMaxInstructions: number = getRandom(max);
    const directionOptions: Array<string> = ['L', 'R', 'F'];
    let instructions: Robot.Interface['instructions'] = '';

    for (let i = 0; i <= actualMaxInstructions; i++) {
        instructions += directionOptions[getRandom(directionOptions.length - 1)]
    }

    return instructions;
}

export function deriveNewOrientation(from: Robot.Orientation, to: Robot.Instruction): Robot.Orientation {
    switch (from) {
        case Robot.Orientation.NORTH:
            if (to === Robot.Instruction.LEFT) return Robot.Orientation.WEST;
            if (to === Robot.Instruction.RIGHT) return Robot.Orientation.EAST;
            // "additional command types"
            return from;
        case Robot.Orientation.EAST:
            if (to === Robot.Instruction.LEFT) return Robot.Orientation.NORTH;
            if (to === Robot.Instruction.RIGHT) return Robot.Orientation.SOUTH;
            // "additional command types"
            return from;
        case Robot.Orientation.SOUTH:
            if (to === Robot.Instruction.LEFT) return Robot.Orientation.EAST;
            if (to === Robot.Instruction.RIGHT) return Robot.Orientation.WEST;
            // "additional command types"
            return from;
        default:
            if (to === Robot.Instruction.LEFT) return Robot.Orientation.SOUTH;
            if (to === Robot.Instruction.RIGHT) return Robot.Orientation.NORTH;
            // "additional command types"
            return from;
    }
}

export function deriveNextCoordinate(
    from: Grid.Position,
    orientation: Robot.Orientation,
    instruction: Robot.Instruction
): Grid.Position {
    switch (orientation) {
        case Robot.Orientation.NORTH:
            return { x: from.x, y: from.y - (instruction === Robot.Instruction.FORWARD ? -1 : 1) };
        case Robot.Orientation.SOUTH:
            return { x: from.x, y: from.y - (instruction === Robot.Instruction.FORWARD ? 1 : -1) };
        case Robot.Orientation.EAST:
            return { x: from.x - (instruction === Robot.Instruction.FORWARD ? -1 : 1), y: from.y };
        default:
            return { x: from.x - (instruction === Robot.Instruction.FORWARD ? 1 : -1), y: from.y };
    }
}