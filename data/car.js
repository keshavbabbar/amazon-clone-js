class car {
    #brand;
    #model;
    speed = 0;
    isTrunckOpen = true;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }


    displayInfo() {
        const trunkStatus = this.isTrunckOpen ? 'open' : 'closed'
        console.log(`
            ${this.#brand} ${this.#model}, 
            speed: ${this.speed} km/h,
            Trunk: ${trunkStatus}
            `);
    }

    go() {
        if (!this.isTrunckOpen) {
            this.speed += 5;
        }

        // limite the speed to 200
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


    openTrunck() {
        if (this.speed === 0) {
            this.isTrunckOpen = true;
        }
    }

    closeTrunck() {
        this.isTrunckOpen = false;
    }
}



class RaceCar extends car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        this.speed += this.acceleration;

        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunck() {
        console.log('Race cars do not have a trunk.')
    }

    closeTrunck() {
        console.log('Race cars do not have a trunk')
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

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});


console.log(car1);
console.log(car2);


car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// trunk should not open since the car is moving
car1.openTrunck();
car1.displayInfo();



car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// trunk should open since the car is not moving
car2.openTrunck();

// car should not go since the trunk is open
car2.go();
car2.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunck();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();

