import { _decorator, Button, Node } from 'cc';
import { eventTarget } from '../Common';
import { RESET_GAME} from '../CONSTANTS';
import { ScreenBase } from './ScreenBase';
const { ccclass, property } = _decorator;

@ccclass('HomeScreen')
export class HomeScreen extends ScreenBase {
    @property(Node)
    private playBtn: Node;

    start() {
        super.start();
        this.playBtn.on(Button.EventType.CLICK, this.onPlayClicked, this);
    }

    onPlayClicked(){
        this.node.active = false;
        eventTarget.emit(RESET_GAME);
    }
}


