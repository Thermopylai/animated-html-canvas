let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
   mouse.x = event.x;
   mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initCircles();
})

let colorArray = [
    '#034159',
    '#025951',
    '#02735E',
    '#038C3E',
    '#0CF25D',
];

let maxH = 50;
let maxW = 50;

function Rectangle(x, y, dx, dy, w, h, r, g, b, a){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.w = w;
    this.h = h;
    this.minW = w;
    this.minH = h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.fillStyle = this.color;
        //c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        c.fillRect(this.x, this.y, this.w, this.h);
    }

    this.update = function() {
        if (this.dx === 0) {
            this.dx = (Math.random() - 0.5);
        }
        if (this.dy === 0) {
            this.dy = (Math.random() - 0.5);
        }
        if (this.x + this.w > window.innerWidth || this.x < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.h > window.innerHeight || this.y < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.h < maxH) {
                this.h += 1;
            }
            if (this.w < maxW) {
                this.w += 1;
            }
        } else if (this.h > this.minH){
            this.h -= 1;
        } else if (this.w > this.minW){
            this.w -= 1;
        }

        this.draw();
    }

}

let rectangleArray = [];

function initRectangles() {
    rectangleArray = [];
    for (let i = 0; i < 1000; i++) {
        let w = Math.floor(Math.random() * 3 + 1);
        let h = Math.floor(Math.random() * 3 + 1);
        let x = Math.floor(Math.random() * (window.innerWidth - w) + 0.5 * w);
        let y = Math.floor(Math.random() * (window.innerHeight - h) + 0.5 * h);
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random();
        rectangleArray.push(new Rectangle(x, y, dx, dy, w, h, r, g, b, a))
    }
}

let maxRad = 40;

function Circle(x, y, dx, dy, rad, r, g, b, a) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRad = rad;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        //c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        c.fill();
    }
    
    this.update = function() {
        if (this.dx === 0) {
            this.dx = (Math.random() - 0.5);
        }
        if (this.dy === 0) {
            this.dy = (Math.random() - 0.5);
        }
        if (this.x + this.rad >= window.innerWidth || this.x - this.rad <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad >= window.innerHeight || this.y - this.rad <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.rad < maxRad) {
                this.rad += 1;
            }
        } else if (this.rad > this.minRad){
            this.rad -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function initCircles() {
    circleArray = [];
    for (let i = 0; i < 1000; i++) {
        let rad = Math.floor(Math.random() * 3 + 1);
        let x = Math.floor(Math.random() * (window.innerWidth - rad * 2) + rad);
        let y = Math.floor(Math.random() * (window.innerHeight - rad * 2) + rad);
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random();
        circleArray.push(new Circle(x, y, dx, dy, rad, r, g, b, a))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();    
    }
    for (let i = 0; i < rectangleArray.length; i++) {
        rectangleArray[i].update();    
    }
}

initCircles();
initRectangles();
animate();


// Lines
/*
for(let i = 0; i < 5; i++){
    c.beginPath();
    let x1 = Math.floor(Math.random() * window.innerWidth);
    let y1 = Math.floor(Math.random() * window.innerHeight);
    c.moveTo(x1, y1);

    for (let j = 0; j < 3; j++){
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        c.lineTo(x, y);
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random();
        c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        c.stroke();
    }
    
}
*/   
    