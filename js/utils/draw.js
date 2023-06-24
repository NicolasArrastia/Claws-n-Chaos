import { canvasContext } from "../index.js";

export function drawText({ text, x, y }, { color, font } = {}) {
  canvasContext.font = font;
  canvasContext.fillStyle = color;
  canvasContext.fillText(text, x, y);
}
