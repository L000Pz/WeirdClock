var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
var radius = canvas.width/ 2;
ctx.translate(radius, radius);
radius = radius;
setInterval(drawClock, 1000);

function drawClock() {
    
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.9, Math.PI,2 );
    ctx.fillStyle = '#091921';
    ctx.fill();
}

function drawNumbers(ctx,radius){
    var ang;
    var num;
    ctx.font = radius*0.14 + "px 'Roboto', sans-serif"
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for(num = 0 ; num <25 ; num++){    
        if(num%6==0){
            ang = num * Math.PI / 24 - Math.PI/2;
            ctx.rotate(ang);
            ctx.translate(0, -radius*0.9);
            ctx.rotate(-ang);
            ctx.fillStyle='white';
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius*0.9);
            ctx.rotate(-ang);
        }
    }
}

function drawTime(ctx,radius){
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    hour = (hour*Math.PI / 24)+
    (min*Math.PI / (24*60))+
    (sec*Math.PI/(24*60*60))- Math.PI/2;
    drawHand(ctx, hour, radius*0.4, radius*0.05,'tomato');

    min=(min*Math.PI/59)+
    (sec*Math.PI/(59*60))- Math.PI/2;
    drawHand(ctx, min, radius*0.7, radius*0.03,'white');

    sec = sec*Math.PI/59 - Math.PI/2;
    drawHand(ctx, sec, radius*0.8, radius*0.01,'skyblue');

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.03, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

}

function drawHand(ctx, pos, length, width,color) {
    
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.rotate(-pos);
    
}