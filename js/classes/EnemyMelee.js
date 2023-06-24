import Enemy from "./Enemy.js";

class EnemyMelee extends Enemy {
  constructor({ x, y, width, height, players }) {
    super({
      x,
      y,
      width: 70,
      height: 70,
      players,
      followTreshold: 30,
      attackTreshold: 50,
      fleeTreshold: 0,
    });
  }
}

export default EnemyMelee;
