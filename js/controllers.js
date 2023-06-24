import { STATES } from "./classes/Player.js";

const CONTROLLER = {
  LEFT: "a",
  RIGHT: "d",
  UP: "w",
  DOWN: "s",
  ENTER: "Enter",
};

export function keydownHandler(e, player) {
  // TODO refactor this
  const objX = {
    [CONTROLLER.LEFT]: -1,
    [CONTROLLER.RIGHT]: 1,
  };
  const objY = {
    [CONTROLLER.UP]: -1,
    [CONTROLLER.DOWN]: 1,
  };
  player.directionX = objX[e.key] ?? player.directionX;
  player.directionY = objY[e.key] ?? player.directionY;
}

export function keyupHandler(e, player) {
  if (e.key === CONTROLLER.LEFT || e.key === CONTROLLER.RIGHT) {
    player.directionX = 0;
  }
  if (e.key === CONTROLLER.UP || e.key === CONTROLLER.DOWN) {
    player.directionY = 0;
  }
}

export function keypressHandler(e, player) {
  if (e.key === "f") {
    player.dropItem(player.inventory[0]);
  }
  if (e.key === CONTROLLER.ENTER) {
    player.setState(STATES.ATTACKING);
  }
}
