export class Boundary {
  static width = 40
  static height = 40
  constructor({ position, image }) {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.position = position
    this.width = 40
    this.height = 40
    this.image = image
  }

  draw() {

    this.ctx.drawImage(this.image, this.position.x, this.position.y)
  }

}

