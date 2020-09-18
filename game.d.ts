import { ArcRotateCamera, Engine, Light, Scene } from "babylonjs";
import { AdvancedDynamicTexture } from "babylonjs-gui";
import Ball from "./components/objects/ball";
import Paddle from "./components/objects/paddle";
import Wall from "./components/objects/wall";
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
    constructor(canvasElement: string);
    createScene(): void;
    render(): void;
}
