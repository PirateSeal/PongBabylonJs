import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "babylonjs";
import { BallDirection, PaddleDirection } from "../enums/enums";
import Game from "../../game";

export default class Ball {
  _body: Mesh;
  _speed: number;
  _direction: BallDirection;
  _ctx: Game;

  constructor(scene: Scene, context: Game) {
    this._ctx = context;

    this._body = MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 6,
        updatable: true,
      },
      scene
    );

    let mat = new StandardMaterial("ballMaterial", scene);
    mat.diffuseColor = new Color3(1, 0, 0);
    this._body.position = new Vector3(0, 0, 0);

    this._body.material = mat;

    this._speed = 0.5;
    this._direction = 1;

    this._body.checkCollisions = true;
  }

  update() {
    this._move();
    this._checkCollision();
  }

  _move() {
    switch (this._direction) {
      case BallDirection.DOWN:
        this._body.position.x += this._speed;
        break;
      case BallDirection.UP:
        this._body.position.x -= this._speed;
        break;
      case BallDirection.L_DOWN:
        this._body.position.x += this._speed;
        this._body.position.z -= this._speed;
        break;
      case BallDirection.R_DOWN:
        this._body.position.x += this._speed;
        this._body.position.z += this._speed;
        break;
      case BallDirection.L_UP:
        this._body.position.x -= this._speed;
        this._body.position.z -= this._speed;
        break;
      case BallDirection.R_UP:
        this._body.position.x -= this._speed;
        this._body.position.z += this._speed;
        break;
    }
  }

  _checkCollision() {
    this._speed += 0.0001;
    if (this._body.intersectsMesh(this._ctx._paddle1._body, false)) {
      if (this._ctx._paddle1.getDirection() == PaddleDirection.NONE) {
        this._direction = BallDirection.UP;
      } else if (this._ctx._paddle1.getDirection() == PaddleDirection.LEFT) {
        this._direction = BallDirection.L_UP;
      } else if (this._ctx._paddle1.getDirection() == PaddleDirection.RIGHT) {
        this._direction = BallDirection.R_UP;
      }
    }
    if (this._body.intersectsMesh(this._ctx._paddle2._body, false)) {
      if (this._ctx._paddle2.getDirection() == PaddleDirection.NONE) {
        this._direction = BallDirection.DOWN;
      } else if (this._ctx._paddle2.getDirection() == PaddleDirection.LEFT) {
        this._direction = BallDirection.L_DOWN;
      } else if (this._ctx._paddle2.getDirection() == PaddleDirection.RIGHT) {
        this._direction = BallDirection.R_DOWN;
      }
    }
    if (this._body.intersectsMesh(this._ctx._leftWall._body, false)) {
      if (this._direction == BallDirection.L_DOWN) {
        this._direction = BallDirection.R_DOWN;
      } else if (this._direction == BallDirection.L_UP) {
        this._direction = BallDirection.R_UP;
      }
    }
    if (this._body.intersectsMesh(this._ctx._rightWall._body, false)) {
      if (this._direction == BallDirection.R_DOWN) {
        this._direction = BallDirection.L_DOWN;
      } else if (this._direction == BallDirection.R_UP) {
        this._direction = BallDirection.L_UP;
      }
    }
    if (this._body.intersectsMesh(this._ctx._lowerWall._body, false)) {
      this._body.position = new Vector3(0, 0, 0);
      this._ctx._paddle1._score++;
      this._ctx._paddle1._label.text.text =
        "score : " + this._ctx._paddle1._score;
    }
    if (this._body.intersectsMesh(this._ctx._upperWall._body, false)) {
      this._body.position = new Vector3(0, 0, 0);
      this._ctx._paddle2._score++;
      this._ctx._paddle2._label.text.text =
        "score : " + this._ctx._paddle2._score;
    }
  }
}
