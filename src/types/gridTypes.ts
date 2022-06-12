export namespace Grid {
    export interface Position { x: number, y: number }
    export namespace Coordinate {
        export interface Interface {
            name: string;
            position: Position;
        }
    }
}