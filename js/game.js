/*Canvas*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score = 0;
var lose = false; /*tanda kalau belum kalah*/
var click = true;

/*Frame*/
var frameControl = 1;
var frameControl2 = 1;

/*Ball*/
var ballRadius = 10;
var ballSpeedX = 0;
var ballSpeedY = 0;
var nBall = 1;
var speedup1 = 0;
var speedup2 = 0;
var speedup3 = 0;
var speedup4 = 0;
var speedup5 = 0;
var speedup6 = 0;
var speedup7 = 0;
var deadball = 0;
/*start position Ball
(x,y) = (0,0) berada di kiri atas
canvas.width = 250
canvas.height = 500*/
var x = canvas.width / 2;
var y = canvas.height - ballRadius;

/*Paddle*/
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

/*Brick*/
var brickRowCount = 9; //byk baris
var brickColumnCount = 8; // byk kolom
var count = brickRowCount * brickColumnCount; // total brick
var rem = count; 
var brickWidth = 50; // lebar brick
var brickHeight = 50; // tinggi brick
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 25;
var brickLive = 5;

/*Sound*/
var snd = new Audio("./music/paddleBall.wav");
var snd1 = new Audio("./music/paddleBall.wav");
var snd2 = new Audio("./music/paddleBall.wav");
var snd3 = new Audio("./music/paddleBall.wav");
var snd4 = new Audio("./music/paddleBall.wav");
var bgm = new Audio("./music/bgm.mp3");
var cool = new Audio("./music/cool.wav");
var yowza = new Audio("./music/yowza.wav");
var bgmlose = new Audio("./music/bgmlose.mp3");
var bgm50 = new Audio("./music/bgm50.mp3");
var bgm100 = new Audio("./music/bgm100.mp3");


bgm.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

bgm50.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

bgm100.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

bgm.play();

var bricks = [];
for(c = 0; c < brickColumnCount; ++c){
  bricks[c] = [];
  for(r = 0; r < brickRowCount; ++r) 
    if(r == 0){
      bricks[c][r] = {x: 0, y: 0, status: 1 };
    } else {
      bricks[c][r] = {x: 0, y: 0, status: 0 };
    }
    // if(r != 0){
    //     bricks[c][r] = {x: 0, y: 0, status: 0 };
    // } else {
    //   let gacha = Math.random() * 10;
    //   if(gacha < 5){
    //      bricks[c][r] = {x: 0, y: 0, status: 1 };
    //   } else {
    //     bricks[c][r] = {x: 0, y: 0, status: 0 };
    //   }
    // }
}

var balls = [];

iBall(canvas.width / 2, canvas.height - ballRadius, 1);

function iBall(iX, iY){
  for(c = 0; c < nBall; c++){
    balls[c] = {x: iX, y: iY, ballSpeedX: 0, ballSpeedY: 0}
    // console.log("arrayofball");
  }
}


