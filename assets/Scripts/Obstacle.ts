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

    private _duration: number = 0;

    start() {
        this.moveBox();
    }
    
    moveBox() {
        this.setDuration();
        tween(this.box)
            .repeatForever(
                tween()
                    .to(this._duration, { position: this.endPoint.position })
                    .to(this._duration, { position: this.startPoint.position })
                    .call(()=>this.setDuration())
            )
            .start();
    }

    setDuration() {
        this._duration = randomRange(10, 15) / this.speed;
    }

}


