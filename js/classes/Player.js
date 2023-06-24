import GameObject from "./GameObject.js";
import {
  keydownHandler,
  keypressHandler,
  keyupHandler,
} from "../controllers.js";
import Item from "./Item.js";
import { drawRect, getVector, normalizeVector } from "../utils.js";
import Actor from "./Actor.js";

const playerImage = new Image();
playerImage.src = "./assets/sprites/player/facing_kitten.png";

export const STATES = {
  IDLE: "idle",
  WALKING: "walking",
  ATTACKING: "attacking",
  DEAD: "dead",
  HURT: "hurt",
};

class Player extends Actor {
  constructor({ x, y, width, heigh, scene }) {
    super({
      x,
      y,
      width: 30,
      height: 30,
      spriteWidth: 32,
      spriteHeight: 32,
      spriteScaledWidth: 60,
      spriteScaledHeight: 60,
      speed: 3,
    });

    this.lastDirection = { x: 0, y: 0 };

    this.state = STATES.IDLE;

    this.inventory = [];
    this.scene = scene;

    window.addEventListener("keydown", (e) => keydownHandler(e, this));
    window.addEventListener("keyup", (e) => keyupHandler(e, this));
    window.addEventListener("keypress", (e) => keypressHandler(e, this));
  }

  removeEventListeners() {
    window.removeEventListener("keydown", (e) => keydownHandler(e, this));
    window.removeEventListener("keyup", (e) => keyupHandler(e, this));
    window.addEventListener("keypress", (e) => keypressHandler(e, this));
  }

  setState(newState) {
    this.state = newState;
  }

  animate() {
    const { x, y } = normalizeVector({
      x: this.directionX,
      y: this.directionY,
    });

    if (x === 0 && y === 0) {
      this.setState(STATES.IDLE);
    } else {
      this.setState(STATES.WALKING);
    }

    // console.log(this.state);
  }

  pickUpItem(item) {
    this.inventory.push(item);
  }

  dropItem(item) {
    if (this.inventory.length === 0) return;

    this.scene.gameObjects.push(
      new Item({ ...item, scene: this.scene, x: this.x + 60, y: this.y })
    );
    this.inventory = this.inventory.filter((i) => i !== item);
  }

  update() {
    const hurtbox = {
      width: 30,
      height: 30,
    };
    if (true) {
      drawRect(
        {
          x: this.x - hurtbox.width / 2 + this.lastDirection.x * 30,
          y: this.y - hurtbox.height / 2 + this.lastDirection.y * 30,
          width: hurtbox.width,
          height: hurtbox.height,
        },
        {
          color: "rgba(255,255,0,0.2)",
          strokeColor: "rgba(255,255,0,0.5)",
        }
      );
    }

    this.animate();
    if (this.directionX !== 0 || this.directionY !== 0) {
      this.lastDirection = { x: this.directionX, y: this.directionY };
    }
    super.update();
  }
}

export default Player;
