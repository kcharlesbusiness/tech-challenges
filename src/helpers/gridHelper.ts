import { Robot } from '@/types/robotsType';
import { getRandom } from '@/helpers/numberHelper';
import type { Grid } from '@/types/gridTypes';

export function getRandomOrientation(): Robot.Orientation {
    switch (getRandom(4, 0)) {
        case 0:
            return Robot.Orientation.NORTH;
        case 1:
            return Robot.Orientation.EAST;
        case 2:
            return Robot.Orientation.SOUTH;
        case 3:
            return Robot.Orientation.WEST;
        default:
            throw new Error('Orientation unable to be obtained');
    }
}

export function formatGridCoordinates(gridBounds: Grid.Position, currentPosition: Grid.Position): Grid.Position {
    const position: Grid.Position = { x: currentPosition.x, y: currentPosition.y };

    if (currentPosition.x > gridBounds.x) position.x = gridBounds.x;
    if (currentPosition.x < 0) position.x = 0;
    if (currentPosition.y > gridBounds.y) position.y = gridBounds.y;
    if (currentPosition.y < 0) position.y = 0;

    return position;
}