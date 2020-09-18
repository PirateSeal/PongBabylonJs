import {MeshBuilder, Mesh, Scene, StandardMaterial, Color3} from "babylonjs";
import Game from "../../game";
import {Vector3} from "babylonjs/Maths/math.vector";

export default class Wall {
    _body: Mesh;
    _ctx: Game;

    constructor(scene: Scene, name: string, context: Game, dimensions, position: Vector3) {
        this._ctx = context

        this._body = MeshBuilder.CreateBox(name, {
            depth: dimensions.DEPTH,
            width: dimensions.WIDTH,
            height: dimensions.HEIGHT,
        }, scene);

        let mat = new StandardMaterial('wallMaterial', scene);
        mat.diffuseColor = new Color3(1, 0, 0);

        this._body.material = mat;

        this._body.position = position;

        this._body.checkCollisions = true;
    }
};