/*Draw*/
function drawBall(){
  // for(idx = 0; idx < nBall; idx++){
    // ctx.beginPath();
    //   ctx.arc(balls[idx].x, balls[idx].y, ballRadius, 0, Math.PI*2);
    //   console.log("drawBall")
    //   if(idx == nBall - 1){
    //     ctx.fillStyle = "#42d9f4";
    //     ctx.fillStroke = "#42d9f4";
    //   }else {
    //     ctx.fillStyle = "#fff";
    //     ctx.fillStroke = "#fff";
    //   }
    //  	ctx.stroke = "10";
    //   ctx.fill();	
    // ctx.closePath();
  // }
  for(i = 0; i < frameControl; i++){
    ctx.beginPath();
    if(balls[i].y + balls[i].ballSpeedY <= canvas.height-ballRadius){
      ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI*2);
      // console.log("drawBall")
      ctx.fillStyle = "#8cdb98";
      ctx.fillStroke = "#8cdb98";
      ctx.stroke = "10";
      ctx.fill(); 
    }
    ctx.closePath();
    collisionDetection(i);
    if(balls[i].y+balls[i].ballSpeedY<ballRadius)
      balls[i].ballSpeedY=-balls[i].ballSpeedY;
    else if(balls[i].y + balls[i].ballSpeedY > canvas.height-ballRadius){
      deadball++;
      if(deadball > nBall - 1){
        nBall = Math.floor(score / 5) + 1;
        iBall(balls[i].x, balls[i].y);
        stageUp();
        randomize();
        losecheck();
        click = true;
        deadball = 0;
      } else {
        balls[i].y = 0;
        balls[i].x = 1000;
        balls[i].ballSpeedY = 0;
        balls[i].ballSpeedX = 0;
      }
    }
    else{
      balls[i].y+=balls[i].ballSpeedY;
    }
    //cek bolanya kena sisi2 canvas nya ato ngga
    if(balls[i].x+balls[i].ballSpeedX<ballRadius || balls[i].x+balls[i].ballSpeedX>canvas.width-ballRadius)
      balls[i].ballSpeedX=-balls[i].ballSpeedX;
    else
      balls[i].x+=balls[i].ballSpeedX;
   }

   //interval antar bola-bola
   frameControl2++;
   if(frameControl2 % 10 == 0){
    // console.log("framecontrol : "+ frameControl)
    frameControl++;
   }
   if(frameControl > nBall){
    frameControl = nBall;
   }
}
 
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(canvas.width, canvas.height - paddleHeight, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";
  ctx.fill();
  ctx.closePath();
}
 
function drawBricks(){
  for(c = 0; c < brickColumnCount; ++c){
    for(r = 0; r < brickRowCount; ++r){
      if(bricks[c][r].status != 0){
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if(bricks[c][r].status < 10){ ctx.fillStyle = '#ffffff'; }
        else if(bricks[c][r].status < 50) { ctx.fillStyle = '#fff175'; }
        else if(bricks[c][r].status < 100) { ctx.fillStyle = '#f9e63e'; }
        else if(bricks[c][r].status < 200) { ctx.fillStyle = '#ffc405'; }
        else if(bricks[c][r].status < 500) { ctx.fillStyle = '#ffa621'; }
        else if(bricks[c][r].status < 1000) { ctx.fillStyle = '#ea8202'; }
        else if(bricks[c][r].status < 1500) { ctx.fillStyle = '#ff9b05'; }
        else if(bricks[c][r].status < 2000) { ctx.fillStyle = '#ff6d05'; }
        else { ctx.fillStyle = '#ff320a'}
        	
        //if(c % 2 !=  0) ctx.fillStyle = "#fff";
        //else ctx.fillStyle = "#C2AA83";
        ctx.fill();
        ctx.closePath();
        ctx.font="18px Arial";
        ctx.fillStyle="#000";
        // untuk tentuin posisi tulisan di dalam brick nya
        if(bricks[c][r].status < 10){
          ctx.fillText(bricks[c][r].status,brickX + (brickWidth / 2) - 4,brickY + (brickHeight/2) + 6);
        } else if (bricks[c][r].status < 100){
          ctx.fillText(bricks[c][r].status,brickX + (brickWidth / 2) - 10,brickY + (brickHeight/2) + 6);
        } else if (bricks[c][r].status < 1000){
          ctx.fillText(bricks[c][r].status,brickX + (brickWidth / 2) - 15,brickY + (brickHeight/2) + 6);
        } else {
          ctx.fillText(bricks[c][r].status,brickX + (brickWidth / 2) - 20,brickY + (brickHeight/2) + 6);
        }
      }
    }
  }
}

