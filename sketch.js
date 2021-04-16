//Create variables here
var canvas;
var dog;
var database;
var foodS, foodStock;
var doghappy,dogdown;
var fedTime, lastFed, foodObj;
var dogfed, dogfeed;
function preload()
{
  dogdown = loadImage("images/dogImg1.png");
  doghappy = loadImage("images/dogImg.png");
	//load images here
}

function setup() {
canvas = createCanvas(500, 500);
database = firebase.database();

foodObj = new Milk();

foodStock = database.ref('Food');
foodStock.on("value",readStock);


  dog = createSprite(250,250,30,30);
  dog.addImage(dogdown);
  dog.scale = 0.2;

dogfed = createButton("Feed the dog");
dogfed.position(700,95);
dogfed.mousePressed(feedDog);

dogfeed = createButton("Add food");
dogfeed.position(800,95);
dogfeed.mousePressed(addFoods);



}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  textSize(20);
text("20",450,50);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed:", + lastFed%12 + "PM",350,30);
  } else if(lastFed==0){
  text("last Feed: 12AM",350,30);
  } else{
  text("Last Feed:" + lastFed+ "AM", 350,30);
  }
  drawSprites();


  //add styles here

}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(doghappy);

if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}
else{
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}

database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}

function writeStock(x){
database.ref('/').update({
Food:x
})
}





function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}

function removeFood () {
  dog.add(doghappy);
  foodS--;
  database.ref('/').update({
  Food:foodS
  })
}




