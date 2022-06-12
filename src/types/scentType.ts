import type { Robot } from '@/types/robotsType';
import type { Grid } from '@/types/gridTypes';

export type Scent = {
    direction: Robot.Orientation;
    position: Grid.Position;
};
