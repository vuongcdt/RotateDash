import { _decorator, Component, Input, input } from 'cc';
import { eventTarget } from './Common';
import { PLAY_SHOOT_SOUND, SET_DIS_SHOOT, SET_HAS_SHOOT, SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _isHasShoot: boolean = false;

    start() {
        input.on(Input.EventType.TOUCH_END, this.onTouchStart, this);
        eventTarget.on(SET_HAS_SHOOT, e => this.setCanShoot());
        eventTarget.on(SET_DIS_SHOOT, e => this.setDisShoot());
    }

    onTouchStart() {
        if (!this._isHasShoot) {
            return;
        }

        eventTarget.emit(SHOOT);
        eventTarget.emit(PLAY_SHOOT_SOUND);
    }

    setCanShoot() {
        this._isHasShoot = true;
    }
    
    setDisShoot() {
        this._isHasShoot = false;
    }
}


