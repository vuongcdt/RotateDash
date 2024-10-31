import { _decorator, Component, randomRangeInt } from 'cc';
import { Bubble } from './Bubble';
import { eventTarget } from './Common';
import { GAME_OVER, INIT_PROJECTILE, RESET_GAME, SET_HAS_SHOOT, SET_SCORE, HIT_BUBBLE, SHOW_GAME_OVER_SCREEN } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private _score: number = 0;

    start() {
        eventTarget.on(HIT_BUBBLE, e => this.hitBubble(e));
        eventTarget.on(GAME_OVER, e => this.setGameOver());
        eventTarget.on(RESET_GAME, e => this.reset());

        this.reset();
    }

    reset() {
        this._score = 0;
        eventTarget.emit(SET_SCORE, this._score);

        eventTarget.emit(INIT_PROJECTILE);
        eventTarget.emit(SET_HAS_SHOOT);
    }


    hitBubble(data: Bubble) {
        this.setScore();

        eventTarget.emit(SET_HAS_SHOOT);
    }

    setScore() {
        this._score++;
        eventTarget.emit(SET_SCORE, this._score);
    }

    setGameOver() {
        eventTarget.emit(SHOW_GAME_OVER_SCREEN, this._score);
    }
}


