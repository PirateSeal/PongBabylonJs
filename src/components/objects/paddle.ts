import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "babylonjs";
import { PaddleDirection, PaddleSize } from "../enums/enums";
import { AdvancedDynamicTexture, Rectangle, TextBlock } from "babylonjs-gui";
import Game from "../../game";
import { ILabel } from "../label";

export default class Paddle {
  _body: Mesh;
  _type: number;
  _direction: PaddleDirection;
  _score: number = 0;
  _label: ILabel;
  _ctx: Game;

  constructor(paddleType: number, scene: Scene, ctx: Game) {
    this._type = paddleType;
    this._ctx = ctx;

    this._body = MeshBuilder.CreateBox(
      "Player " + this._type,
      {
        depth: PaddleSize.DEPTH,
        width: PaddleSize.WIDTH,
        height: PaddleSize.HEIGHT,
      },
      scene
    );

    let mat = new StandardMaterial("paddleMaterial", scene);
    mat.diffuseColor = new Color3(0, 0, 1);

    this._body.material = mat;

    this._body.position =
      this._type == 1 ? new Vector3(30, 0, 0) : new Vector3(-30, 0, 0);

    this._body.checkCollisions = true;

    this._direction = PaddleDirection.NONE;
    this._label = this.CreateLabel(this._body, this._ctx._texture);
  }

  CreateLabel(mesh: Mesh, texture: AdvancedDynamicTexture) {
    let label: Rectangle;
    label = new Rectangle("label for " + mesh.name);
    let text = new TextBlock();

    label.background = "black";
    label.height = "30px";
    label.alpha = 0.5;
    label.width = "250px";
    label.cornerRadius = 20;
    label.thickness = 1;
    label.linkOffsetY = 30;
    texture.addControl(label);
    label.linkWithMesh(mesh);

    text.text = mesh.name;
    text.color = "white";
    label.addControl(text);

    return { label, text };
  }

  handleEvent() {
    if (this._type == 1) {
      window.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "q":
            this._body.position.z -= 0.03;
            this._direction = PaddleDirection.LEFT;
            break;
          case "d":
            this._body.position.z += 0.03;
            this._direction = PaddleDirection.RIGHT;
            break;
          default:
            this._direction = PaddleDirection.NONE;
        }
      });
    } else if (this._type == 2) {
      window.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "j":
            this._body.position.z -= 0.03;
            this._direction = PaddleDirection.LEFT;
            break;
          case "l":
            this._body.position.z += 0.03;
            this._direction = PaddleDirection.RIGHT;
            break;
          default:
            this._direction = PaddleDirection.NONE;
        }
      });
    }
  }

  getDirection(): PaddleDirection {
    return this._direction;
  }
}
