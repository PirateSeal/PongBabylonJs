import { Mesh, Scene } from "babylonjs";
import { BallDirection } from "../enums/enums";
import Game from "../../game";
export default class Ball {
    _body: Mesh;
    _speed: number;
    _direction: BallDirection;
    _ctx: Game;
    constructor(scene: Scene, context: Game);
    update(): void;
    _move(): void;
    _checkCollision(): void;
}
