let bird;
let pipes = [];
let gameover = false;
let bgColor;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  bgColor = color(0);
}

function draw() {
  background(bgColor);

  if (!gameover) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        gameover = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        bgColor = color(random(255), random(255), random(255));
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 75 == 0) {
      pipes.push(new Pipe());
    }
  }

  if (gameover) {
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255);
    text('Game Over', width / 2, height / 2);
    textSize(32);
    text('Click to Restart', width / 2, height / 2 + 50);
  }
}

function mousePressed() {
  if (gameover) {
    resetGame();
  } else {
    bird.up();
  }
}

function resetGame() {
  gameover = false;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  bgColor = color(0);
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.spacing = 150;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 40;
    this.speed = 3;
  }

  hits(bird) {
    return bird.y < this.top || bird.y > height - this.bottom ? bird.x > this.x && bird.x < this.x + this.w : false;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }
}

