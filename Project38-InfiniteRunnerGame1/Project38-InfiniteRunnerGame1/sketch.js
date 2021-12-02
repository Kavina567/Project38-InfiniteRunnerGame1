var p1,p2,enemy1,enemy2,enemy3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,enemyGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  enemy1 = loadImage("enemy1.png");
  enemy2 = loadImage("enemy2.png");
  enemy3 = loadImage("enemy3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  enemyGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(enemyGroup.isTouching(p2) || enemyGroup.isTouching(p1)) {
      enemyGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(enemyGroup.isTouching(laserGroup)) {
      enemyGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    enemies();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("Score : " + score,210,60)
    
    if(enemyGroup.isTouching(endline)) {
      enemyGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    fill("lightpink");
    textSize(30);
    text("GAME OVER!!",canvas.width/2-400,canvas.height/2);
    text("The enemies have destroyed your planet and people back there :(.",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    fill(160,218,226);
    textFont("Caveat")
    textSize(50);
    text("SPACE CHAMPIONS",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+150);
    fill(160,218,226);
    textSize(35);
    textFont("Apple Chancery");
    text("It is the year 2047",canvas.width/2-300,canvas.height/2-250);
    text("You are a brave space fighter.",canvas.width/2-300, canvas.height/2 - 210);
    text("You've been waiting for a chance to show your bravery",canvas.width/2-300, canvas.height/2 - 170);
    text("to this world!!",canvas.width/2-300, canvas.height/2 - 130);
    text("There are aliens coming to attack Earth and her people. ",canvas.width/2-300,canvas.height/2-90);
    text("Everyone is depending on you..!",canvas.width/2-300,canvas.height/2-50);
    fill("yellow");
    textSize(35);
    text("Press SPACE to shoot.",canvas.width/2-300,canvas.height/2-10);
    text("Press LEFT and RIGHT ARROW KEYS to move.",canvas.width/2-300,canvas.height/2+40);
    text("Press P to start the game.",canvas.width/2,canvas.height/2+80);
    
    if(keyDown("p")) {
      gameState = play;
    } 
  }
}
  

function enemies() {
  if(frameCount % 110 === 0) {
  
    var enemy = createSprite(Math.round(random(50,1350)),-20);
    enemy.velocityY = (6 + score/10);
    enemy.lifetime = 200;
    enemy.scale = random(0.4,0.5);
    //enemy.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: enemy.addImage(enemy1);
              enemy.setCollider("circle",-80,10,160);
              break;
      case 2: enemy.addImage(enemy2);
              enemy.setCollider("circle",50,0,150);
              break;
      case 3: enemy.addImage(enemy3);
              enemy.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(enemy.x);
    enemyGroup.add(enemy);
  }
}