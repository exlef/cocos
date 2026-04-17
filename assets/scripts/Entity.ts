import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Entity')
export class Entity extends Component {

    @property moveSpeed: number = 10;
    private pos: Vec3 = new Vec3();

    update(deltaTime: number) {
        this.move(deltaTime);
    }

    move(deltaTime: number) {
        /*
        In Cocos Creator 3.x, this.node.getPosition() (when called with no arguments) allocates and returns a brand new Vec3.

        By using the = operator, you are throwing away your original new Vec3() (sending it to the garbage collector) and reassigning this.pos to point to the newly allocated vector.

        The Solution: "Out" Parameters
        To truly achieve zero-allocation math, Cocos Creator relies heavily on the "out" parameter pattern. You pass your cached vector into the method, and the engine populates it.
        */
        // 1. Fetch the CURRENT position into our cached vector (Zero Allocation!)
        this.node.getPosition(this.pos);

        // 2. Modify the cached vector
        this.pos.z += this.moveSpeed * deltaTime;

        // 3. Apply it back to the node
        this.node.setPosition(this.pos);
    }
}

/*
// Define this outside the class. 
// Now, 1,000 entities will share this 1 Vector, saving memory!
const tempVec3 = new Vec3(); 

@ccclass('Entity')
export class Entity extends Component {
    // ...
    move(deltaTime: number) {
        this.node.getPosition(tempVec3);
        tempVec3.z += this.moveSpeed * deltaTime;
        this.node.setPosition(tempVec3);
    }
}
*/

