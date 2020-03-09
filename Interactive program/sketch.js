//you can probably figure out what this does
let lineLength = 30;
//line Thickness determines the thickness of the lineSpacing
let lineThickness = 6;
//distance inbetween lines
let lineSpacing = 30;
//distance that the mouse will affect a lines color
let colorAffectFeild = 200;
//distance that the mouse will affect a lines angle
let turnAffectFeild = 200;
//speed that lines will turn twords mouse
let turnSpeed = 10;

// lineLength = 100;
// lineSpacing = 30;
// colorAffectFeild = 300;
// turnAffectFeild = 300;
// turnSpeed = 1;

//intializes an aray with nothing in it (yet)
let lineArray = [];

// let g1 = '#525252';
// let g2 = '#414141';
// let g3 = '#313131';
// let r1 = '#ca3e47';

let g1;
let g2;
let g3;
let r1;
let a1; // a for aqua

let mouseSpeed = 0;

function setup(){
  angleMode(DEGREES); // Change the mode to DEGREES
  //noCursor();
  //this intializes a 2d (technically 2d arrays arent a thing in js)
  //array to store all the line angles
  for(let x = 0; x < windowWidth/lineSpacing; x++){
    lineArray[x] = [];
    for(let y = 0; y < windowHeight/lineSpacing; y++){
      lineArray[x][y] = random(-90,90);
      // lineArray[x][y] = 0;
    }
  }

  //color wont work outside of draw of setup so we gotta do this
  g1 = color(82, 82, 82);
  g2 = color(65, 65, 65);
  g3 = color(49, 49, 49);
  r1 = color(202, 62, 71);
  a1 = color(41, 199, 185);

  createCanvas(windowWidth,windowHeight);
}


function draw(){

  if(keyIsDown(UP_ARROW)){
    lineLength += 1
  }
  if(keyIsDown(DOWN_ARROW)){
    if(lineLength > 1){
      lineLength -= 1
    }
  }

  if(keyIsDown(RIGHT_ARROW)){
    lineThickness += 1
  }
  if(keyIsDown(LEFT_ARROW)){
    if(lineThickness > 1){
      lineThickness -= 1
    }
  }

  mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  if(mouseSpeed > 100){
    mouseSpeed = 100;
  }


  var tempColorAffectFeild = round(colorAffectFeild - map(mouseSpeed, 0, 100, 0, colorAffectFeild));
  //print(map(mouseSpeed, 0, 100, 0, colorAffectFeild));

  background(g2);

  for(let x = 0; x < width/lineSpacing; x++){
    for(let y = 0; y < height/lineSpacing; y++){

      //I have no idea how push and pop works but it does so ¯\_(ツ)_/¯
      push();
      let distFromMouse = round(dist(mouseX, mouseY, x*lineSpacing, y*lineSpacing))

      //This moves the origin of the canvas to where the next line will be drawn
      //this is needed to do rotation
      translate(x*lineSpacing , y*lineSpacing);

      //this checks if a line is withen the turnAffectFeild if it is then
      //we can start turning it twords the mouse
      if(distFromMouse <= turnAffectFeild){

        //this does some math to figure out what angle the mouse is from the line
        let mouseLineAngle = atan2(mouseY - y*lineSpacing, mouseX - x*lineSpacing);

        //this prevents the line from flipping when the mouse crosses over it
        //It works by making the line not care if the mouse is to the top right
        //or the bottom left since they need the line to move the same amount
        //same with the top left and bottom right
        if(mouseLineAngle < -90){
          mouseLineAngle += 180;
        }else if(mouseLineAngle > 90){
          mouseLineAngle -= 180;
        }

        //this code makes the line rotate left or right towrds the mouse
        if(lineArray[x][y] < mouseLineAngle){
          lineArray[x][y] += (turnSpeed - map(distFromMouse, 0, turnAffectFeild, 0, turnSpeed));
        }else if(lineArray[x][y] > mouseLineAngle){
          lineArray[x][y] -= (turnSpeed - map(distFromMouse, 0, turnAffectFeild, 0, turnSpeed));
        }
      }
      //This rotates the canvas how ever much this current line needs it to
      rotate(lineArray[x][y]);

      //this stuff gives the outline a color dependent on how close and how fast the mouse is
      var inter = map(distFromMouse, 0, tempColorAffectFeild, 0, 1);
      var lineColor = lerpColor(r1, g1, inter);
      stroke(lineColor);
      if (distFromMouse < (lineSpacing/2)){
        stroke(a1)
      }

      //this draws the outline
      strokeWeight(lineThickness + 4);
      //strokeWeight(20);
      line(0,-(lineLength/2), 0, (lineLength/2));

      //this draws the actual line
      stroke(g3);
      strokeWeight(lineThickness);
      //strokeWeight(12);
      line(0,-(lineLength/2), 0, (lineLength/2));
      pop();
    }
  }
}
