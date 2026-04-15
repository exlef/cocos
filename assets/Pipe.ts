import { _decorator, Camera, Component, Node, Vec3, screen, log, view, find, Scene } from 'cc';
const { ccclass, property } = _decorator;
import { getScreenEdgeForOrthoCam, ScreenEdge } from './Utils';
import { GameSceneManager } from './GameSceneManager';

@ccclass('Pipe')
export class Pipe extends Component {

    speedX: number = 0;
    @property width: number = 1;
    @property({ type: Camera }) cam: Camera;
    pos: Vec3;

    onLoad() {
        this.pos = this.node.getPosition();
    }

    start() {
        this.cam = GameSceneManager.instance.mainCamera;
    }

    update(deltaTime: number) {
        this.pos = this.node.getPosition();
        this.pos.x -= this.speedX * deltaTime;
        if (this.pos.x < getScreenEdgeForOrthoCam(this.cam, ScreenEdge.Left) - this.width / 2) {
            GameSceneManager.instance.pipeHandler.onPipeOutOfScreen(this);
        }
        else {
            this.node.setPosition(this.pos);
        }
    }
}

