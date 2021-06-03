var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup(){
    createCanvas(windowWidth,windowHeight);

    database=firebase.database();
    
    ball = createSprite(250,250,10,10);
    ball.addAnimation("BallAnimation",balloonImage1)

    var ballPosition=database.ref("ball/position")
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
database.ref("ball/position").set(
    {
        "x":position.x+x,
        "y":position.y+y
    }
)
}

function readPosition(data){
position=data.val();
ball.x=position.x;
ball.y=position.y
}

function showError(){
console.log("Error")


}