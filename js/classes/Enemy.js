import Actor from "./Actor.js";
import {
  checkCollision,
  drawCircle,
  drawLine,
  getDistance,
  getVector,
  normalizeVector,
} from "../utils.js";

class Enemy extends Actor {
  constructor(
    settings = {
      x,
      y,
      width,
      height,
      players,
      followTreshold,
      attackTreshold,
      fleeTreshold,
    }
  ) {
    console.log(settings.players);
    super(settings);

    this.players = settings.players;
    this.direction = { x: 0, y: 0 };

    this.followTreshold = settings.followTreshold;
    this.attackTreshold = settings.attackTreshold;
    this.fleeTreshold = settings.fleeTreshold;
  }

  drawRaycast(player) {
    const vector = getVector(player, this);
    drawLine(player, this, { color: "violet" });
  }

  movement() {
    if (true) {
      // drawLine(this, player);
      drawCircle(
        {
          x: this.x,
          y: this.y,
          radius: this.followTreshold,
        },
        { color: "rgba(0, 255, 0, 0.1)", strokeColor: "rgba(0, 255, 0, 1)" }
      );
      drawCircle(
        {
          x: this.x,
          y: this.y,
          radius: this.attackTreshold,
        },
        { color: "rgba(255, 0, 0, 0.1)", strokeColor: "rgba(255, 0, 0, 1)" }
      );
      drawCircle(
        {
          x: this.x,
          y: this.y,
          radius: this.fleeTreshold,
        },
        {
          color: "rgba(255, 0, 255, 0.1)",
          strokeColor: "rgba(255, 0, 255, 1)",
        }
      );
    }

    // TODO select closest player
    const direction = getVector(this, this.players[0]);
    const normalized = normalizeVector(direction);
    const distanceToPlayer = getDistance(this, this.players[0]);

    if (distanceToPlayer > this.followTreshold) {
      this.directionX += normalized.x * this.speed;
      this.directionY += normalized.y * this.speed;
    }
    if (distanceToPlayer < this.fleeTreshold) {
      this.directionX -= normalized.x * this.speed;
      this.directionY -= normalized.y * this.speed;
    }
    if (distanceToPlayer < this.attackTreshold) {
      setTimeout(() => {
        // this.attack(this.players[0]);
      }, 1000);
    } else {
      this.directionX = 0;
      this.directionY = 0;
    }

    this.x += normalized.x * this.speed;
    this.y += normalized.y * this.speed;

    drawLine(
      { x: this.x + normalized.x * this.speed, y: this.y },
      this.players[0],
      { color: "red" }
    );

    // drawRect({
    //   x: this.x,
    //   y: this.y,
    //   width: hurtbox.width,
    //   height: hurtbox.height,
    // });
  }

  update() {
    if (this.checkCollision(this.players[0])) {
      this.attack(this.players[0]);
    }
    // this.movement();
    // super.update();
  }
}

export default Enemy;
