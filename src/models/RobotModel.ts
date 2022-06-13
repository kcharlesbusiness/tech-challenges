import { Robot } from '@/types/robotsType';
import type { Grid } from '@/types/gridTypes';
import { deriveNewOrientation, deriveNextCoordinate } from '@/helpers/robotHelper';
import { scentStore } from '@/stores/scentStore';

export default class RobotModel implements Robot.Interface {
    public position!: Grid.Position | null;
    public orientation!: Robot.Orientation | null;
    public instructions!: string | null;

    public status: Robot.Statuses = Robot.Statuses.STANDBY;

    constructor(params: Partial<Robot.Interface>) {
        Object.assign(this, params);
    }

    getCurrentPosition(): string {
        return `${this.position?.x} ${this.position?.y} ${this.orientation}`;
    }

    setPosition(position: Grid.Position, orientation: Robot.Orientation): void {
        this.position = position;
        this.orientation = orientation;
    }

    executeInstructions(): void {
        if (!this.instructions?.length || !this.position || !this.orientation) {
            alert('Initialise this robot before executing its instructions');
            return;
        }

        // Firstly, update the robots status
        this.status = Robot.Statuses.SCOUTING;

        // Execute instructions
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

            // Update the robots' position if valid
            if (!nextMoveIsFatal) {
                this.position = nextPosition;
                this.orientation = nextOrientation;
            }

            // validate robot is still function
            if (!this.isOperational) {
                this.status = Robot.Statuses.LOST;
                scentStore.addScent(this.position, this.orientation);
                break;
            }
        }

        // Lastly, update the status (if operational)
        if (this.status !== Robot.Statuses.LOST) this.status = Robot.Statuses.COMPLETED;
    }


    get isOperational(): boolean {
        if (!this.position) {
            alert('Initialise this robot before executing its instructions');
            return false;
        }

        return this.position.x > -1 && this.position.y > -1;
    }

    get lastKnownPosition(): string {
        switch (this.status) {
            case Robot.Statuses.STANDBY:
                return 'Earth';
            case Robot.Statuses.LOST:
                return `${this.position?.x} ${this.position?.y} ${this.orientation} LOST`;
            default:
                return `${this.position?.x} ${this.position?.y} ${this.orientation}`;
        }
    }
}