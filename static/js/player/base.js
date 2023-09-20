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
        this.speedy = -2000;        //vertical peed

        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3;        // 0: idle, 1: forward, 2: retreat, 3: jump, 4:attack, 5:attacked, 6:dead
        this.animations = new Map();
        this.frame_current_cnt = 0;
    }

    start() {

    }

    update_control() {
        let w,a,d,space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        }else{
            //another polayer control on the right side of the keyboard
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('ENTER');
        }

        if (this.status === 0 || this.status === 1) {
            //idle or moving
            if (w) {
                if (d) {
                    this.vx = this.speedx;
                }else if (a) {
                    this.vx = -this.speedx;
                }else{
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;     //jumping
            }else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            }else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            }else {
                this.status = 0;
                this.vx = 0;
                this.vy = 0;w
            }
        }
    }

    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;      //since timedelta has ms as unit, we need to / 100
        this.y += this.vy * this.timedelta / 1000;
        if (this.y >= 450) {
            this.y = 450;
            this.vy = 0;
            this.status = 0;
        }        

        if (this.x < 0) {
            this.x = 0;
        }else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update() {
        this.update_control();
        this.update_move();

        this.render();
    }

    render() {
        let status = this.status;

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            let k = this.frame_current_cnt % obj.frame_cnt;
            let image = obj.gif.frames[k];
            this.ctx.drawImage(image, this.x, this.y, image.width, image.height);
        }
    }
}