class Branch {
    constructor(begin, end, maxLength) {
        this.begin = begin;
        this.end = end;
        this.finished = false;
        this.angle = random(PI / 6, PI / 3);
        this.thickness = 8;
        this.length = 2;
        this.maxLength = maxLength;

        this.branchA = function () {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.angle);
            dir.mult(0.75);
            let newEnd = p5.Vector.add(this.end, dir);
            let right = new Branch(this.end, newEnd);
            return right;
        }

        this.branchB = function () {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(-this.angle);
            dir.mult(0.75);
            let newEnd = p5.Vector.add(this.end, dir);
            let left = new Branch(this.end, newEnd);
            return left;
        }
    }

    addBranch() {
        let numberOfBranches = random(2, 7);
        let newBranches = [];
        this.begin = 2;
        this.end = 2;
        let newMaxLength = this.maxLength * random(0.6, 0.8);
        let newThickness = 0.8 * this.thickness;

        for(let i = 1; i < numberOfBranches; i++) {
            let newAngle = random(-PI / 4, PI / 4) + this.angle;
            newBranches = new Branch(newAngle, newMaxLength, newThickness);
        }
        return newBranches;
    }

    grow() {
        
    }

    drawBranch() {
        push();
        translate();
        rotate(this.angle);
        stroke();
        strokeWeight(this.thickness);
        line(0, height, 0, this.length);
        pop();
    }

    show() {
        stroke(255);
        strokeWeight(2);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
}