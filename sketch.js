var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var play = 1, end = 0, gameState = play;
var obstacleGroup, cloudGroup

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("red");
  
 if (gameState === play) {
   spawnCloud();
  spawnObstacle();
   
   if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    } 
   ground.velocityX = -2;
   
   if (trex.isTouching(obstacleGroup)) {
     gameState = end;
   } 
 } 
else if (gameState === end) {
  
  ground.velocityX = 0;
  
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
}
  
  trex.collide(invisibleGround);
  drawSprites();
  
}

function spawnCloud() {
  if (frameCount %60 === 0) {
    var cloud = createSprite(600,100,20,20);
    cloud.velocityX = -3;
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    var rand = Math.round(random(50,150))
    cloud.y = rand;
    cloud.lifetime = 100;
    
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacle() {
  if (frameCount %100 === 0) {
    var obstacle = createSprite(600,170,30,30);
    obstacle.velocityX = -9;
    obstacle.scale = 0.6;
    obstacle.lifetime = 66;
    var rando = Math.round(random(1,6))
    switch(rando) {
      case 1: obstacle.addImage(obstacle1);
            break;
      case 2: obstacle.addImage(obstacle2);
            break;
      case 3: obstacle.addImage(obstacle3);
            break;
      case 4: obstacle.addImage(obstacle4);
            break;
      case 5: obstacle.addImage(obstacle5);
            break;
      case 6: obstacle.addImage(obstacle6);
            break;
            default: break;
          
    }
    obstacleGroup.add(obstacle);
  }
}



