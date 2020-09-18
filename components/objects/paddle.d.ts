import { Mesh, Scene } from "babylonjs";
import { PaddleDirection } from "../enums/enums";
import { AdvancedDynamicTexture, Rectangle, TextBlock } from "babylonjs-gui";
import Game from "../../game";
export default class Paddle {
    _body: Mesh;
    _type: number;
    _direction: PaddleDirection;
    _score: number;
    _label: Object;
    _ctx: Game;
    constructor(paddleType: number, scene: Scene, ctx: Game);
    CreateLabel(mesh: Mesh, texture: AdvancedDynamicTexture): {
        label: Rectangle;
        text: TextBlock;
    };
    handleEvent(): void;
    getDirection(): PaddleDirection;
}
