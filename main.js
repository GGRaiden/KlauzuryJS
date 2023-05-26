let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();

window.onload = function(){
    setInterval(draw, 15)
}

const camera = {
  position: {
    x: 0,
    y: -300,
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

let lastKey = '';

function drawBackground() {
  ctx.drawImage(background, 0, 0, background.width, background.height);
}

function draw() {
  if (gamecontroller.level != 0) {
    ctx.save();
    ctx.scale(3, 3)
    ctx.translate(camera.position.x, camera.position.y);
    drawBackground();
    levelController();
    drawPlayer();

    if (keys.d.pressed && lastKey == 'd') {
        movement.right = true;
        movement.left = false;
        velocity.x = 5
        switchSprite('Run')
        player.lastDirection = 'right'
        shouldPanCameraToTheLeft()
    } else if (keys.a.pressed && lastKey == 'a') {
        movement.left = true;
        movement.right = false;
        velocity.x = -5
        switchSprite('RunLeft')
        player.lastDirection = 'left'
        shouldPanCameraToTheRight()
    } else if (velocity.y == 0.5) {
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

    if (player.isAttacking == true){
      switchSprite("Attack1")
    }
  }
  else {
    levelController();
  }

  if (player.isAttacking && currentFrame === 2) {
    player.isAttacking = false
  }

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    takeEnemyHit()
    console.log("hit")
    player.isAttacking = false
  }

  /*console.log(rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }))*/
  //console.log(player.isAttacking)
  //console.log(currentFrame === 2)

  ctx.restore();
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.y &&
    rectangle1.attackBox.position.y <= rectangle2.y + rectangle2.height
  )
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case ' ':
      movement.canJump = true
      velocity.y = -10
      break
    case 's':
      takeHit()
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

canvas.addEventListener('mousedown', (event) => {
  getMousePos(event);
  player.isAttacking = true;
})