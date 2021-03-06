export {}

declare global {
    interface Math {
        randomBetween(min: number, max: number): number;
    }
}

Math.randomBetween = function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}