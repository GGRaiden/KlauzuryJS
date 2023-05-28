let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let background = new Image();

//onload set interval
window.onload = function(){
    setInterval(draw, 15)
}


//camera values
const camera = {
  position: {
    x: 0,
    y: -320,
  },
}

//key pressed
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  r: {
    pressed: false
  }
}

//backgounds draw
function drawBackground() {
  ctx.drawImage(background, 0, 0, background.width, background.height);
}

//draw - levels, player, camera
function draw() {
  //start rendering camera, player, background, levels and movement, if there is no menu
  if (gamecontroller.level != 0) {
    ctx.save();
    ctx.scale(3, 3)
    ctx.translate(camera.position.x, camera.position.y);
    drawBackground();
    levelController();
    drawPlayer();

    //moving horizontal to the left and right and idle + swapping sprites
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

    //jump and fall + swapping sprites
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
      if(player.lastDirection == "right") switchSprite("Attack1")
      else switchSprite("Attack1left")
    }
  } else {
    levelController();
  }
  
  //if player misses, player stop attacking
  if (player.isAttacking && currentFrame === 2) {
    player.isAttacking = false
  }

  //if enemy misses, enemy stop attacking
  if (enemy.isAttacking && enemycurrentFrame === 2) {
    enemy.isAttacking = false
  }

  //Take the enemy's lives, if there are weapons in the player's range and if the player is attacking
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    currentFrame === 1
  ) {
    takeEnemyHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  //Take the player's lives, if there are weapons in the enemy's range and if the enemy is attacking
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemycurrentFrame === 1
  ) {
    takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  ctx.restore();

  //Whether the player's or the enemy's lives are at zero will determine the winner
  if (enemy.health <= 0 && gamecontroller.level == 3 || player.health <= 0 && gamecontroller.level == 3) {
    determineWinner({ player, enemy})
  }

  //checking if the healthbar can be displayed
  if(gamecontroller.level == 3){
    document.querySelector('#healthbar').style.display = 'flex'
    document.querySelector('#playerhealth').style.display = 'flex'
    document.querySelector('#timer').style.display = 'flex'
  } else {
    document.querySelector('#healthbar').style.display = 'none'
    document.querySelector('#playerhealth').style.display = 'none'
    document.querySelector('#timer').style.display = 'none'
  }
}

//checking if player or enemy is in range of attack
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


//checking if player is near enemy - enemy start attacking
function rectangularCollisionPlayer({ rectangle1, rectangle2 }) {
  return (
    rectangle1.playerDetection.x + rectangle1.playerDetection.width >=
      rectangle2.x &&
    rectangle1.playerDetection.x <=
      rectangle2.x + rectangle2.width &&
    rectangle1.playerDetection.y + rectangle1.playerDetection.height >=
      rectangle2.y &&
    rectangle1.playerDetection.y <= rectangle2.y + rectangle2.height
  )
}


//changing dislay in HTML on flex and text change based on health of enemy and player
function determineWinner({ player, enemy}) {
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'You the defeated enemy! Find the exit to advance to the next level.'
    gamecontroller.defetedenemy = true
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'You have been killed by enemy! Press R to restart level.'
  }
}


//checking if key on keyboard is pressed
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'r':
      keys.r.pressed = true
      break
    case ' ':
      movement.canJump = true
      velocity.y = -10
      break
  }
})


//checking if key on keyboard is unpressed
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'r':
      keys.r.pressed = false
      break
      case ' ':
      movement.canJump = false
      break
  }
})

//checking if button on mouse is pressed
canvas.addEventListener('mousedown', (event) => {
  getMousePos(event);
  player.isAttacking = true;
})