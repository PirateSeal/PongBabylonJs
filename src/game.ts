import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Light,
  Scene,
  Vector3,
} from "babylonjs";
import { AdvancedDynamicTexture } from "babylonjs-gui";
import Ball from "./components/objects/ball";
import Paddle from "./components/objects/paddle";
import Wall from "./components/objects/wall";
import { HorizontalWallSize, VerticalWallSize } from "./components/enums/enums";
import { ILabel } from "./components/label";

export default class Game {
  _canvas: HTMLCanvasElement;

  _engine: Engine;

  _scene: Scene;

  _camera: ArcRotateCamera;

  _light: Light;

  _texture: AdvancedDynamicTexture;

  _ball: Ball;

  _paddle1: Paddle;

  _label1: ILabel;

  _paddle2: Paddle;

  _label2: ILabel;

  _upperWall: Wall;

  _lowerWall: Wall;

  _leftWall: Wall;

  _rightWall: Wall;

  constructor(canvasElement: string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new Scene(this._engine);

    this._camera = new ArcRotateCamera(
      "camera",
      0,
      0,
      100,
      new Vector3(0, 0, 0),
      this._scene
    );
    this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(this._canvas, false);

    this._light = new HemisphericLight(
      "light1",
      new Vector3(10, 10, 10),
      this._scene
    );

    this._rightWall = new Wall(
      this._scene,
      "rightWall",
      this,
      VerticalWallSize,
      new Vector3(0, 0, 75)
    );
    this._leftWall = new Wall(
      this._scene,
      "leftWall",
      this,
      VerticalWallSize,
      new Vector3(0, 0, -75)
    );
    this._upperWall = new Wall(
      this._scene,
      "upperWall",
      this,
      HorizontalWallSize,
      new Vector3(45, 0, 0)
    );
    this._lowerWall = new Wall(
      this._scene,
      "lowerWall",
      this,
      HorizontalWallSize,
      new Vector3(-45, 0, 0)
    );

    this._ball = new Ball(this._scene, this);
    this._texture = AdvancedDynamicTexture.CreateFullscreenUI("ui");

    this._paddle1 = new Paddle(1, this._scene, this);
    this._paddle2 = new Paddle(2, this._scene, this);

    this._scene.collisionsEnabled = true;
    this._camera.checkCollisions = true;

    this._camera.inputs.clear();

    this._scene.registerBeforeRender(() => {
      this._paddle1.handleEvent();
      this._paddle2.handleEvent();
      this._ball.update();
    });
  }

  render(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}
