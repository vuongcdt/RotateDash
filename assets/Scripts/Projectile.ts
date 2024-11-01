import { _decorator,  Collider2D, Component, Contact2DType, IPhysics2DContact, math,  PhysicsSystem2D, tween,  Vec3 } from 'cc';
import { eventTarget } from './Common';
import { GAME_OVER, INIT_PROJECTILE, PLAY_GAME_OVER_SOUND, SHOOT, TRIGGLE_TARGET } from './CONSTANTS';
import { BoxObstacle } from './BoxObstacle';
import { Target } from './Target';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    @property
    private speedRotation: number = 1;
    @property(Vec3)
    pivot: Vec3 = new Vec3(0, 0, 0);
    @property
    radius: number = 200;

    private _angle: number = -60;
    private _dirRotation: number = -1;

    onLoad() {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        eventTarget.on(SHOOT, e => this.shootProjectile());
        eventTarget.on(INIT_PROJECTILE, e => this.init());
    }

    init() {
        this._angle = -60;
        this.startRotation();
    }

    startRotation() {
        tween(this.node)
            .repeatForever(
                tween()
                    .call(() => {
                        this._angle += this.speedRotation * this._dirRotation;
                        if (this._angle >= 360) this._angle -= 360;
                        const radian = this._angle * Math.PI / 180;
                        const x = this.pivot.x + this.radius * Math.cos(radian);
                        const y = this.pivot.y + this.radius * Math.sin(radian);

                        this.node.setPosition(x, y, this.node.position.z);
                    })
                    .delay(0)
            )
            .start();
    }

    shootProjectile() {
        this._dirRotation *= -1;
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const boxObstacle = selfCollider.getComponent(BoxObstacle);
        const target = selfCollider.getComponent(Target);

        if (boxObstacle) {
            eventTarget.emit(GAME_OVER);
            eventTarget.emit(PLAY_GAME_OVER_SOUND);
            return;
        }

        if (target) {
            eventTarget.emit(TRIGGLE_TARGET);
        }
    }

    getAngleFromVec3(vec: Vec3): number {
        const angleRadians = Math.atan2(vec.y, vec.x);
        const angleDegrees = math.toDegree(angleRadians);
        return angleDegrees;
    }
}




