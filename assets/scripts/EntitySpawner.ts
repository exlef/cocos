import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntitySpawner')
export class EntitySpawner extends Component {
    @property(Prefab) allyEntityPrefab: Prefab = null;
    @property spawnInterval: number = 2;
    timeSinceLastSpawn: number = 0;

    update(deltaTime: number) {
        this.timeSinceLastSpawn += deltaTime;
        if (this.timeSinceLastSpawn >= this.spawnInterval) {
            this.spawnEntity();
            this.timeSinceLastSpawn = 0;
        }
    }

    spawnEntity() {
        const newEntity = instantiate(this.allyEntityPrefab);
        newEntity.setPosition(Vec3.ZERO);
        this.node.addChild(newEntity);
    }
}

