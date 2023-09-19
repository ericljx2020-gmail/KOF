import { AcGameObject } from "/static/js/ac_game_object/base.js";

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;

        this.direction = 1;

        this.speedx = 400;        //horizontal speed;
        this.speedy = 1000;        //vertical peed

        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.status = 3;        // 0: idle, 1: forward, 2: retreat, 3: jump, 4:attack, 5:attacked, 6:dead
    }

    start() {

    }

    move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;      //since timedelta has ms as unit, we need to / 100
        this.y += this.vy * this.timedelta / 1000;
        if (this.y >= 550) {
            this.y = 550;
        }        
    }

    update() {
        this.move();

        this.render();
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width, this.height);
    }
}