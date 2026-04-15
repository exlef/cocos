import { _decorator, Camera, Component, Node, director } from 'cc';
import { PipeHandler } from './PipeHandler';
import { TestTest } from './TestTest';
const { ccclass, property } = _decorator;

@ccclass('GameSceneManager')
export class GameSceneManager extends Component {
    public static instance: GameSceneManager = null;

    @property({ type: Camera }) mainCamera: Camera;
    @property({ type: PipeHandler }) pipeHandler: PipeHandler;
    @property({ type: TestTest }) playerNode: TestTest;
    @property({ type: Node }) gameStartScreen: Node;
    @property({ type: Node }) gameOverScreen: Node;
    onLoad() {
        GameSceneManager.instance = this;
    }

    onDestroy() {
        if (GameSceneManager.instance === this) {
            GameSceneManager.instance = null;
        }
    }

    start() {

    }

    update(deltaTime: number) {

    }

    public onGameStart() {
        for (const pipe of this.pipeHandler.pipes) {
            pipe.speedX = 3; // Start moving the pipes to the left
        }
        this.playerNode.getComponent('cc.RigidBody').enabled = true; // Enable physics for the player
        this.gameStartScreen.active = false; // Hide the game start screen
    }

    public onGameEnd() {
        this.gameOverScreen.active = true; // Show the game over screen
    }

    public onGameRestart() {
        director.loadScene('game-scene');
    }

    public onCTAButtonClick() {
        // The plugin usually exposes a global function for the store redirect
        // Use @ts-ignore to prevent TypeScript compilation errors

        //@ts-ignore
        if (typeof window !== "undefined" && window.install) {
            //@ts-ignore
            window.install();
        } else {
            console.log("Store redirect triggered (Development Mode)");
        }
    }
}

