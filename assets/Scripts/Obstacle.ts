import { _decorator, Component, Node, randomRange, tween} from 'cc';
import { eventTarget } from './Common';
import { MOVE_OBSTACLE } from './CONSTANTS';
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
        eventTarget.on(MOVE_OBSTACLE, e => this.moveBox());
    }

    moveBox() {
        const startPos = this.startPoint.position;
        this.box.position = startPos;
        this.setDuration();
        
        tween(this.box)
            .repeatForever(
                tween()
                    .to(this._duration, { position: this.endPoint.position })
                    .to(this._duration, { position: startPos })
                    .call(() => this.setDuration())
            )
            .start();
    }

    setDuration() {
        this._duration = randomRange(10, 12) / this.speed;
    }

}


