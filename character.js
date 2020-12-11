class Character {
    constructor() {
        this.x = 0;
        this.speed = 2;
    }

    update() {
        this.x += this.speed;
    }

    show() {
        push();
        scale(0.2);
        image(sprite, this.x + 900, height / 2 * 4.1);
        pop();

        push();
        scale(0.2);
        image(boat, this.x, height / 2 * 5);
        pop();
    }
}