import { describe, expect, it, vi, afterEach } from 'vitest';
import RobotModel from '../RobotModel';
import { Robot } from '../../types/robotsType';
import { scentStore } from '../../stores/scentStore';
import type { Grid } from '../../types/gridTypes';

describe('MODEL - RobotModel', () => {
    const originalInstructions: string = 'LRFLRFLRFLRF';
    const robot: RobotModel = new RobotModel({
        position: { x: 10, y: 10 },
        orientation: Robot.Orientation.NORTH,
        instructions: originalInstructions,
        gridBounds: { x: 50, y: 50 },
    });

    afterEach(() => {
        scentStore.scents = [];
    });

    it('has needed properties', () => {
        expect(robot.instructions).toEqual(originalInstructions);
        expect(robot.orientation).toEqual('N');
        expect(robot.position?.x).toEqual(10);
        expect(robot.position?.y).toEqual(10);
        // accessors
        expect(robot.status).toEqual(Robot.Statuses.STANDBY);
        expect(robot.lastKnownPosition).toEqual('Earth');
        expect(robot.isOperational).toBeTruthy();
    });

    describe('executeInstructions', () => {
        it('handles a full set of instructions when the robot doesn\'t get lost', () => {
            robot.executeInstructions();
            expect(robot.status).toEqual(Robot.Statuses.COMPLETED);
            expect(robot.lastKnownPosition).not.toEqual('Earth');
            expect(robot.lastKnownPosition).toEqual('10 14 N');
        });

        it('handles instructions when the robot is going to get lost', () => {
            const spyScentStoreAddScentMethod = vi.spyOn(scentStore, 'addScent');
            const originalInstructions: string = 'LRFLRFLRFLRF';
            const doomedRobot: RobotModel = new RobotModel({
                position: { x: 10, y: 10 },
                orientation: Robot.Orientation.NORTH,
                instructions: originalInstructions,
                gridBounds: { x: 11, y: 11 },
            });

            doomedRobot.executeInstructions();

            expect(doomedRobot.status).toEqual(Robot.Statuses.LOST);
            expect(doomedRobot.lastKnownPosition).toEqual('10 11 N LOST');
            expect(spyScentStoreAddScentMethod).toHaveBeenCalled();
        });

        it('successfully ignores a fatal instruction', () => {
            const spyScentStoreCheckMoveMethod = vi.spyOn(scentStore, 'checkMove');
            const originalInstructions: string = 'FFRFF';
            const savedRobot: RobotModel = new RobotModel({
                position: { x: 10, y: 10 },
                orientation: Robot.Orientation.NORTH,
                instructions: originalInstructions,
                gridBounds: { x: 16, y: 11 },
            });

            // Add the scent to save the robot
            scentStore.scents.push({
                position: { x: 10, y: 12 },
                orientation: Robot.Orientation.NORTH,
                name: '10 12 N',
            });

            savedRobot.executeInstructions();

            expect(savedRobot.status).toEqual(Robot.Statuses.COMPLETED);
            expect(savedRobot.lastKnownPosition).toEqual('12 11 E');
            expect(spyScentStoreCheckMoveMethod).toHaveBeenCalled();
        });
    });

    describe('isOperational', () => {
        const originalInstructions: string = 'LRFLRFLRFLRF';
        const robot: RobotModel = new RobotModel({
            position: { x: 10, y: 10 },
            orientation: Robot.Orientation.NORTH,
            instructions: originalInstructions,
            gridBounds: { x: 11, y: 11 },
        });

        it('return TRUE when current position and status are in within the operation parameters', () => {
            expect(robot.isOperational).toBeTruthy();
        });

        it('returns false when current position is out of grid bounds', () => {
            robot.setPosition({ x: 12, y: 10 }, Robot.Orientation.NORTH);
            expect(robot.isOperational).toBeFalsy();

            robot.setPosition({ x: 10, y: 12 }, Robot.Orientation.NORTH);
            expect(robot.isOperational).toBeFalsy();
        });

        it('returns FALSE when the current position is in the wrong quadrant', () => {
            robot.setPosition({ x: -1, y: 0 }, Robot.Orientation.NORTH);
            expect(robot.isOperational).toBeFalsy();

            robot.setPosition({ x: 0, y: -3 }, Robot.Orientation.NORTH);
            expect(robot.isOperational).toBeFalsy();
        });

        it('returns FALSE when the current status equals LOST', () => {
            robot.status = Robot.Statuses.LOST;
            expect(robot.isOperational).toBeFalsy();
        });
    });

    describe('lastKnownPosition', () => {
        const originalInstructions: string = 'LRFLRFLRFLRF';
        const robot: RobotModel = new RobotModel({
            position: { x: 10, y: 10 },
            orientation: Robot.Orientation.NORTH,
            instructions: originalInstructions,
            gridBounds: { x: 11, y: 11 },
        });

        it('says the position is "Earth" when the robot has been initiated but not executed', () => {
            expect(robot.lastKnownPosition).toEqual('Earth');
        });

        it('says the position has LOST in the reading when robot fell off the grid', () => {
            robot.executeInstructions();
            expect(robot.lastKnownPosition.includes('LOST')).toBeTruthy();
        });

        it('returns a valid completed position when the robot has not fallen off the grid', () => {
            const robot: RobotModel = new RobotModel({
                position: { x: 10, y: 10 },
                orientation: Robot.Orientation.NORTH,
                instructions: originalInstructions,
                gridBounds: { x: 20, y: 20 },
            });

            robot.executeInstructions();
            expect(robot.lastKnownPosition.includes('LOST')).toBeFalsy();
        });
    });

    describe('setPosition', () => {
        it('updates the robots position coordinates and orientation', () => {
            const currentPosition: Grid.Position | null = robot.position;
            const currentOrientation: Robot.Orientation | null = robot.orientation;
            robot.setPosition({ x: 23, y: 34 }, Robot.Orientation.WEST);

            expect(currentPosition?.x).not.toEqual(robot.position?.x);
            expect(currentPosition?.y).not.toEqual(robot.position?.y);
            expect(currentOrientation).not.toEqual(robot.orientation);
        });
    });
});
