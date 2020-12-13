class Branch {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.angle = random(PI / 6, PI / 4);
        this.thickness = 10;
        this.grow = 2;
    }

    show() {
        stroke(255);
        strokeWeight(this.thickness);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branchA() {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(this.angle);
        dir.mult(0.75);
        let newEnd = p5.Vector.add(this.end, dir);
        let right = new Branch(this.end, newEnd);
        return right;
    }

    branchB() {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-this.angle);
        dir.mult(0.75);
        let newEnd = p5.Vector.add(this.end, dir);
        let left = new Branch(this.end, newEnd);
        return left;
    }
}