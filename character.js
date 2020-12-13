class Character {
    constructor() {
        this.x = -1000;
        this.y = height / 2;
        this.speed = 5;
        this.fade = 0;
        this.fadeAmount = 1;
    }

    move() {
        // if (this.x < width / 2 * 5) {
        //     this.x += this.speed;
        // } else {
        //     this.x = width / 2 * 5;
        //     fill(240, 255, 244, this.fade);
        //     this.fade += 2;
        //     noStroke();
        //     text("[Say 'Go' until you see the trunk]", 100, height / 2 + 50);
        //     text("[Then click to see the tree grow]", 100, height / 2 + 100);
        // }
        this.x += this.speed;
        if(this.x > 20) {
            fill(240, 255, 244, this.fade);
            this.fade += 3;
            noStroke();
            text("[Say 'Go' until you see the trunk]", width / 2 - 200, height / 2 + 50);
            text("[Then click to see the tree grow]", width / 2 - 200, height / 2 + 100);
        }

        if(this.x > width * 6.5) {
            this.x = -1000;
            this.x += this.speed;
        }

        // let xoff = 0;
        // let yoff = 0;
        // yoff += 0.05;
        // let move = map(noise(xoff, yoff), 0, 1, 500, 550);
        // xoff += 0.02;
        // yoff += 0.01;
        this.y += random(-0.25, 0.25);
    }

    show() {
        push();
        scale(0.2);
        imageMode(CENTER);
        image(kore, this.x + 200, this.y * 4.12);
        pop();

        push();
        scale(0.2);
        imageMode(CENTER);
        image(boat, this.x, this.y * 6.5);
        pop();
    }
}