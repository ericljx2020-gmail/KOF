import { AcGameObject } from "../ac_game_object/base";

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;

        this.speedx = 400;        //horizontal speed;
        this.speedy = 1000;        //vertical peed
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0,0,this.width, this.height);
    }
}