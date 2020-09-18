import { Mesh, Scene } from "babylonjs";
import Game from "../../game";
import { Vector3 } from "babylonjs/Maths/math.vector";
export default class Wall {
    _body: Mesh;
    _ctx: Game;
    constructor(scene: Scene, name: string, context: Game, dimensions: any, position: Vector3);
}
