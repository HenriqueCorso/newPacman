export class Player {
  constructor({ position, velocity }) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.radians = 0.75;
    this.openRate = 0.12;
    this.rotation = 0;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-this.position.x, -this.position.y);

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }

    this.radians += this.openRate;
  }
}