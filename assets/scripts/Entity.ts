import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const tempVec3 = new Vec3();

@ccclass('Entity')
export class Entity extends Component {

    @property moveSpeed: number = 10;

    update(deltaTime: number) {
        this.move(deltaTime);
    }

    move(deltaTime: number) {
        this.node.getPosition(tempVec3);
        tempVec3.z += this.moveSpeed * deltaTime;
        this.node.setPosition(tempVec3);
    }
}
