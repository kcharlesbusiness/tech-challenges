export function getRandom(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min) + min);
}