function collisionDetection(idx){
  for(c = 0;c < brickColumnCount; ++c){
    for(r = 0;r < brickRowCount; ++r){
       var b = bricks[c][r];
       if(b.status != 0){
          var distX = Math.abs(balls[idx].x - b.x - brickWidth/2);
          var distY = Math.abs(balls[idx].y - b.y - brickHeight/2);

          var dx=distX-brickWidth/2;
          var dy=distY-brickHeight/2;

          if(balls[idx].x > b.x && balls[idx].x < b.x + brickWidth && balls[idx].y - ballRadius <= b.y + brickHeight && balls[idx].y - ballRadius > b.y){  //cek collision sisi bawah kotak
            balls[idx].ballSpeedY =- balls[idx].ballSpeedY;
             b.status--;
             if(b.status == 0) {scoreUp();
             count--;}
             /*** Change color of ball when it hits a brick ****/
             // ctx.beginPath();
             // ctx.arc(balls[idx].x,balls[idx].y,ballRadius,0,Math.PI*2);
             // ctx.fillStyle="#00ffff";
             // ctx.fillStroke="#00ffff";
             // ctx.stroke="10";
             // ctx.fill();
             // ctx.closePath();
             snd.play();
          }
          else if(balls[idx].x > b.x && balls[idx].x < b.x + brickWidth && balls[idx].y + ballRadius >= b.y && balls[idx].y + ballRadius < b.y + brickHeight){ //cek collision sisi atas kotak
              balls[idx].ballSpeedY =- balls[idx].ballSpeedY;
             b.status--;
             if(b.status == 0) {scoreUp();
             count--;}
             /*** Change color of ball when it hits a brick ****/
             snd1.play();
          }
          else if(balls[idx].y > b.y && balls[idx].y < b.y + brickHeight && balls[idx].x + ballRadius >= b.x && balls[idx].x + ballRadius < b.x + brickWidth){ //cek collision sisi kiri kotak
              balls[idx].ballSpeedX =- balls[idx].ballSpeedX;
             b.status--;
             if(b.status == 0) {scoreUp();
             count--;}
             /*** Change color of ball when it hits a brick ****/
             snd2.play();
          }
          else if(balls[idx].y > b.y && balls[idx].y < b.y + brickHeight && balls[idx].x - ballRadius <= b.x + brickWidth && balls[idx].x - ballRadius > b.x){ //cek collision sisi kanan kotak
              balls[idx].ballSpeedX =- balls[idx].ballSpeedX;
             b.status--;
             if(b.status == 0) {scoreUp();
             count--;}
             /*** Change color of ball when it hits a brick ****/
             snd3.play();
          }
          else if(dx*dx+dy*dy<=(ballRadius*ballRadius)){  //cek collision sama sudut
              balls[idx].ballSpeedX =- balls[idx].ballSpeedX;
              balls[idx].ballSpeedY =- balls[idx].ballSpeedY;
             b.status--;
             if(b.status == 0) {scoreUp();
             count--;}
             /*** Change color of ball when it hits a brick ****/
             snd4.play();
          }

       	  // cek bagian sisi kiri, kanan, atas, bawah kotak
          // if(balls[idx].x > b.x && balls[idx].x < b.x + brickWidth && balls[idx].y > b.y && balls[idx].y < b.y + brickHeight){
          //    // var snd = new Audio("./music/paddleBall.wav");
          //    // snd.play();
          //    balls[idx].ballSpeedY =- balls[idx].ballSpeedY;
          //    b.status--;
          //    if(b.status == 0) {score++;
          //    count--;}
          //    /*** Change color of ball when it hits a brick ****/
          //    ctx.beginPath();
          //    ctx.arc(balls[idx].x,balls[idx].y,ballRadius,0,Math.PI*2);
          //    ctx.fillStyle="#00ffff";
          //    ctx.fillStroke="#00ffff";
          //    ctx.stroke="10";
          //    ctx.fill();
          //    ctx.closePath();
          //    // /**************************************************/
          //    // /*** If count of total bricks decreases to 30
          //    //      Increase the speed of ball ***/
          //    //      if(count<=(rem-rem/7) && speedup1==0){
          //    //         if(ballSpeedY<0)
          //    //           ballSpeedY-=0.5;
          //    //         else
          //    //           ballSpeedY+=0.5;
          //    //         if(ballSpeedX<0)
          //    //          ballSpeedX-=0.5;
          //    //         else
          //    //           ballSpeedX+=0.5;
          //    //         paddleWidth+=2;
          //    //         speedup1=1;
          //    //      }
          //    // /*** If count of total bricks decreases to 20
          //    //      Increase the speed of ball and increase paddleWidth***/
          //    //      if(count<=(rem-2*rem/7) && speedup2==0){
          //    //         if(ballSpeedY<0)
          //    //           ballSpeedY-=1;
          //    //         else
          //    //           ballSpeedY+=1;
          //    //         if(ballSpeedX<0)
          //    //           ballSpeedX-=1;
          //    //         else
          //    //           ballSpeedX+=1;
 
 
          //    //         paddleWidth+=3;
          //    //         speedup2=1;
          //    //      }
          //    // /*** If count of total bricks decreases to 10
          //    //      Increase the speed of ball ******/
          //    //      if(count<=(rem-3*rem/7) && speedup3==0){
          //    //         if(ballSpeedY<0)
          //    //           ballSpeedY-=1;
          //    //         else
          //    //           ballSpeedY+=1;
          //    //         if(ballSpeedX<0)
          //    //           ballSpeedX-=1;
          //    //         else
          //    //           ballSpeedX+=1;
 
          //    //         paddleWidth+=4;
          //    //         speedup3=1;
          //    //      }
 
          //    //      if(count<=(rem-4*rem/7) && speedup4==0){
 
          //    //        if(ballSpeedY<0)
          //    //          ballSpeedY-=1;
          //    //        else
          //    //          ballSpeedY+=1;
          //    //        if(ballSpeedX<0)
          //    //          ballSpeedX-=1;
          //    //        else
          //    //          ballSpeedX+=1;
          //    //         paddleWidth+=5;
          //    //         speedup4=1;
 
          //    //      }
 
          //    //      if(count<=(rem-5*rem/7) && speedup5==0){
 
          //    //         if(ballSpeedY<0)
          //    //           ballSpeedY-=1;
          //    //         else
          //    //          ballSpeedY+=1;
          //    //         if(ballSpeedX<0)
          //    //           ballSpeedX-=1;
          //    //         else
          //    //          ballSpeedX+=1;
          //    //         paddleWidth+=6;
          //    //         speedup5=1;
 
          //    //      }
 
          //    //      if(count<=(rem-6*rem/7) && speedup6==0){
 
          //    //        if(ballSpeedY<0)
          //    //          ballSpeedY-=1;
          //    //        else
          //    //          ballSpeedY+=1;
          //    //        if(ballSpeedX<0)
          //    //          ballSpeedX-=1;
          //    //        else
          //    //          ballSpeedX+=1;
          //    //         paddleWidth+=7;
          //    //         speedup6=1;
 
          //    //      }
          //         if(count > brickRowCount * brickColumnCount * 5){
          //            alert("You WON!!! Good job champ!");
          //            document.location.reload();
          //         }
          // }
      }
    }
  }
}
 
