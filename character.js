class Character {
    constructor() {
        this.x = 0;
        this.y = height / 2;
        this.speed = 2;
    }

    update() {
        if (this.x < width / 2 * 5) {
            this.x += this.speed;
        } else {
            this.x = width / 2 * 5;
        }

        // let xoff = 0;
        // let yoff = 0;
        // yoff += 0.05;
        // let move = map(noise(xoff, yoff), 0, 1, 500, 550);
        // xoff += 0.02;
        // yoff += 0.01;
        this.y += random(-2, 2);
    }

    show() {
        push();
        scale(0.2);
        image(sprite, this.x + 200, this.y * 4.12);
        pop();

        push();
        scale(0.2);
        imageMode(CENTER);
        image(boat, this.x, this.y * 6.5);
        pop();
    }
}