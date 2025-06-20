class car {
    brand;
    model;
    speed = 0;

    constructor(carDetails) {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }


    displayInfo() {
        console.log(`
            ${this.brand} ${this.model}, speed: ${this.speed} km/h
            `);
    }

    go() {
        this.speed += 5;
        if (this.speed > 200) {
            this.speed = 200;
        }
    }


    brake() {
        this.speed -= 5;

        if (this.speed < 0) {
            this.speed = 0;
        }
    }
}

const car1 = new car({
    brand: 'Toyota',
    model: 'corolla'
});

const car2 = new car({
    brand: 'Tesla',
    model: 'Model 3'
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();