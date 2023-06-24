import { drawRect } from "../utils.js";
import { drawText } from "../utils/draw.js";
import GameObject from "./GameObject.js";

class Actor extends GameObject {
  constructor(settings) {
    super(settings);
  }

  takeDamage(damage) {
    // this.health -= damage;
    // if (this.health <= 0) {
    //   this.health = 0;
    //   this.setState(STATES.DEAD);
    // }
    drawText(
      {
        text: damage,
        x: this.x,
        y: this.y,
      },
      {
        color: "white",
        font: "30px Arial",
      }
    );

    console.log(damage);
  }

  attack(target) {
    console.log("attack", target);
    const hurtbox = {
      x: this.x - this.width / 2 + this.direction.x * this.width,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };

    drawRect(hurtbox, { color: "red" });
    /*
      Hutbox{}
      if !thisisattacking
        thisisattacking = true
      settimeout
      thisisattacking = false
      if target
        checkcollision && targetdamage
      else
        for all entities
          if entity !== this && checkcollision
            entity take damage
      ,500
    */
  } // TODO
}

export default Actor;
