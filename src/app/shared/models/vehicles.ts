export class Vehicle {
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
    count: number
    constructor(name, total_no, max_distance, speed) {
        this.name = name;
        this.total_no = total_no;
        this.max_distance = max_distance;
        this.speed = speed;
        this.count = total_no;
    }

    addCount() {
        this.count++;
    }

    reduceCount() {
        this.count--;
    }
}