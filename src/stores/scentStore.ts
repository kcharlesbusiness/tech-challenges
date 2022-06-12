import { reactive } from 'vue';
import type { Scent } from '@/types/scentType';
import type { Grid } from '@/types/gridTypes';
import type { Robot } from '@/types/robotsType';

export const scentStore = reactive<{
    scents: Array<Scent>;
    addScent: (position: Grid.Position, direction: Robot.Orientation) => void;
    checkMove: (position: Grid.Position, direction: Robot.Orientation) => boolean;
}>({
    scents: [],
    addScent(position: Grid.Position, direction: Robot.Orientation) {

    },
    // Return true if we have record of a move that lead to a lost robot
    checkMove(position: Grid.Position, direction: Robot.Orientation) {

    },
});