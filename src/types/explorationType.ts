import type { Robot } from '@/types/robotsType';
import type { BaseComposableInterface } from '@/types/composablesType';
import type { UnwrapNestedRefs } from 'vue';

export namespace Exploration {
    export interface StateInterface {
        units: number | null;
        robots: Array<Robot.Interface> | null;
    }

    export interface Interface extends BaseComposableInterface<UnwrapNestedRefs<Exploration.StateInterface>> {
        scanTerrain: (units: number) => void;
        scoutTerrain: () => void;
        initialiseScoutRobots: () => void;
    }
}
