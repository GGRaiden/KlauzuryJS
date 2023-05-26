let player = {
    x : 100,
    y : 400,
    width : 20,
    height : 30,
    isAttacking: false,
    health: 100,
    dead: false,

    imageSrc: './img/warrior/Idle.png',
    frameRate: 1,
    frameBuffer: 3,
    scale: 0.5,
    offset: {
        x: 215,
        y: 157
    },
    animations: {
        Idle: {
        imageSrc: './img/warrior/Idle.png',
        frameRate: 8,
        frameBuffer: 4,
        },
        Run: {
        imageSrc: './img/warrior/Run.png',
        frameRate: 8,
        frameBuffer: 5,
        },
        Jump: {
        imageSrc: './img/warrior/Jump.png',
        frameRate: 2,
        frameBuffer: 4,
        },
        Fall: {
        imageSrc: './img/warrior/Fall.png',
        frameRate: 2,
        frameBuffer: 4,
        },
        FallLeft: {
        imageSrc: './img/warrior/FallLeft.png',
        frameRate: 2,
        frameBuffer: 4,
        },
        RunLeft: {
        imageSrc: './img/warrior/RunLeft.png',
        frameRate: 8,
        frameBuffer: 5,
        },
        IdleLeft: {
        imageSrc: './img/warrior/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 4,
        },
        JumpLeft: {
        imageSrc: './img/warrior/JumpLeft.png',
        frameRate: 2,
        frameBuffer: 4,
        },
        Attack1: {
        imageSrc: './img/warrior/Attack1.png',
        frameRate: 4,
        frameBuffer: 5,
        },
        TakeHit: {
        imageSrc: './img/warrior/TakeHit.png',
        frameRate: 4,
        frameBuffer: 3,
        },
        Death: {
        imageSrc: './img/warrior/Death.png',
        frameRate: 6,
        frameBuffer: 3,
        },
    },

    attackBox: {
        position: {
            x: 0,
            y: 0,
        },
        offset: {
          x: 18,
          y: 10
        },
        width: 28,
        height: 15
    },

    lastDirection: 'right',
}

for (let key in player.animations) {
    const image = new Image()
    image.src = player.animations[key].imageSrc

    player.animations[key].image = image
}

let gravity = {
    gravityForce : 0,
}

let movement = {
    left : false,
    right : false,
    canJump : false,
    speed : 5,
}

let camerabox = {
    position: {
      x: player.x,
      y: player.y,
    },
    width: 200,
    height: 80,
}

let velocity = {
    x : 0,
    y : 1,
}

function switchSprite(key) {
    if (image === player.animations[key].image || !sprite.loaded) return
    if (
        image === player.animations.Attack1.image &&
        currentFrame < player.animations.Attack1.frameRate - 1
      )
        return
    if (image === player.animations.Death.image) {
        if (currentFrame === player.animations.Death.frameRate - 1)
            player.dead = true
            return
    }

    if (
        image === player.animations.TakeHit.image &&
        currentFrame < player.animations.TakeHit.frameRate - 1
    )
    return

    currentFrame = 0
    image = player.animations[key].image
    player.frameBuffer = player.animations[key].frameBuffer
    player.frameRate = player.animations[key].frameRate
}

function drawPlayer(){
    //ctx.fillStyle='red';
    //ctx.fillRect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height);
    //ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
    //ctx.fillRect(player.x, player.y, player.width, player.height)

    update();
    
    if(player.dead) return
    playergravity();
    jump();
    moveHorizontal();
    updateCamerabox();

    /*ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
    ctx.fillRect(
        camerabox.position.x,
        camerabox.position.y,
        camerabox.width,
        camerabox.height
    )*/

    player.attackBox.position.x = player.x + player.attackBox.offset.x
    player.attackBox.position.y = player.y + player.attackBox.offset.y
}

function takeHit() {
    player.health -= 10

    if (player.health <= 0) {
      switchSprite('Death')
    } else switchSprite('TakeHit')
}

function playergravity(){
    if(player.y + player.height + gravity.gravityForce < canvas.height){
        player.y += gravity.gravityForce;
        if(gravity.gravityForce <= 15){
            gravity.gravityForce += 0.5;
            velocity.y = gravity.gravityForce;
        }
    }

    if(player.y + player.height + gravity.gravityForce >= canvas.height){
        player.y = canvas.height - player.height;
        gravity.gravityForce = 0;
        velocity.y = 0;
    }
}

function moveHorizontal(){
    if(movement.right == true){
        player.x += movement.speed;
        if(player.x + player.width > canvas.width){
            player.x = canvas.width - player.width;
            movement.right = false;
        }
    }

    if(movement.left == true){
        player.x -= movement.speed;
        if(player.x < 0){
            player.x = 0;
            movement.left = false;
        }
    }
}

function jump(){
    if(movement.canJump == true){
        if(gravity.gravityForce >= 0){
            gravity.gravityForce = -15;
        }
        movement.canJump = false;
    }
}

function updateCamerabox() {
    camerabox = {
      position: {
        x: player.x - 90,
        y: player.y - 40,
      },
      width: 200,
      height: 80,
    }
}

function shouldPanCameraToTheLeft() {
    const cameraboxRightSide = camerabox.position.x + camerabox.width
    const scaledDownCanvasWidth = canvas.width / 3

    if (cameraboxRightSide >= 1500) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= velocity.x;
    }

    shouldPanCameraUp()
}

function shouldPanCameraToTheRight() {
    if (camerabox.position.x <= 0) return

    if (camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= velocity.x;
    }

    shouldPanCameraUp()
}

function shouldPanCameraDown() {
    if (camerabox.position.y + velocity.y <= 0) return

    if (camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= velocity.y
    }
}

function shouldPanCameraUp() {
    if (
      camerabox.position.y + camerabox.height + velocity.y >=
      740
    )
      return

    const scaledCanvasHeight = canvas.height / 3

    if (
      camerabox.position.y + camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= velocity.y;
    }
}