class Character {
    constructor() {
        
    }

    show() {
        push();
        scale(0.2);
        translate()
        image(sprite, width / 2 * 5, height / 2 * 6);
        pop();
    }
}