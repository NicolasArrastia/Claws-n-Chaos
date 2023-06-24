import GameObject from "./GameObject.js";

class Item extends GameObject {
  constructor({ x, y, width, height, scene }) {
    super({ x, y, width, height });
    this.scene = scene;
  }

  selfRemove() {
    if (this.timeLeft <= 0) {
      this.scene.removeEntity(this);
    }
  }

  update() {
    this.selfRemove();
  }
}

export default Item;
