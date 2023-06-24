import { canvasContext } from "./index.js";

export function drawRect(
  { x, y, width, height },
  { color = "red", strokeColor, isHollow = false } = {}
) {
  canvasContext.beginPath();
  canvasContext.fillStyle = color;

  canvasContext.rect(x, y, width, height);

  if (!isHollow) {
    canvasContext.fill();
  }

  if (strokeColor) {
    canvasContext.strokeStyle = strokeColor || "black";
    canvasContext.lineWidth = 1;
    canvasContext.stroke();
  }
}

export function drawImage(
  image,
  { x, y, width, height },
  { spriteX = 0, spriteY = 0, spriteWidth = 0, spriteHeight = 0 } = {}
) {
  canvasContext.drawImage(
    image,
    spriteX * spriteWidth,
    spriteY * spriteHeight,
    spriteWidth,
    spriteHeight,
    x,
    y,
    width,
    height
  );
}

export function drawCircle(
  { x, y, radius },
  { color = "red", strokeColor } = {}
) {
  canvasContext.beginPath();
  canvasContext.fillStyle = color;
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fill();
  canvasContext.strokeStyle = strokeColor;
  canvasContext.stroke();
}

export function drawLine(positionA, positionB, { color } = {}) {
  canvasContext.beginPath();
  canvasContext.moveTo(positionA.x, positionA.y);
  canvasContext.lineTo(positionB.x, positionB.y);
  canvasContext.strokeStyle = color;
  canvasContext.stroke();
}
export function getVector(positionA, positionB) {
  return {
    x: positionB.x - positionA.x,
    y: positionB.y - positionA.y,
  };
}

export function normalizeVector({ x, y }) {
  const magnitude = Math.sqrt(x * x + y * y);

  if (magnitude !== 0) {
    const normalizedVector = {
      x: x / magnitude,
      y: y / magnitude,
    };

    return normalizedVector;
  }

  return { x: 0, y: 0 };
}

export function getDistance(pointA, pointB) {
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

export function checkCollision(square1, square2) {
  if (
    square1.x < square2.x + square2.width &&
    square1.x + square1.width > square2.x &&
    square1.y < square2.y + square2.height &&
    square1.y + square1.height > square2.y
  ) {
    return true;
  }

  return false;
}
