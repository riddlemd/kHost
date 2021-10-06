import '../mathematics/MathExtensions';

export {};

declare global {
    interface DateConstructor {
        getRandomBetween(min: Date, max: Date): Date;
    }
}

Date.getRandomBetween = function(min: Date, max: Date) {
    if(max < min) throw('Max is less than Min');

    const minTime = min.getTime()
    const maxTime = max.getTime()

    const randomTime = Math.randomBetween(minTime, maxTime);

    return new Date(randomTime);
}