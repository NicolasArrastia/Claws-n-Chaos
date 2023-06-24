import { drawCircle, drawImage, drawRect, normalizeVector } from "../utils.js";

const defaultImage = document.getElementById("image");

// TODO invert [1] and [2], not [0]
const DEBUG_COLORS = {
  RED: ["rgb(255, 0, 0)", "rgba(255,0,0,0.1)", "rgba(255,0,0, 0.5)"],
  WHITE: [
    "rgb(255, 255, 255)",
    "rgba(255,255,255,0.1)",
    "rgba(255,255,255, 0.5)",
  ],
};

class GameObject {
  constructor({
    x,
    y,
    width,
    height,
    spriteWidth,
    spriteHeight,
    spriteScaledWidth,
    spriteScaledHeight,
    spriteOffsetY,
    spriteOffsetX,
    speed,
    image,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.directionX = 0;
    this.directionY = 0;

    this.speed = speed || 1;

    this.scale = 1;

    this.spriteWidth = spriteWidth || 32; //456 -> 60
    this.spriteHeight = spriteHeight || 32; //540
    this.spriteScaledWidth = spriteScaledWidth || this.width;
    this.spriteScaledHeight =
      spriteScaledHeight ||
      (spriteHeight * spriteScaledWidth) / spriteWidth ||
      this.height;
    this.spriteOffsetY = spriteOffsetY || 0;
    this.spriteOffsetX = spriteOffsetX || 0;

    this.image = image || defaultImage;
  }

  drawCenter() {
    drawCircle({ x: this.x, y: this.y, radius: 3 }, { color: "white" });
  }

  getHitbox(transform) {
    // if (camera) {
    //   return {
    //     x: this.x - this.width / 2 - camera.relativeX,
    //     y: this.y - this.height / 2 - camera.relativeY,
    //     width: this.width,
    //     height: this.height,
    //   };
    // }

    if (transform) {
      const trasformWidth = transform.width || 0;
      const trasformHeight = transform.height || 0;

      const transformX = transform.x + trasformWidth / 2;
      const transformY = transform.y + trasformHeight / 2;

      return {
        x: this.x - this.width / 2 + transformX,
        y: this.y - this.height / 2 + transformY,
        width: 5,
        height: 5,
      };
    }
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };
  }
  drawHitbox(camera) {
    drawRect(this.getHitbox(camera), {
      color: DEBUG_COLORS.RED[1],
      strokeColor: DEBUG_COLORS.RED[2],
    });
  }

  getSpriteArea() {
    return {
      x: this.x - this.spriteScaledWidth / 2 + this.spriteOffsetX,
      y: this.y - this.spriteScaledHeight / 2 + this.spriteOffsetY,
      width: this.spriteScaledWidth,
      height: this.spriteScaledHeight,
    };
  }
  drawSpriteArea() {
    drawRect(this.getSpriteArea(), {
      color: DEBUG_COLORS.WHITE[1],
      strokeColor: DEBUG_COLORS.WHITE[2],
    });
  }

  render(camera = {}) {
    drawImage(this.image, this.getSpriteArea(), {
      spriteX: 0,
      spriteY: 0,
      spriteWidth: this.spriteWidth,
      spriteHeight: this.spriteHeight,
    });

    this.drawHitbox();
    this.drawSpriteArea();
    this.drawCenter();
  }

  checkCollision(entity) {
    const hitbox = this.getHitbox();
    const { x, y, width, height } = entity.getHitbox();

    if (
      hitbox.x < x + width &&
      hitbox.x + hitbox.width > x &&
      hitbox.y < y + height &&
      hitbox.y + hitbox.height > y
    ) {
      drawRect(this.getHitbox(), {
        color: "rgba(0,0,0,0.5)",
        strokeColor: "rgba(255,0,0, 0.5)",
      });
      return true;
    }

    return false;
  }

  move() {
    const normalizedVector = normalizeVector({
      x: this.directionX,
      y: this.directionY,
    });

    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  }

  update() {
    this.move();
  }
}

export default GameObject;
