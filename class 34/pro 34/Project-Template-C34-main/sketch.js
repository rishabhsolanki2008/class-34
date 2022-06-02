// Declare all variables
var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var backgroundSound, gameOverMusic, cashCollectSound;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

//Create function preload()
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

//Add Sound Effect
  backgroundSound = loadSound("subway.mp3")
  gameOverMusic  = loadSound("gameover.mp3")
  cashCollectSound = loadSound("cash collect.mp3")
}
//Create function Setup()
function setup(){

createCanvas(400,600);

// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
// Create groups
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();

}

// Create function draw()
function draw() {
  

//Create gameState PLAY
  if(gameState===PLAY){

    
  background(0);
  // Mam this background music is heavy to process so please first close all tabs
  //backgroundSound.play()

   boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      cashCollectSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      cashCollectSound.play();
      
    }else if(jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      cashCollectSound.play();
      treasureCollection= treasureCollection + 150;

// Create GameState END     
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        

         boy.addAnimation("SahilRunning",endImg);
 

        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
   
         cashG.destroyEach();
         diamondsG.destroyEach();
         jewelryG.destroyEach();
         swordGroup.destroyEach();
        
  
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        gameOver()
        gameOverMusic.play();
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,10,30);
  }

}

//Create Cash Group
function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

//Create Diamond Group
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

//Create jewelry Group
function createjewelry() {
  if (World.frameCount % 410 == 0) {
  var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.13;
  jewelry.velocityY = 3;
  jewelry.lifetime = 150;
  jewelryG.add(jewelry);
  }
}

//Create Sword Group
function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

// Create pop up Alert
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

