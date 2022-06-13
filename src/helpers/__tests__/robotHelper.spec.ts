import { describe, it, expect } from 'vitest';
import * as robotHelper from '../robotHelper';
import { Robot } from '../../types/robotsType';
import type { Grid } from '../../types/gridTypes';

describe('Robot helper', () => {
    /**
     * METHOD: generateScoutPath
     */
    describe('generateScoutPath', () => {
        it('returns a string consisting of a random combination of known instructions', () => {
            const instructions: string = robotHelper.generateScoutPath();
            expect(instructions.length).toBeLessThanOrEqual(100);

            instructions.split('').forEach((instruction: string) => {
                expect(
                    instruction === Robot.Instruction.FORWARD ||
                    instruction === Robot.Instruction.LEFT ||
                    instruction === Robot.Instruction.RIGHT
                    // "additional command types"
                ).toBeTruthy();
            });
        });

        it('can be provided with a "max" character length and will not exceed it', () => {
            const instructions: string = robotHelper.generateScoutPath(10);
            expect(instructions.length).toBeLessThanOrEqual(10);
        });
    });

    /**
     * METHOD: deriveNewOrientation
     */
    describe('deriveNewOrientation', () => {
        describe('robot is facing NORTH', () => {
            it('should face EAST when given the RIGHT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.NORTH, Robot.Instruction.RIGHT);
                expect(newOrientation).toEqual(Robot.Orientation.EAST);
            });
            it('should face WEST when given the LEFT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.NORTH, Robot.Instruction.LEFT);
                expect(newOrientation).toEqual(Robot.Orientation.WEST);
            });
            it('should face NORTH when given the FORWARD instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.NORTH, Robot.Instruction.FORWARD);
                expect(newOrientation).toEqual(Robot.Orientation.NORTH);
            });
        });

        describe('robot is facing EAST', () => {
            it('should face SOUTH when given the RIGHT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.EAST, Robot.Instruction.RIGHT);
                expect(newOrientation).toEqual(Robot.Orientation.SOUTH);
            });
            it('should face NORTH when given the LEFT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.EAST, Robot.Instruction.LEFT);
                expect(newOrientation).toEqual(Robot.Orientation.NORTH);
            });
            it('should face EAST when given the FORWARD instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.EAST, Robot.Instruction.FORWARD);
                expect(newOrientation).toEqual(Robot.Orientation.EAST);
            });
        });

        describe('robot is facing SOUTH', () => {
            it('should face WEST when given the RIGHT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.SOUTH, Robot.Instruction.RIGHT);
                expect(newOrientation).toEqual(Robot.Orientation.WEST);
            });
            it('should face EAST when given the LEFT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.SOUTH, Robot.Instruction.LEFT);
                expect(newOrientation).toEqual(Robot.Orientation.EAST);
            });
            it('should face SOUTH when given the FORWARD instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.SOUTH, Robot.Instruction.FORWARD);
                expect(newOrientation).toEqual(Robot.Orientation.SOUTH);
            });
        });

        describe('robot is facing WEST', () => {
            it('should face NORTH when given the RIGHT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.WEST, Robot.Instruction.RIGHT);
                expect(newOrientation).toEqual(Robot.Orientation.NORTH);
            });
            it('should face SOUTH when given the LEFT instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.WEST, Robot.Instruction.LEFT);
                expect(newOrientation).toEqual(Robot.Orientation.SOUTH);
            });
            it('should face WEST when given the FORWARD instruction', () => {
                const newOrientation: string = robotHelper.deriveNewOrientation(Robot.Orientation.WEST, Robot.Instruction.FORWARD);
                expect(newOrientation).toEqual(Robot.Orientation.WEST);
            });
        });
    });

    /**
     * METHOD: deriveNextCoordinate
     */
    describe('deriveNextCoordinate', () => {
        const originalPosition: Grid.Position = { x: 10, y: 10 };

        it('remains in the original position when given the LEFT instruction', () => {
            const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.NORTH, Robot.Instruction.LEFT);
            expect(nextCoordinate.x === originalPosition.x);
            expect(nextCoordinate.y === originalPosition.y);
        });

        it('remains in the original position when given the RIGHT instruction', () => {
            const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.NORTH, Robot.Instruction.RIGHT);
            expect(nextCoordinate.x === originalPosition.x);
            expect(nextCoordinate.y === originalPosition.y);
        });

        describe('given the FORWARD instruction', () => {
            it('increments the y coordinate when facing NORTH', () => {
                const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.NORTH, Robot.Instruction.FORWARD);
                expect(nextCoordinate.y === originalPosition.y + 1);
                expect(nextCoordinate.x === originalPosition.x);
            });

            it('decrements the y coordinate when facing SOUTH', () => {
                const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.NORTH, Robot.Instruction.FORWARD);
                expect(nextCoordinate.y === originalPosition.y - 1);
                expect(nextCoordinate.x === originalPosition.x);
            });

            it('increments the x coordinate when facing EAST', () => {
                const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.EAST, Robot.Instruction.FORWARD);
                expect(nextCoordinate.y === originalPosition.y);
                expect(nextCoordinate.x === originalPosition.x + 1);
            });

            it('decrements the x coordinate when facing WEST', () => {
                const nextCoordinate: Grid.Position = robotHelper.deriveNextCoordinate(originalPosition, Robot.Orientation.EAST, Robot.Instruction.FORWARD);
                expect(nextCoordinate.y === originalPosition.y);
                expect(nextCoordinate.x === originalPosition.x - 1);
            });
        });
    });
});
