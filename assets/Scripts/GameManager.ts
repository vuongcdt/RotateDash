import { _decorator, Component, Node, Tween } from 'cc';
import { eventTarget } from './Common';
import { GAME_OVER, INIT_PROJECTILE, MOVE_OBSTACLE, RESET_GAME, SET_DIS_TOUCH, SET_HAS_TOUCH, SET_SCORE, SHOW_GAME_OVER_SCREEN, TRIGGLE_TARGET } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    private targeUp: Node;
    @property(Node)
    private targeDown: Node;

    private _isUp: boolean = true;
    private _score: number = 0;

    start() {
        eventTarget.on(TRIGGLE_TARGET, e => this.triggleTarget());
        eventTarget.on(GAME_OVER, e => this.setGameOver());
        eventTarget.on(RESET_GAME, e => this.reset());

        this.targeDown.active = false;
    }

    reset() {
        this._score = 0;
        eventTarget.emit(SET_SCORE, this._score);
        eventTarget.emit(SET_HAS_TOUCH);

        setTimeout(() => {
            eventTarget.emit(INIT_PROJECTILE);
            eventTarget.emit(MOVE_OBSTACLE);
        }, 0);
    }

    triggleTarget() {
        this._isUp = !this._isUp;
        setTimeout(() => {
            this.targeDown.active = !this._isUp;
            this.targeUp.active = this._isUp;
            this.setScore();
        }, 0);
    }

    setScore() {
        this._score++;
        eventTarget.emit(SET_SCORE, this._score);
    }

    setGameOver() {
        Tween.stopAll();
        eventTarget.emit(SET_DIS_TOUCH);
        
        setTimeout(() => {
            eventTarget.emit(SHOW_GAME_OVER_SCREEN, this._score);
        }, 500);
    }
}


