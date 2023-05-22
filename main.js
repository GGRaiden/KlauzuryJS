let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

window.onload = function(){
    setInterval(draw, 15)
}

const scaledCanvas = {
  width: canvas.width / 3,
  height: canvas.height / 3,
}

const backgroundImageHeight = 730

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + canvas.height / 2,
  },
}

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

function drawBackground(){
  let background = new Image();
  background.src = "./img/backgrounds/background.png"
  ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, background.width, background.height);
}

function draw(){
  ctx.save();
  ctx.scale(3, 3)
  ctx.translate(camera.position.x, camera.position.y);
  drawBackground();
  level1();
  drawPlayer();
  ctx.restore();

  if (keys.d.pressed) {
      movement.right = true;
      movement.left = false;
      velocity.x = 5
      switchSprite('Run')
      player.lastDirection = 'right'
      shouldPanCameraToTheLeft()
  } else if (keys.a.pressed) {
      movement.left = true;
      movement.right = false;
      velocity.x = -5
      switchSprite('RunLeft')
      player.lastDirection = 'left'
      shouldPanCameraToTheRight()    
  } else if (velocity.y === 0.5) {
    shouldPanCameraUp()
    if (player.lastDirection === 'right') switchSprite('Idle')
    else switchSprite('IdleLeft')
  }

  if (keys.d.pressed == false) {
      movement.right = false;
  } 
  if (keys.a.pressed == false) {
      movement.left = false;
  }

  if (velocity.y < 0.5) {
    shouldPanCameraDown()
    if (player.lastDirection === 'right') switchSprite('Jump')
    else switchSprite('JumpLeft')
  } else if (velocity.y > 0.5)  {
    shouldPanCameraUp()
    if (player.lastDirection === 'right') switchSprite('Fall')
    else switchSprite('FallLeft')
  }
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case ' ':
      movement.canJump = true
      velocity.y = -10
      break
  }
})
  
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
})