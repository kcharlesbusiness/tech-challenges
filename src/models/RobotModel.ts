import { Robot } from '@/types/robotsType';
import type { Grid } from '@/types/gridTypes';
import { deriveNewOrientation, deriveNextCoordinate } from '@/helpers/robotHelper';
import { scentStore } from '@/stores/scentStore';
import {formatGridCoordinates} from "@/helpers/gridHelper";

export default class RobotModel implements Robot.Interface {
    public position!: Grid.Position | null;
    public orientation!: Robot.Orientation | null;
    public instructions!: string | null;
    public readonly gridBounds!: Grid.Position;

    public status: Robot.Statuses = Robot.Statuses.STANDBY;

    constructor(params: Partial<Robot.Interface>) {
        Object.assign(this, params);
    }

    setPosition(position: Grid.Position, orientation: Robot.Orientation): void {
        this.position = position;
        this.orientation = orientation;
    }

    executeInstructions(): void {
        if (!this.instructions?.length || !this.position || !this.orientation) {
            throw new Error('Initialise this robot before executing its instructions');
        }

        // Firstly, update the robots status
        this.status = Robot.Statuses.SCOUTING;

        // Execute instructions sequentially
        for (let i = 0; i < this.instructions.length; i++) {
            let nextPosition: Grid.Position;
            let nextOrientation: Robot.Orientation;
            switch (this.instructions[i]) {
                case Robot.Instruction.LEFT:
                case Robot.Instruction.RIGHT:
                    nextPosition = this.position;
                    nextOrientation = deriveNewOrientation(this.orientation, this.instructions[i] as Robot.Instruction);
                    break;
                // case "additional command types":
                default:
                    nextPosition = deriveNextCoordinate(this.position, this.orientation, this.instructions[i] as Robot.Instruction);
                    nextOrientation = this.orientation;
                    break;
            }

            // Check to see if this is a fatal instruction
            const nextMoveIsFatal: boolean = scentStore.checkMove(nextPosition, nextOrientation);

            // Update the robots' position if the next move hasn't been reported as fatal. ELSE, continue to next instruction
            if (!nextMoveIsFatal) this.setPosition(nextPosition, nextOrientation);
            else continue;

            // validate robot is still function
            if (!this.isOperational) {
                this.status = Robot.Statuses.LOST;
                scentStore.addScent(nextPosition, nextOrientation);
                break;
            }
        }

        // Lastly, update the status (if operational)
        if (this.status !== Robot.Statuses.LOST) this.status = Robot.Statuses.COMPLETED;
    }


    get isOperational(): boolean {
        if (!this.position) {
            throw new Error('Initialise this robot before executing its instructions');
        }

        // Check to see if the robots' position falls outside the 'gridBounds'
        if (this.position.x > this.gridBounds.x || this.position.y > this.gridBounds.y) return false;

        // Check to see if the robots' coordinates are in negative positions (grid bounds should only operate in the [+,+] quadrant)
        if (this.position.x <= -1 || this.position.y <= -1) return false;

        // Default to validating against the current status if all else fails
        return this.status !== Robot.Statuses.LOST;
    }

    get lastKnownPosition(): string {
        if (!this.position) return 'Earth';

        const lastKnownValidPosition: Grid.Position = formatGridCoordinates(this.gridBounds, this.position);

        switch (this.status) {
            case Robot.Statuses.STANDBY:
                return 'Earth';
            case Robot.Statuses.LOST:
                return `${lastKnownValidPosition.x} ${lastKnownValidPosition.y} ${this.orientation} LOST`;
            default:
                return `${lastKnownValidPosition.x} ${lastKnownValidPosition.y} ${this.orientation}`;
        }
    }
}