function drawScore(){
   ctx.font="18px Arial";
   ctx.fillStyle="#fff";
   ctx.fillText("Score: " + score, 40, 20); 
}
 
function drawTitle() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Phantasia - Ball & Breaker", canvas.width-235, 20);
}

function draw(){
    if(lose == true){
      // ambil JSON dari localstorage
      var highscoreJSON = localStorage.getItem('pbb_highscore');
      // ubah JSON jadi array of object
      var highscore = JSON.parse(highscoreJSON);
      console.log(highscore);

      clearInterval(animationDraw);
      bgm.pause();
      bgm50.pause();
      bgm100.pause();
      bgmlose.play();
        swal({
          title: 'What is your name?',
          input: 'text',
          inputPlaceholder: 'Enter your name or nickname',
          showCancelButton: true,
          allowOutsideClick: false,
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value) {
                resolve()
              } else {
                reject('You need to write something!')
              }
            })
          }
        }).then(function (name) {

          if (highscore == null) {
              var json = {"score":[{"nama":name,"point":score}]};
              var newHighscore = JSON.stringify(json);
              localStorage.setItem('pbb_highscore', newHighscore);
          } else {
              var newScore = highscore.score;
              newScore.push({"nama":name, "point":score});
              newScore.sort(function(a, b) {
                  return a.point < b.point;
              })
              highscore.score = newScore;
              localStorage.setItem('pbb_highscore', JSON.stringify(highscore));
          }

          swal({
            type: 'info',
            title: 'Congratulation, ' + name,
            text: 'Your score is ' + score,
            onClose: function(){
              bgmlose.pause();
              window.location.href="highscore.html";
            }
          })
        })
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawTitle();
 
    // collisionDetection();
 
 
  //   if(y+ballSpeedY<ballRadius)
  //     ballSpeedY=-ballSpeedY;
  //   else if(y+ballSpeedY>canvas.height-ballRadius){
  //       //THE BALL HIT BOTTOM OF CANVAS
  //       ballSpeedX = 0;
  //       ballSpeedY = 0;
  //       stageUp();
  //       randomize();
  //       losecheck();
  //   }
  //   else
  //     y+=ballSpeedY;
 	// //cek bolanya kena sisi2 canvas nya ato ngga
  //   if(x+ballSpeedX<ballRadius || x+ballSpeedX>canvas.width-ballRadius)
  //      ballSpeedX=-ballSpeedX;
  //   else
  //      x+=ballSpeedX;

}

