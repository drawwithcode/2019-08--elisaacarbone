//create a map and load it from mapbox
var myMap;
var canvas;
var mappa = new Mappa('MapboxGL', "pk.eyJ1IjoiYW5kcmVhYmVuZWRldHRpIiwiYSI6ImNqNWh2eGh3ejFqOG8zM3BrZjRucGZkOGEifQ.SmdBpUoSe3s0tm-OTDFY9Q");

//define the coordinates of polimi
var poliLat = 45.5052779;
var poliLon = 9.1655956;

//define that when the maps appears it will be centered on the polimi and the style of the map
var options = {
  lat: poliLat,
  lng: poliLon,
  zoom: 10,
  style: "mapbox://styles/mapbox/dark-v8"
}

//define the position of the user and it's coordinates
var myLat;
var myLon;
var position;

//load the user position
function preload() {
  position = getCurrentPosition();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  //define that the setup of the project will be the map
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //define that the position of the user will define his lat and his lon
  myLat = position.latitude;
  myLon = position.longitude;
}

function draw() {
  clear();

  //draw a circle where the polimi is
  var polimi = myMap.latLngToPixel(poliLat, poliLon);
  fill(255, 0, 0);
  noStroke();
  ellipse(polimi.x, polimi.y, 20);

  //define the label polimi
  push();
  fill(20);
  stroke(80);
  rectMode(CENTER);
  rect(polimi.x, polimi.y - 40, 80, 30);
  pop();

  push();
  fill("red");
  noStroke();
  textFont("Tomorrow");
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Polimi", polimi.x, polimi.y - 40);
  pop();

  //draw a circle where the user is
  var myPosition = myMap.latLngToPixel(myLat, myLon);
  fill(255, 0, 0);
  noStroke();
  ellipse(myPosition.x, myPosition.y, 20);

  //deifne the label you
  push();
  fill(20);
  stroke(80);
  rectMode(CENTER);
  rect(myPosition.x, myPosition.y - 40, 60, 30);
  pop();

  push();
  fill("red");
  noStroke();
  textFont("Tomorrow");
  textAlign(CENTER, CENTER);
  textSize(18);
  text("You", myPosition.x, myPosition.y - 40);
  pop();

  //draw a line between the user and the polimi
  push();
  stroke("red");
  strokeWeight(2);
  fill("red");
  line(polimi.x, polimi.y, myPosition.x, myPosition.y);
  pop();

  //get the distance between the user and polimi
  var distance = dist(polimi.x, polimi.y, myPosition.x, myPosition.y);

  //if the user is too far from polimi he's a bad student
  if (distance > 15) {
    //label you're a bad student
    push();
    fill(20);
    stroke(80);
    rectMode(CENTER);
    rect(width / 2, height - 100, 700, 50);
    pop();

    push();
    fill("red");
    noStroke();
    textFont("Tomorrow");
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Why aren't you in Polimi??! How are you gonna pass your exams??", width / 2, height - 100);
    pop();
  } else { //if the user is close enough to polimi he's a good student

    //define the label good student
    push();
    fill(20);
    stroke(80);
    rectMode(CENTER);
    rect(width / 2, height - 100, 800, 50);
    pop();

    push();
    fill("red");
    noStroke();
    textFont("Tomorrow");
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Congratulations, as you're in Polimi that means you're a very diligent student!", width / 2, height - 100);
    pop();
  }
}
