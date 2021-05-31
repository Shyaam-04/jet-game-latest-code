var jetImg,jetUp,jetDown,jetG1,jetG2;
var border1, border2,border3,border4,border22,border44,border5,border6;
var playerJet, playerJetImg,playerJet2,playerJet3;
var spaceShip, spaceShipImg;
var gate1,gate2,gate3,gate4,gate5,gate6;
var gate1, gate2, gate3, gate4;
var bullet, bulletUp,bulletDown,bulletG1,bulletG2,bulletG;
var diamond, diamondImg;
var shield1,shield2,shield3,shield4;
var halo,haloImg;
var gameState = "STAGE1";
var shield = 1000;
var score = 0;



function  preload(){
  //loading all the images
  jetImg=loadImage("sprites/jet-removebg-preview.png");
  spaceShipImg = loadImage("sprites/spaceShip.jpg");
  playerJetImg = loadImage("sprites/jet7.png");
  diamondImg = loadImage("Sprites/diamond.png");
  haloImg = loadImage("Sprites/glow-removebg-preview.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //creating the spaceship
  spaceShip = createSprite(730,310);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 1.2
  //creating the player ship
  playerJet = createSprite(500,310);
  playerJet.addImage(playerJetImg);
  playerJet.scale = 0.08;

  //creating the diamond that the enemies need to steal from the spaceShip
  diamond = createSprite(750,320);
  diamond.addImage(diamondImg);
  diamond.scale = 0.3

  shield1 = createSprite(720,210,400,2);
  shield2 = createSprite(920,310,2,200);
  shield3 = createSprite(720,410,400,2);
  shield4 = createSprite(520,310,2,200);
  halo = createSprite(720,210);
  halo.addImage(haloImg);
 
 
  

 
 
  //invisible borders of the spaceShip
  border1 = createSprite(600,305,20,55);
  border2 = createSprite(650,270,140,20);
  border22 = createSprite(840,220,140,20);
  border3 = createSprite(900,310,20,190);
  border4 = createSprite(650,340,140,20);
  border44 = createSprite(850,400,120,20);
  border5 = createSprite(787,375,20,60);
  border6 = createSprite(787,260,20,60);
  gate1 = createSprite(750,270,50,20);
  gate2 = createSprite(750,340,50,20);
  border1.shapeColor = "red";
  border2.shapeColor = "red";
  border3.shapeColor = "red";
  border4.shapeColor = "red";
  border22.shapeColor = "red";
  border44.shapeColor = "red";
  gate1.shapeColor = "white";
  gate2.shapeColor = "white";
  //bullet.shapeColor = "orange";
  

 

  //creating a group for the groups of enemy jets and bullets
  jetG1=new Group();
  jetG2 = new Group();
  bulletG1 = new Group();
  bulletG2 = new Group();
  bulletG = new Group();
}

function draw(){
 // console.log(gameState);
 //the outer part of the spaceShip with the player and the opponents visible
  if(gameState==="STAGE1"){
  background("black");
  fill("red");
  text(mouseX+","+mouseY,mouseX,mouseY);
  fill("white");
  textSize(20);
  text("Enemies down: "+score,20,20);
  fill("orange");
  textSize(20);
  text("Space Ship Health: "+shield,1100,20);
  attackShipTop();
  attackShipDown();
  //moving the player according to a key
  if(keyIsDown(UP_ARROW)){
    playerJet.y-=5;
  }
  if(keyIsDown(DOWN_ARROW)){
    playerJet.y+=5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    playerJet.x+=5;
  }
  if(keyIsDown(LEFT_ARROW)){
    playerJet.x-=5;
  }
  /*if(playerJet.isTouching(jetG1)){
    jetG1.destroyEach();
  }*/
  //used to fore the bullets of the player
  if(keyWentDown("space")){
    bullet = createSprite(playerJet.x,playerJet.y,5,5);
    bullet.shapeColor = "orange";
    bullet.velocityY = -4;
    bulletG.add(bullet);
    bullet.debug = true;
    bullet.setCollider("circle",0,0,50);
  }
  
  //making the borders and gates and diamond invisible during the 1st stage
  border1.visible = false;
  border2.visible = false;
  border22.visible = false;
  border3.visible = false;
  border4.visible = false;
  border44.visible = false;
  gate2.visible = false;
  gate1.visible = false;
  border5.visible = false;
  border6.visible = false;
  diamond.visible = false;

 
  //fireBalls.visible = false;

  if(bulletG1.isTouching(shield1)||bulletG1.isTouching(shield2)||bulletG1.isTouching(shield3)||bulletG1.isTouching(shield4)||bulletG2.isTouching(shield1)||bulletG2.isTouching(shield2)||bulletG2.isTouching(shield3||bulletG2.isTouching(shield4))){
    shield = shield-2;
  }

  
 
  //the last phase of stage 1 and stage 2 appears
  /*if(jetG1.isTouching(gate1)||jetG1.isTouching(gate2)){
    jetG1.destroyEach();
    jetG2.destroyEach();
    spaceShip.destroy();
    playerJet.destroy();
    bulletG.destroyEach();
    bulletG1.destroyEach();
    bulletG2.destroyEach();
    
    gameState = "STAGE2";
 }*/
  
  
  }
  //the view of inside of the spaceShip
  else if(gameState==="STAGE2"){
    //destroy everything
    background("yellow");
   
    //call funtion of maze
    maze();
   // diamond.display();
   diamond.visible = true;

   //making
    
  }
  drawSprites();
  fill("yellow");
  stroke("black");
  text("Gate1",728,280,20);
  text("Gate2",728,350,20);

}

function attackShipTop(){ 
  
  if(frameCount%300 == 0){ 

  jetUp = createSprite(random(0,1200),0); 
  jetUp.addImage(jetImg); 
  jetUp.velocityY = 2; 
  jetUp.scale = -0.1;
   jetG1.add(jetUp);
   jetUp.debug = true;
   //jetUp.lifetime = 140;
   if(jetUp.isTouching(shield1)||jetUp.isTouching(shield3)){
     jetUp.velocityY = 0
   }
  }
   if(frameCount%20===0 && frameCount>300){
    bulletUp = createSprite(jetUp.x,jetUp.y,5,5);
    bulletUp.shapeColor = "purple";
    bulletUp.velocityY = 6;
    bulletG2.add(bulletUp);
    bulletUp.lifetime = 90;
  } 
  if(frameCount>300 && bulletG.isTouching(jetUp)){
    jetUp.destroy();
    console.log("attacker destroyed");
    score = score+1;
  }

  }
 

function attackShipDown(){
  //var jet;
    if((frameCount+50)%300==0){
        jetDown = createSprite(random(0,1200),windowHeight);
        jetDown.addImage(jetImg);
        jetDown.velocityY = -2;
        jetDown.scale = 0.1;
        jetG2.add(jetDown);
       // jetDown.lifetime = 140;
        if(jetDown.isTouching(shield3)){
          jetDown.velocityY = 0;
        }
    }
    //var x=jet.x;
    if(frameCount%20===0 && frameCount>250){
      bulletDown = createSprite(jetDown.x,jetDown.y,5,5);
      bulletDown.shapeColor = "purple";
      bulletDown.velocityY = -6;
      bulletG1.add(bulletDown);
      bulletDown.lifetime = 90;
     //o console.log(frameCount);
    } 
    if(frameCount>250 && bulletG.isTouching(jetDown)){
      jetDown.destroy();
      score = score+1;
    }
}
function maze(){
  text(mouseX+","+mouseY,mouseX,mouseY);
  var wall1 = createSprite(105,30,20,470);
  var wall2 = createSprite(130,270,70,20);
  var wall3 = createSprite(170,310,20,100);
  var wall4 = createSprite(170,360,150,20);
  var wall5 = createSprite(105,520,20,170);
  var wall6 = createSprite(754,274,130,20);
  var wall7 = createSprite(754,350,130,20);
  var wall8 = createSprite(155,523,120,20);
  var wall9 = createSprite(205,595,20,160);
  var wall10 = createSprite(1240,30,20,200);
  var wall11 = createSprite(1240,287,20,170);
  var wall12 = createSprite(1240,550,20,200);
  var wall13 = createSprite(1200,90,80,20);
  var wall14 = createSprite(1180,300,120,20);
  var wall15 = createSprite(1225,580,50,20);
  var wall17 = createSprite(1050,30,20,300);
  var wall18 = createSprite(1050,190,90,20);
  var wall19 = createSprite(650,200,120,20);
  var wall20 = createSprite(590,310,20,240);
  var wall21 = createSprite(645,440,130,20);
  var wall22 = createSprite(840,200,120,20);
  var wall23 = createSprite(890,325,20,243);
  var wall24 = createSprite(840,440,120,20);
  var wall25 = createSprite(220,80,250,20);
  var wall26 = createSprite(350,160,20,180);
  var wall27 = createSprite(230,170,50,20);
  var wall28 = createSprite(350,540,20,250);
  var wall29 = createSprite(405,250,130,20);
  var wall30 = createSprite(430,550,180,20);
  var wall31 = createSprite(590,30,20,200);
  var wall32 = createSprite(700,160,20,100);
  var wall33 = createSprite(750,100,120,20);
  var wall34 = createSprite(890,30,20,140);
  var wall35 = createSprite(890,190,20,50);
  var wall36 = createSprite(650,500,20,140);
  var wall37 = createSprite(835,500,20,140);
  var wall38 = createSprite(680,560,80,20);
  var wall39 = createSprite(960,400,150,20);
  var wall40 = createSprite(1100,650,20,350);
  var wall41 = createSprite(875,580,100,20);
  var wall42 = createSprite(510,350,150,20);
  var wall43 = createSprite(535,60,100,20);
  var wall44 = createSprite(240,450,50,20);
  var wall45 = createSprite(1000,300,50,20);
  wall1.shapeColor = "green";
  wall2.shapeColor = "green";
  wall3.shapeColor = "green";
  wall4.shapeColor = "green";
  wall5.shapeColor = "green";
  wall6.shapeColor = "blue";
  wall7.shapeColor = "blue";
  wall8.shapeColor = "green";
  wall9.shapeColor = "red";
  wall10.shapeColor = "green";
  wall11.shapeColor = "green";
  wall12.shapeColor = "green";
  wall13.shapeColor = "green";
  wall14.shapeColor = "green";
  wall15.shapeColor = "red";
 // wall16.shapeColor = "green";
  wall17.shapeColor = "green";
  wall18.shapeColor = "green";
  wall19.shapeColor = "green";
  wall20.shapeColor = "red";
  wall20.shapeColor = "green";
  wall21.shapeColor = "green";
  wall22.shapeColor = "green";
  wall23.shapeColor = "red";
  wall24.shapeColor = "green";
  wall25.shapeColor = "green";
  wall26.shapeColor = "red";
  wall27.shapeColor = "green";
  wall28.shapeColor = "green";
  wall29.shapeColor = "green";
  wall30.shapeColor = "red";
  wall31.shapeColor = "green";
  wall32.shapeColor = "green";
  wall33.shapeColor = "red";
  wall34.shapeColor = "green";
  wall35.shapeColor = "green";
  wall36.shapeColor = "red";
  wall37.shapeColor = "green";
  wall38.shapeColor = "green";
  wall39.shapeColor = "green";
  wall40.shapeColor = "red";
  wall41.shapeColor = "green";
  wall42.shapeColor = "green";
  wall43.shapeColor = "red";
  wall44.shapeColor = "red";
  wall45.shapeColor = "red";


}
