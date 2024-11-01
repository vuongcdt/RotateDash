import { _decorator, Component, Input, input } from 'cc';
import { eventTarget } from './Common';
import { PLAY_TOUCH_SOUND, SET_DIS_TOUCH, SET_HAS_TOUCH, TOUCH } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _isHasTouch: boolean = false;

    start() {
        input.on(Input.EventType.TOUCH_END, this.onTouchStart, this);
        eventTarget.on(SET_HAS_TOUCH, e => this.setCanTouch());
        eventTarget.on(SET_DIS_TOUCH, e => this.setDisTouch());
    }

    onTouchStart() {
        if (!this._isHasTouch) {
            return;
        }

        eventTarget.emit(TOUCH);
        eventTarget.emit(PLAY_TOUCH_SOUND);
    }

    setCanTouch() {
        this._isHasTouch = true;
    }

    setDisTouch() {
        this._isHasTouch = false;
    }
}


