import { checkCollision, drawRect } from "../utils.js";

class Camera {
  constructor({
    x,
    y,
    width,
    height,
    viewportWidth,
    viewportHeight,
    canvasContext,
    canvas,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // this.viewportWidth = viewportWidth;
    // this.viewportHeight = viewportHeight;

    this.context = canvasContext;
    this.canvas = canvas;

    // this.scaleWidth = this.viewportWidth / this.width;
    // this.scaleHeight = this.viewportHeight / this.height;
  }

  getCameraArea() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };
  }

  clear() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  setCameraPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getRelativePosition(object) {
    return {
      x: object.x - this.x,
      y: object.y - this.y,
      // width: object.width,
      // height: object.height,
    };
  }

  update(entities, target) {
    this.clear();

    if (target) {
      this.setCameraPosition(target.x, target.y);
    }

    // draw frame
    drawRect(
      { x: 0, y: 0, width: this.width, height: this.height },
      { isHollow: true, strokeColor: "rgba(255,255,255,0.1)" }
    );

    const sortedObjects = entities.sort((a, b) => a.y - b.y);
    sortedObjects.forEach((object) => {
      object.render();

      // const relativePosition = this.getRelativePosition(object);
      // console.log(relativePosition);
      // drawRect({ ...object, ...relativePosition }, { color: "blue" });
    });
  }
}

export default Camera;
