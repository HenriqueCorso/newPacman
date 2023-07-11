export class Ghost {
  static speed = 2;

  constructor({ position, velocity, color = 'red' }) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
    this.prevCollisions = [];
    this.speed = 2;
    this.scared = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.scared ? 'blue' : this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
