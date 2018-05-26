const CANVAS_HEIGHT = 606;
const CANVAS_WIDTH = 505;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.rate = Math.random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=  200 * dt + this.rate * 200 * dt;
    if (this.x >  550){
        this.x = -10;
        this.rate = Math.random();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor() {
        this.x = CANVAS_WIDTH - 303;
        this.y = CANVAS_HEIGHT - 200;
        this.sprite = 'images/char-boy.png';
    }
    //Handles winning
    update() {
        if (this.y < 0){
            window.alert('Winner! Press ok to go again.');
            this.y = CANVAS_HEIGHT - 200;
            this.x = CANVAS_WIDTH - 303;
            document.querySelector('#win').textContent = Engine();
        }
        else if (this.y > 406){
            this.y = CANVAS_HEIGHT - 200;
        }
        else if (this.x < 0 ){
            this.x = 0;
        }
        else if (this.x > 404){
            this.x = 404;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //Handles user input
    handleInput(movement){
        switch (movement){
            case 'left':
                this.x -= 101;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'right':
                this.x += 101;
                break;
            case 'down':
                this.y += 83;
                break;
            defaut:
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60),new Enemy(0,143), new Enemy(0, 226)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
