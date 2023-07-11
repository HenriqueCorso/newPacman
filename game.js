import { Player } from './classes/player.js';
import { Boundary } from './classes/boundary.js';
import { Ghost } from './classes/ghost.js';
import { Pellet } from './classes/pellet.js';
import { PowerUp } from './classes/powerUp.js';
import { Map, Map2 } from './map.js';


export class Game {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.scoreEL = document.querySelector('#scoreEl');
    this.score = 0;
    this.lastKey = '';
    this.animationId = null;
    this.map = Map;
    this.pellets = [];
    this.boundaries = [];
    this.powerUps = [];
    this.ghosts = [];
    this.player = null;
    this.keys = {
      w: {
        pressed: false
      },
      a: {
        pressed: false
      },
      s: {
        pressed: false
      },
      d: {
        pressed: false
      }
    };

    this.createImage = this.createImage.bind(this);
    this.circleCollidesWithRectangle = this.circleCollidesWithRectangle.bind(this);
    this.animate = this.animate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.init();
  }

  init() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.map = Map; // Load initial map (Map)

    this.createBoundaries();
    this.createPellets();
    this.createPowerUps();
    this.createGhosts();
    this.createPlayer();

    addEventListener('keydown', this.handleKeyDown);
    addEventListener('keyup', this.handleKeyUp);

    this.animate();
  }

  createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
  }

  circleCollidesWithRectangle({ circle, rectangle }) {
    const padding = Boundary.width / 2 - circle.radius - 1;
    return (
      circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
      circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
      circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
    );
  }

  createBoundaries() {
    this.map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case '-':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeHorizontal.png')
              })
            );
            break;
          case '|':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeVertical.png')
              })
            );
            break;
          case '1':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeCorner1.png')
              })
            );
            break;
          case '2':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeCorner2.png')
              })
            );
            break;
          case '3':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeCorner3.png')
              })
            );
            break;
          case '4':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/pipeCorner4.png')
              })
            );
            break;
          case 'b':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage('./img/block.png')
              })
            );
            break;
          case '[':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/capLeft.png')
              })
            );
            break;
          case ']':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/capRight.png')
              })
            );
            break;
          case '_':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/capBottom.png')
              })
            );
            break;
          case '^':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/capTop.png')
              })
            );
            break;
          case '+':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/pipeCross.png')
              })

            );
            break;
          case '5':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage('./img/pipeConnectorTop.png')
              })
            );
            break;
          case '6':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage('./img/pipeConnectorRight.png')
              })
            );
            break;
          case '7':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage('./img/pipeConnectorBottom.png')
              })
            );
            break;
          case '8':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage('./img/pipeConnectorLeft.png')
              })
            );
            break;
          case '.':
            this.pellets.push(
              new Pellet({
                position: {
                  x: j * Boundary.width + Boundary.width / 2,
                  y: i * Boundary.height + Boundary.height / 2
                }
              })
            );
            break;
          case 'p':
            this.powerUps.push(
              new PowerUp({
                position: {
                  x: j * Boundary.width + Boundary.width / 2,
                  y: i * Boundary.height + Boundary.height / 2
                }
              })
            );
            break;
        }
      });
    });
  }

  createGhosts() {
    this.ghosts.push(
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height + Boundary.height / 2
        },
        velocity: {
          x: Ghost.speed,
          y: 0
        }
      }),
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 3 + Boundary.height / 2
        },
        velocity: {
          x: Ghost.speed,
          y: 0
        },
        color: 'green'
      }),
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 7 + Boundary.height / 2
        },
        velocity: {
          x: Ghost.speed,
          y: 0
        },
        color: 'orange'
      })
    );
  }

  createPlayer() {
    this.player = new Player({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
      },
      velocity: {
        x: 0,
        y: 0
      }
    });
  }

  createPellets() {
    this.map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === '.') {
          this.pellets.push(
            new Pellet({
              position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2
              }
            })
          );
        }
      });
    });
  }

  createPowerUps() {
    this.map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 'p') {
          this.powerUps.push(
            new PowerUp({
              position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2
              }
            })
          );
        }
      });
    });
  }

  handlePlayerMovement() {
    if (this.keys.w.pressed && this.lastKey === 'w') {
      for (let i = 0; i < this.boundaries.length; i++) {
        const boundary = this.boundaries[i];
        if (
          this.circleCollidesWithRectangle({
            circle: {
              ...this.player,
              velocity: {
                x: 0,
                y: -5
              }
            },
            rectangle: boundary
          })
        ) {
          this.player.velocity.y = 0;
          break;
        } else {
          this.player.velocity.y = -5;
        }
      }
    } else if (this.keys.a.pressed && this.lastKey === 'a') {
      for (let i = 0; i < this.boundaries.length; i++) {
        const boundary = this.boundaries[i];
        if (
          this.circleCollidesWithRectangle({
            circle: {
              ...this.player,
              velocity: {
                x: -5,
                y: 0
              }
            },
            rectangle: boundary
          })
        ) {
          this.player.velocity.x = 0;
          break;
        } else {
          this.player.velocity.x = -5;
        }
      }
    } else if (this.keys.s.pressed && this.lastKey === 's') {
      for (let i = 0; i < this.boundaries.length; i++) {
        const boundary = this.boundaries[i];
        if (
          this.circleCollidesWithRectangle({
            circle: {
              ...this.player,
              velocity: {
                x: 0,
                y: 5
              }
            },
            rectangle: boundary
          })
        ) {
          this.player.velocity.y = 0;
          break;
        } else {
          this.player.velocity.y = 5;
        }
      }
    } else if (this.keys.d.pressed && this.lastKey === 'd') {
      for (let i = 0; i < this.boundaries.length; i++) {
        const boundary = this.boundaries[i];
        if (
          this.circleCollidesWithRectangle({
            circle: {
              ...this.player,
              velocity: {
                x: 5,
                y: 0
              }
            },
            rectangle: boundary
          })
        ) {
          this.player.velocity.x = 0;
          break;
        } else {
          this.player.velocity.x = 5;
        }
      }
    }
  }


  animate() {
    this.animationId = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.handlePlayerMovement();

    this.handleGhostPlayerCollision();
    this.handleWinCondition();
    this.handlePowerUps();
    this.handlePelletCollection();
    this.drawBoundaries();
    this.player.update();
    this.ghosts.forEach(ghost => {
      ghost.update();
      this.handleGhostBoundaryCollision(ghost);
    });

    if (this.player.velocity.x > 0) this.player.rotation = 0;
    else if (this.player.velocity.x < 0) this.player.rotation = Math.PI;
    else if (this.player.velocity.y > 0) this.player.rotation = Math.PI / 2;
    else if (this.player.velocity.y < 0) this.player.rotation = Math.PI * 1.5;
  }


  handleGhostBoundaryCollision(ghost) {
    const collisions = [];
    this.boundaries.forEach(boundary => {
      if (
        !collisions.includes('right') &&
        this.circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: ghost.speed,
              y: 0
            }
          },
          rectangle: boundary
        })
      ) {
        collisions.push('right');
      }

      if (
        !collisions.includes('left') &&
        this.circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: -ghost.speed,
              y: 0
            }
          },
          rectangle: boundary
        })
      ) {
        collisions.push('left');
      }

      if (
        !collisions.includes('up') &&
        this.circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: 0,
              y: -ghost.speed
            }
          },
          rectangle: boundary
        })
      ) {
        collisions.push('up');
      }

      if (
        !collisions.includes('down') &&
        this.circleCollidesWithRectangle({
          circle: {
            ...ghost,
            velocity: {
              x: 0,
              y: ghost.speed
            }
          },
          rectangle: boundary
        })
      ) {
        collisions.push('down');
      }
    });

    if (collisions.length > ghost.prevCollisions.length) {
      ghost.prevCollisions = collisions;
    }

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) ghost.prevCollisions.push('right');
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left');
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up');
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down');

      const pathways = ghost.prevCollisions.filter(collision => {
        return !collisions.includes(collision);
      });

      const direction = pathways[Math.floor(Math.random() * pathways.length)];

      switch (direction) {
        case 'down':
          ghost.velocity.y = ghost.speed;
          ghost.velocity.x = 0;
          break;
        case 'up':
          ghost.velocity.y = -ghost.speed;
          ghost.velocity.x = 0;
          break;
        case 'right':
          ghost.velocity.y = 0;
          ghost.velocity.x = ghost.speed;
          break;
        case 'left':
          ghost.velocity.y = 0;
          ghost.velocity.x = -ghost.speed;
          break;
      }

      ghost.prevCollisions = [];
    }
  }

  handleGhostPlayerCollision() {
    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      const ghost = this.ghosts[i];

      if (
        Math.hypot(ghost.position.x - this.player.position.x, ghost.position.y - this.player.position.y) <
        ghost.radius + this.player.radius
      ) {
        if (ghost.scared) {
          this.ghosts.splice(i, 1);
          this.score += 50;
          this.scoreEL.innerHTML = this.score;

        } else {
          cancelAnimationFrame(this.animationId);
          alert('YOU LOSE');
          location.reload();
        }
      }
    }
  }

  loadMap(map) {
    this.map = map;
    this.boundaries = [];
    this.pellets = [];
    this.powerUps = [];
    this.ghosts = [];
    this.player = null;

    this.createBoundaries();
    this.createPellets();
    this.createPowerUps();
    this.createGhosts();
    this.createPlayer();
  }

  handleWinCondition() {
    if (this.pellets.length === 0) {
      if (this.map === Map) {
        alert('Congratulations! Level 1 completed!');
        this.loadMap(Map2);
      } else if (this.map === Map2) {
        alert('Congratulations! Level 2 completed!');
        // Add further levels or game completion logic here
      }
    }
  }

  handlePowerUps() {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const powerUp = this.powerUps[i];
      powerUp.draw();

      if (
        Math.hypot(powerUp.position.x - this.player.position.x, powerUp.position.y - this.player.position.y) <
        powerUp.radius + this.player.radius
      ) {
        this.powerUps.splice(i, 1);

        this.ghosts.forEach(ghost => {
          ghost.scared = true;

          setTimeout(() => {
            ghost.scared = false;
          }, 5000);
        });
      }
    }
  }

  handlePelletCollection() {
    for (let i = this.pellets.length - 1; i >= 0; i--) {
      const pellet = this.pellets[i];
      pellet.draw();

      if (
        Math.hypot(pellet.position.x - this.player.position.x, pellet.position.y - this.player.position.y) <
        pellet.radius + this.player.radius
      ) {
        this.pellets.splice(i, 1);
        this.score += 5;
        this.scoreEL.innerHTML = this.score;
      }
    }
  }

  drawBoundaries() {
    this.boundaries.forEach(boundary => {
      boundary.draw();

      if (
        this.circleCollidesWithRectangle({
          circle: this.player,
          rectangle: boundary
        })
      ) {
        this.player.velocity.y = 0;
        this.player.velocity.x = 0;
      }
    });
  }

  handleKeyDown(event) {
    const { key } = event;
    switch (key) {
      case 'w':
        this.keys.w.pressed = true;
        this.lastKey = 'w';
        break;
      case 'a':
        this.keys.a.pressed = true;
        this.lastKey = 'a';
        break;
      case 's':
        this.keys.s.pressed = true;
        this.lastKey = 's';
        break;
      case 'd':
        this.keys.d.pressed = true;
        this.lastKey = 'd';
        break;
    }
  }

  handleKeyUp(event) {
    const { key } = event;
    switch (key) {
      case 'w':
        this.keys.w.pressed = false;
        break;
      case 'a':
        this.keys.a.pressed = false;
        break;
      case 's':
        this.keys.s.pressed = false;
        break;
      case 'd':
        this.keys.d.pressed = false;
        break;
    }
  }
}

