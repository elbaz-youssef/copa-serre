let c = document.getElementById('c');
let ctx = c.getContext('2d');
let w = c.width = window.innerWidth;
let h = c.height = window.innerHeight;
let circle = Math.PI * 2;

let defaultBg = "#fff";
class Circle {
    constructor(x,y,dx,dy,r,clr,bg) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.clr = clr;
        this.bg = bg;
    }
    update() {
        if(this.x + this.r > w || this.x < this.r) {
            this.dx = -this.dx;
        }
        if(this.y + this.r > h || this.y < this.r) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }
    draw(context) {
        context.beginPath();
        context.strokeStyle = this.clr;
        context.fillStyle = this.bg;
        context.arc(this.x,this.y,this.r,0,circle);
        context.fill();
        context.stroke();
    }
}

let colors = ['#0af',"#f56"];
let allCircles = [];
let radius = 15;
function init() {
    for(let i = 0; i < 10; i++) {
        let x = getRandomInRange(radius,w - radius);
        let y = getRandomInRange(radius,h - radius);
        let posOrNegX = Math.random() - 0.5;
        let posOrNegY = Math.random() - 0.5;
        let dx = Math.ceil(getRandomInRange(0,4));
        let dy = Math.ceil(getRandomInRange(0,4));
        dx = posOrNegX < 0? -dx : dx;
        dy = posOrNegY < 0? -dy : dy;
        let rand = Math.floor(getRandomInRange(0,colors.length));
        let circle1 = new Circle(x,y,dx,dy,radius,colors[rand],"#fff");
        circle1.draw(ctx);
        allCircles.push(circle1);
    }
}
init();

window.addEventListener('resize', () => {
    console.log('hello world');
    allCircles = [];
    ctx.clearRect(0,0,w,h);
    w = c.width = window.innerWidth; 
    h = c.height = window.innerHeight; 
    init();
});

function getRandomInRange(min,max) {
    return Math.random() * (max - min) + min;
}

function move() {
    ctx.clearRect(0,0,w,h);
    allCircles.forEach(elm => {
        elm.update();
    });
    checkCollision();
    requestAnimationFrame(move);
}
move();


function checkCollision() {
    for(let i = 0; i < allCircles.length - 1; i++) {
        for(let j = i + 1; j < allCircles.length; j++) {
            let d = calculateDistance(allCircles[i].x,allCircles[i].y,allCircles[j].x,allCircles[j].y);
            if(d <= allCircles[i].r + allCircles[j].r) {
                allCircles[i].bg = allCircles[i].clr;
                allCircles[j].bg = allCircles[j].clr;
            }
            // if(d = calculateDistance(allCircles[i].x,allCircles[i].y,allCircles[j].x,allCircles[j].y)) {
            //     if(allCircles[i].x > allCircles[j].x) {
            //         if(allCircles[i].dx < 0) {
            //             allCircles[i].dx = -allCircles[i].dx;
            //         }
            //         if(allCircles[j].dx > 0) {
            //             allCircles[j].dx = -allCircles[j].dx;
            //         }
            //     }
            //     else {
            //         if(allCircles[i].dx > 0) {
            //             allCircles[i].dx = -allCircles[i].dx;
            //         }
            //         if(allCircles[j].dx < 0) {
            //             allCircles[j].dx = -allCircles[j].dx;
            //         }
            //     }
            // }
            // else {
            //     allCircles[i].bg = "#fff";
            //     allCircles[j].bg = "#fff";
            // }
        }
    }
}


function calculateDistance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2));
}
