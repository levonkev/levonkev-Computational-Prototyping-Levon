var mode; // determine whether app has started, intro screen
var yset = 0.0;
var intro; //intro

var points = []; //where points spawn

var jit; //jitter control var

var saveButton;
var clearButton;
var slider;
var slider2; //garbage naming convention here
var slider3temper;
var slider4order;
var slider5impetus;
var slider6vanish;
//var slider5magnitude;

//colour values
var r1;
var r2;
var g1;
var g2;
var b1;
var b2;

var density = 50; //line amounts

function setup() {
  mode = 0;

  createCanvas(880, 600);
 background(0);
  intro = createGraphics(880, 600);

  saveButton = createButton("save");
  saveButton.mousePressed(saveArt);
  clearButton = createButton("clear");
  clearButton.mousePressed(mainMenu);
  slider = createSlider(0.5, 5, 0, 0.5);
  slider2 = createSlider(0.01, 0.5, 0, 0.01);
  slider3temper = createSlider(0, 30, 0, 2);
  slider4order = createSlider(1, 30, 0, 1);
  slider5impetus = createSlider(1, 6, 0, 1);
  slider6vanish = createSlider(0, 10, 0, 1);
 //intro.slider5magnitude = createSlider(10, 100, 50, 1);
}

function saveArt() {
  save("GenerativeArt.png");
}

function mainMenu() {
  resetCanvas();
  mode = 0;
}

function resetCanvas() {
  background(0);
  noiseDetail(2);
  angleMode(DEGREES);
  var space = width / density;

  for (var x = 0; x < width; x += space) {
    //starting points for lines, create vectors + make them random to remove the grid-like structure - i.e creates points
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p); //adds vector to points array
    }
  }

  //shuffle array to randomize
  shuffle(points, true);
  //colour values
  r1 = (20, 25, 45);
  r2 = (20, 25, 45);
  g1 = (20, 25, 45);
  g2 = (20, 25, 45);
  b1 = random(255);
  b2 = random(255);
}

function mousePressed() {
  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);
}
function keyTyped() {
  if (key === "z");
  r1 = (20, 25, 45);
  r2 = (20, 25, 45);
  g1 = (20, 25, 45);
  g2 = (20, 25, 45);
  b1 = random(255);
  b2 = random(255);
}

function draw() {
  if (mode == 0) {
    intro.clear();
    intro.textFont("Helvetica");
    intro.textSize(20);
    intro.stroke(0);
    intro.fill(150);
    intro.textAlign(CENTER, CENTER); // FINALLY ITS CENTERED
    intro.text(
      "COMPUTATIONAL PROTOTYPING LEVON KEVORKIAN",
      width / 2,
      height / 2
    );
    intro.textSize(12.5);
    intro.text("Press ENTER to start", width / 2, height / 1.8);
    intro.textSize(10);
    intro.text(
      "Mouse1 = random colour  ||  'Z' = default colour",
      width / 2,
      height / 1.05
    );

    // var sw5 = intro.slider5magnitude.value();
    //  density = sw5;
    //  intro.slider5magnitude.position(width / 2.45, 510);
    //  intro.textSize(10);
    //  intro.text("Magnitude = "+intro.slider5magnitude.value(), width / 2, height / 1.2);
    //Tried to create a slider on the intro screen to control density of lines, it was working however with 'bugs'
    image(intro, 0, 0);
    splashScreen();
  }

  if (mode == 1) {
   
    resetCanvas();
    //Needed to call this to initialize the setup, this wouldn't function during the spalshscreen/intro, and is called once ENTER is pressed - "loading" the sim before beginning.
     
    mode = 2;
  }

  if (mode == 2) {
    var sw6 = slider6vanish.value();
    background(0,sw6);
  //background colour and alpha, changing alpha to 10 creates a new aesthetic 
    fill(220);
    stroke(0);
    text("Size", 90, 590);
    text("Jitter", 225, 590);
    text("Temper", 360, 590);
    text("Order", 495, 590);
    text("Impetus", 625, 590);
    text("Vanish", 760, 590);

    //slides to control line size
    var sw2 = slider2.value();
    jit = sw2;

    if (frameCount <= points.length) {
      //fameCount spawning points diff time
      var max = frameCount; 
    } else {
      var max = points.length;
    }

    for (var i = 0; i < max; i++) {
      // control colours
      var r = map(points[i].x, 0, width, r1, r2);
      var g = map(points[i].y, 0, width, g1, g2);
      var b = map(points[i].x, 0, width, b1, b2);

      fill(r, g, b);

      var sw3 = slider3temper.value();
      var sw4 = slider4order.value();
      var angle = map(
        noise(points[i].x * jit, points[i].y * jit),sw3,sw4,0,720); //Perlin noise command re-mapped to slider i.e show/display 

      var sw5 = slider5impetus.value();
      points[i].add(createVector(cos(angle), sin(angle) *sw5));
      //vector added to each point based on angle i.e controls movement of the vector with a speed variable

      var sw = slider.value();
      noStroke();
      circle(points[i].x, points[i].y, sw);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }
}

function splashScreen() {
  var t = frameCount;

  //dark blue graphic
  stroke(20, 25, 45, 100);
  strokeWeight(2);
  noFill();
  beginShape(); //  beginShape() begins recording vertices for a shape and endShape() stops    recording.
  translate(width / 2, height / 2);
  rotate(-t / 300); //  rotate -framerate / 300
  var xset = 0;
  for (var y = 0; y <= 1000; y += 20) {
    var x = map(noise(xset, yset), 0, 3, 0, 300); //remapping numbers between two ranges, changes effect of the wave - Perlin noise, i love this
    vertex(x, y);
    xset += 0.2;
  }
  yset += 0.01;
  endShape();
}
