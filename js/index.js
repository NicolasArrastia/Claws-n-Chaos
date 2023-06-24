import Camera from "./classes/Camera.js";
import Enemy from "./classes/Enemy.js";
import EnemyMelee from "./classes/EnemyMelee.js";
import GameObject from "./classes/GameObject.js";
import Item from "./classes/Item.js";
import Player from "./classes/Player.js";
import { FPS } from "./constants.js";
import {
  checkCollision,
  drawCircle,
  drawImage,
  drawLine,
  drawRect,
} from "./utils.js";

const canvas = document.getElementById("canvas");
export const canvasContext = canvas.getContext("2d");

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;
// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth - 2;
//   canvas.height = window.innerHeight - 2;
// });

// remove blur
canvasContext.imageSmoothingEnabled = false;

class Scene {
  constructor() {
    // this.camera = new Camera(0, 0, 500, 500);
    this.players = [new Player({ x: 100, y: 100, scene: this })];
    this.gameObjects = [
      new Item({
        x: 400,
        y: 100,
        width: 30,
        height: 30,
        scene: this,
      }),
      // new Item({
      //   x: 300,
      //   y: 500,
      //   width: 30,
      //   height: 30,
      //   scene: this,
      // }),
      new EnemyMelee({
        x: 300,
        y: 300,
        width: 30,
        height: 30,
        players: this.players,
      }),
    ];
    this.camera = new Camera({
      x: 200,
      y: 200,
      width: 400,
      height: 400,
      viewportWidth: canvas.width,
      viewportHeight: canvas.height,
      canvasContext,
      canvas,
    });
  }

  removeEntity(entity) {
    if (entity instanceof GameObject) {
      this.gameObjects = this.gameObjects.filter(
        (gameObject) => gameObject !== entity
      );
    } else if (entity instanceof Player) {
      this.players = this.players.filter((player) => player !== entity);
    }
  }

  update() {
    const allEntities = [...this.gameObjects, ...this.players];
    this.camera.update(allEntities);

    //
    this.gameObjects.forEach((gameObject) => {
      gameObject.update();
    });

    this.players.forEach((player) => {
      player.update();

      this.gameObjects.forEach((gameObject) => {
        if (gameObject instanceof Item && checkCollision(player, gameObject)) {
          player.pickUpItem(gameObject);
          this.removeEntity(gameObject);
        }
      });
    });

    // return middle point of line
    // function getMiddlePoint(pointA, pointB) {
    //   return {
    //     x: (pointA.x + pointB.x) / 2,
    //     y: (pointA.y + pointB.y) / 2,
    //   };
    // }

    // const getMiddlePointOfPlayers = (players) => {
    //   const middlePoint = players.reduce(
    //     (acc, player) => {
    //       return {
    //         x: acc.x + player.x,
    //         y: acc.y + player.y,
    //       };
    //     },
    //     { x: 0, y: 0 }
    //   );
    //   return {
    //     x: middlePoint.x / players.length,
    //     y: middlePoint.y / players.length,
    //   };
    // };

    // drawtriangle from players
    this.players.forEach((player, index) => {
      this.players[index + 1]
        ? drawLine(player, this.players[index + 1], { color: "white" })
        : drawLine(player, this.players[0], { color: "white" });
    });

    // drawLine(this.players[0], this.gameObjects[0], { color: "red" });
    // const firstMiddlePoint = getMiddlePoint(
    //   this.players[0],
    //   this.gameObjects[0]
    // );

    // drawCircle({...firstMiddlePoint, radius:2}, { color: "white" });
    // drawCircle(
    //   { ...getMiddlePoint(firstMiddlePoint, this.gameObjects[1]), radius: 2 },
    //   { color: "white" }
    // );

    // console.log(getMiddlePointOfPlayers(this.players));
    // drawCircle(
    //   { ...getMiddlePointOfPlayers(this.players), radius: 5 },
    //   { color: "rgba(0,255,255,0.5)" }
    // );

    // console.log(
    //   this.players[0].inventory,
    //   this.gameObjects[0] ? this.gameObjects[0].timeLeft : 0
    // );
  }
}

const scene = new Scene();

function gameLoop() {
  scene.update();
}

setInterval(() => {
  gameLoop();
}, 1000 / FPS);
