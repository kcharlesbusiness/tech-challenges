import type { Grid } from '@/types/gridTypes';

export namespace Robot {
    export enum Statuses {
        STANDBY = 0,
        SCOUTING = 1,
        COMPLETED = 2,
        LOST = 3,
    }

    export enum Orientation {
        NORTH = 'N',
        EAST = 'E',
        SOUTH = 'S',
        WEST = 'W',
    }

    export enum Instruction {
        RIGHT = 'R',
        LEFT = 'L',
        FORWARD = 'F',
        // "additional command types"
    }

    export interface Interface {
        position: Grid.Position | null;
        orientation: Robot.Orientation | null;
        instructions: string | null;
        status: Statuses;
        readonly gridBounds: Grid.Position;
        // methods
        setPosition: (position: Grid.Position, orientation: Robot.Orientation) => void;
        executeInstructions: () => void;
        // accessors
        isOperational: boolean;
        lastKnownPosition: string;
    }
}