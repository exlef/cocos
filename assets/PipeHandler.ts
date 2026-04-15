import { _decorator, BoxCollider, Component, instantiate, Node, Prefab, randomRange, RigidBody, Vec3 } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;
import { getScreenEdgeForOrthoCam, ScreenEdge } from './Utils';
import { GameSceneManager } from './GameSceneManager';

@ccclass('PipeHandler')
export class PipeHandler extends Component {
    @property pipeCount = 12;
    @property pipeSpacing = 3;
    @property pipeHeightRange = 3;
    @property startSpacing = 5;
    @property({ type: Prefab }) pipePrefab: Prefab;
    pipes: Pipe[] = [];

    start() {

        let pos = new Vec3();
        const cam = GameSceneManager.instance.mainCamera;
        const rightEdge = getScreenEdgeForOrthoCam(cam, ScreenEdge.Right);
        for (let i = 0; i < this.pipeCount; i++) {
            const pipeNode = instantiate(this.pipePrefab);
            const pipe = pipeNode.getComponent(Pipe);

            pos.x = i * this.pipeSpacing + rightEdge + pipe.width / 2 + this.startSpacing;
            pos.y = randomRange(-this.pipeHeightRange, this.pipeHeightRange);
            pipeNode.setPosition(pos);

            this.node.addChild(pipeNode);
            this.pipes.push(pipe);
        }
    }

    update(deltaTime: number) {

    }

    public onPipeOutOfScreen(pipe: Pipe) {
        const lastPipe = this.pipes[this.pipes.length - 1];
        const lastPipePos = lastPipe.node.getPosition();
        const newX = lastPipePos.x + this.pipeSpacing;

        let newY = randomRange(-this.pipeHeightRange, this.pipeHeightRange);

        pipe.node.setPosition(new Vec3(newX, newY, pipe.node.getPosition().z));

        // Move the pipe to the end of the array
        this.pipes.push(this.pipes.shift());
    }

    onGameEnd() {
        for (const pipe of this.pipes) {
            pipe.speedX = 0;
        }
    }
}

