export {};

declare global {
    interface Array<T> {
        remove(item: any): Array<T>;
        move(startIndex : number, end: number): Array<T>;
        moveTowardStart(item: any): Array<T>;
        moveTowardEnd(item: any): Array<T>;
        moveToStart(item: any): Array<T>;
        moveToEnd(item: any): Array<T>;
    }
}

Array.prototype.remove = function (item: any) {
    let indexToRemove = this.indexOf(item);

    if(indexToRemove !== -1)
        this.splice(indexToRemove, 1);

    return this;
};

Array.prototype.move = function (startIndex: number, endIndex: number) {
    let item = this[startIndex];
    this.splice(startIndex, 1);
    this.splice(endIndex, 0, item);
    return this;
};

Array.prototype.moveTowardStart = function (item: any) {
    let startIndex = this.indexOf(item);

    if(startIndex == 0) return this;

    let endIndex = startIndex - 1;
    this.move(startIndex, endIndex);
    return this;
}

Array.prototype.moveTowardEnd = function (item: any) {
    let startIndex = this.indexOf(item);
    let endIndex = startIndex + 1;

    if(endIndex >= this.length) return this;

    this.move(startIndex, endIndex);
    return this;
}

Array.prototype.moveToStart = function (item: any) {
    let startIndex = this.indexOf(item);
    let endIndex = 0
    this.move(startIndex, endIndex);
    return this;
}

Array.prototype.moveToEnd = function (item: any) {
    let startIndex = this.indexOf(item);
    let endIndex = this.length;
    this.move(startIndex, endIndex);
    return this;
}