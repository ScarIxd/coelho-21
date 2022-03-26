const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbit2;
var button;
var blink, eat, sad;
var bg_sound, cut_sound, sad_sound, eating_sound, air_sound;
var mute2

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  bg_sound = loadSound("sound1.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3");
  air_sound = loadSound("air.wav");


  blink.playing = true;
  eat.playing = false;
  eat.looping = 0;
  sad.playing = 1;
}


function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bg_sound.play();
  bg_sound.setVolume(0.1);


  button = createImg("cut_button.png");
  button.position(100,270);
  button.size(50,50);
  button.mouseClicked(cut);

  mute2 = createImg("mute.png");
  mute2.position(100,220);
  mute2.size(50,50);
  mute2.mouseClicked(mute);


  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit2 = createSprite(400,610,300,300);
  rabbit2.addAnimation("piscando", blink);
  rabbit2.addAnimation("comendo", eat);
  rabbit2.addAnimation("triste", sad);
  
  rabbit2.scale = 0.3;

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  

}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);
  rope.show();
  Engine.update(engine);


  drawSprites();

}

function cut(){
  rope.break();
  fruit_con.detach();

}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else {
    bg_sound.play()
  }




}