const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 700;

const gravity = 0.5;

const cat = {
    x : 0,
    y : 600,
    vx : 5,
    vy : 5,
    width : 30,
    height : 30,
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 40;
    }
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let sit = false; //사각형 절반 할래말래
let isJumping = false; //점프 중임?
let leftarrow = false;
let rightarrow = false;
let lastDirection = 0;

/**스페이스 누르면 사각형 절반으로 */
document.addEventListener("keydown", function(e) {
    e.preventDefault();
    if (e.key === " " && !sit && !isJumping) {
        cat.height = 15;
        cat.y += cat.height;
        sit = true;
    }
    if (e.key === "ArrowLeft")  {
        if(!isJumping) lastDirection = -1;
        leftarrow = true;
        rightarrow = false;
    }
    if (e.key === "ArrowRight") {
        if (!isJumping) lastDirection = 1;
        rightarrow = true;
        leftarrow = false;
    }
});

/**스페이스 때면 사각형 원래대로 */
document.addEventListener("keyup", function(e) {
    if (e.key === " " && !isJumping) {
        cat.y -= cat.height;
        cat.height = 30;
        sit = false;
        isJumping = true;
    }
    if (e.key === "ArrowLeft") {
        leftarrow = false;

    }
    if (e.key === "ArrowRight") {
        rightarrow = false;
    }
});

let timer = 0;

function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (sit) {
        timer++;
        leftarrow = false;
        rightarrow = false;
    }else {
        if (timer !== 0) {
            cat.vy = timer/10+1.5;
            cat.vx = timer/20+1.5;
            if (timer/10 > 10) {
                cat.vy = 11;
                cat.vx = 7;
            }
        }
        timer = 0;
    }

    if (isJumping) {
        if (lastDirection === -1) cat.x -= cat.vx;
        if (lastDirection === 1) cat.x += cat.vx;
        cat.vy -= gravity;
        cat.y -= cat.vy;
    }

    /**바닥에 있으면 점프 안하는중임으로 */
    if (cat.y >= 600) {
        isJumping = false;
    }

    if (!isJumping && leftarrow) cat.x -= 3;
    if (!isJumping && rightarrow) cat.x += 3;

    cat.draw();
}
main();