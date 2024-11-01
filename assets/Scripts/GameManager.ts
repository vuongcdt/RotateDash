import { _decorator, Component, Node, randomRangeInt } from 'cc';
import { Bubble } from './Bubble';
import { eventTarget } from './Common';
import { GAME_OVER, INIT_PROJECTILE, RESET_GAME, SET_HAS_SHOOT, SET_SCORE, HIT_BUBBLE, SHOW_GAME_OVER_SCREEN, TRIGGLE_TARGET } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    private targeUp: Node;
    @property(Node)
    private targeDown: Node;

    private _isUp: boolean = false;
    private _score: number = 0;



    start() {
        eventTarget.on(TRIGGLE_TARGET, () => this.triggleTarget());
        eventTarget.on(GAME_OVER, e => this.setGameOver());
        eventTarget.on(RESET_GAME, e => this.reset());

        this.targeUp.active = false;
        this.reset();
    }

    reset() {
        this._score = 0;
        eventTarget.emit(SET_SCORE, this._score);

        eventTarget.emit(INIT_PROJECTILE);
        eventTarget.emit(SET_HAS_SHOOT);
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
        eventTarget.emit(SHOW_GAME_OVER_SCREEN, this._score);
    }
}


