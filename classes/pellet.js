export class Pellet {
  constructor({ position }) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.position = position
    this.radius = 3
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
    this.ctx.closePath()

  }
}
