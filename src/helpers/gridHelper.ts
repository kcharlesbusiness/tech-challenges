import { Robot } from '@/types/robotsType';
import { getRandomFrom } from '@/helpers/numberHelper';

export function getRandomOrientation(): Robot.Orientation {
    switch (getRandomFrom(3)) {
        case 0:
            return Robot.Orientation.NORTH;
        case 1:
            return Robot.Orientation.EAST;
        case 2:
            return Robot.Orientation.SOUTH;
        default:
            return Robot.Orientation.WEST;
    }
}