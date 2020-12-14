class Character {
    constructor() {
        this.x = -1000;
        this.y = height / 2;
        this.speed = 3;
        this.fade = 0;
    }

    move() {
        this.x += this.speed;
        if(this.x > -400) {
            fill(240, 255, 244, this.fade);
            this.fade += 5;
            noStroke();
            text("[Say 'Go' until you see the trunk]", width - 400, height / 2 + 50);
            text("[Then click to see the tree grow]", width - 400, height / 2 + 100);
        }

        if(this.x > width * 6.5) {
            // this.x = -1000;
            // this.x += this.speed;
            screen = 3;
        }

        // let xoff = 0;
        // let yoff = 0;
        // yoff += 0.05;
        // let move = map(noise(xoff, yoff), 0, 1, 500, 550);
        // xoff += 0.02;
        // yoff += 0.01;
        this.y += random(-0.75, 0.75);
    }

    show() {
        push();
        scale(0.2);
        imageMode(CENTER);
        image(kore, this.x + 400, this.y * 5.2);
        pop();

        push();
        scale(0.2);
        imageMode(CENTER);
        image(boat, this.x, this.y * 6.2);
        pop();
    }
}