/*
function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    if((relativeX - paddleWidth / 2 >= 0) && (relativeX - paddleWidth / 2<= (canvas.width-paddleWidth)))
      paddleX=relativeX-paddleWidth/2;
  }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
 */

var animationDraw = setInterval(draw,20);

// M O U S E  C O N T R O L
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function(evt) {
  click = true;
  if(click == true){
      mousePos = getMousePos(canvas, evt);
      if(balls[0].y <= canvas.height-ballRadius && balls[0].y >= canvas.height-ballRadius-10){
        if(mousePos.y <= canvas.height-10){
          for(i = 0; i < nBall; i++){
          	balls[i].ballSpeedX = -(balls[i].x - mousePos.x) / 20;
      	    balls[i].ballSpeedY = -(balls[i].y - mousePos.y + 2*ballRadius) / 20;
          }
        }
      }
      frameControl = 1;
      frameControl2 = 1;
      click = false;
  }
}, false);

//untuk turun kebawah
function stageUp(){
  for(r = brickRowCount-2; r >= 0; r--){
    for(c = 0; c < brickColumnCount; ++c){
      bricks[c][r+1].status = bricks[c][r].status;
    }
  }
}

//untuk kasih nilai ke brick baru
function randomize(){
  let gacha;
  for(c = 0; c < brickColumnCount; c++){
    gacha = Math.random() * 10;
    if (gacha < 5){
      bricks[c][0].status = Math.floor(Math.random()*score);
    } else {
      bricks[c][0].status = 0;
    }
  }
}

//untuk cek apakah brick sudah sampai bawah atau belum
function losecheck(){
  for(c = 0; c < brickColumnCount; ++c){
    if(bricks[c][brickRowCount - 1].status > 0){
      lose = true;
    }
  }
}

function scoreUp(){
  score++;
  if(score % 50 == 0){
    if(score >= 100){
      bgm50.pause();
      bgm100.play();
      $("#myCanvas").css("background-image", "url(images/bg-play2.png)");
    } else if (score >= 50){
      bgm.pause();
      bgm50.play();
      $("#myCanvas").css("background-image", "url(images/bg-play1.png)");
    }
    yowza.play();
  } else if(score % 10 == 0){
    cool.play();
  }
}