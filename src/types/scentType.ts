import type { Robot } from '@/types/robotsType';
import type { Grid } from '@/types/gridTypes';

export type Scent = {
    name: string;
    position: Grid.Position;
    orientation: Robot.Orientation;
};
