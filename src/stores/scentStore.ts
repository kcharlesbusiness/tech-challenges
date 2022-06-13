import { reactive } from 'vue';
import type { Scent } from '@/types/scentType';
import type { Grid } from '@/types/gridTypes';
import type { Robot } from '@/types/robotsType';

export const scentStore = reactive<{
    scents: Array<Scent>;
    addScent: (position: Grid.Position, orientation: Robot.Orientation) => void;
    checkMove: (position: Grid.Position, orientation: Robot.Orientation) => boolean;
}>({
    scents: [],
    addScent(position: Grid.Position, orientation: Robot.Orientation) {
        if (this.scents.find((scent: Scent) => scent.name === `${position.x} ${position.y} ${orientation}`)) {
            throw new Error('Robots was allowed to make the same mistake twice, check logic for gaps.');
        }
        this.scents.push({ position, orientation, name: `${position.x} ${position.y} ${orientation}` });
    },
    // Returns 'true' if we have record of a move that lead to a lost robot
    checkMove(position: Grid.Position, orientation: Robot.Orientation) {
        if (!this.scents.length) return false;
        if (this.scents.find((scent: Scent) => scent.name === `${position.x} ${position.y} ${orientation}`)) {
            console.log(true);
            return true;
        } else return false;
    },
});