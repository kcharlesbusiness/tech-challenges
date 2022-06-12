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

    export interface Interface {
        position: string | null;
        instructions: string | null;
        status: Statuses;
    }
}