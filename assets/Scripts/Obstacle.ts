import { _decorator, Component, Node, randomRange, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Obstacle')
export class Obstacle extends Component {
    @property(Node)
    private box: Node;
    @property(Node)
    private startPoint: Node;
    @property(Node)
    private endPoint: Node;
    @property
    private speed: number = 5;

    private _target: Vec3 = Vec3.ZERO;
    private _boxPos: Vec3 = Vec3.ZERO;
    private _isEnd: boolean = false;
    private _duration: number = 0;

    start() {
        this._target = this.endPoint.position;
        this._duration = randomRange(50, 60);
        this._boxPos = this.box.position;
    }

    update(dt: number) {
        const distance = Vec3.distance(this._boxPos, this._target);

        if (distance < 5) {
            this._isEnd = !this._isEnd;
            this._target = this._isEnd ? this.startPoint.position : this.endPoint.position;
        }

        const direction = this._target.clone().subtract(this._boxPos).normalize();
        this.box.position = this._boxPos.add(direction.multiplyScalar(dt * this.speed * this._duration));
    }
}


