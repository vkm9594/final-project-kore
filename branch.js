class Branch {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
        this.finished = false;

        this.branchA = function () {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(random(PI / 6, PI / 4));
            dir.mult(0.75);
            let newEnd = p5.Vector.add(this.end, dir);
            let right = new Branch(this.end, newEnd);
            return right;
        }

        this.branchB = function () {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(random(-PI / 6, -PI / 4));
            dir.mult(0.75);
            let newEnd = p5.Vector.add(this.end, dir);
            let left = new Branch(this.end, newEnd);
            return left;
        }
    }

    // mousePressed() { //testing
    //     if (mouseIsPressed == true) {
    //         stroke(255);
    //         strokeWeight(4);
    //         line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    //     } 
    // }

    update() {

    }

    show() {
        stroke(255);
        strokeWeight(4);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
}