import { _decorator, Component, Node, input, Input, EventMouse, RigidBody2D, Vec2, RigidBody, Vec3, ParticleSystem, log } from 'cc';
const { ccclass, property } = _decorator;
import { BoxCollider, ITriggerEvent } from 'cc'
import { GameSceneManager } from './GameSceneManager';

@ccclass('TestTest')
export class TestTest extends Component {

    @property
    force: number = 10;
    @property({ type: ParticleSystem })
    particleSystem: ParticleSystem;

    rb: RigidBody;
    onLoad() {
        this.rb = this.getComponent(RigidBody);
    }

    protected onEnable(): void {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    protected onDisable(): void {
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    start() {
        let collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onMouseDown(event: EventMouse) {
        this.rb.setLinearVelocity(new Vec3(0, this.force, 0));
    }

    update(deltaTime: number) {

    }

    onTriggerEnter(event: ITriggerEvent) {
        console.log('Trigger Entered with ' + event.otherCollider.node.name);
        this.particleSystem.node.setWorldPosition(this.node.worldPosition);
        this.particleSystem.play();
        this.node.active = false;
        GameSceneManager.instance.pipeHandler.onGameEnd();
        GameSceneManager.instance.onGameEnd();
    }
}

