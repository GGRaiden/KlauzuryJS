//player values
let player = {
    x : 100,
    y : 400,
    width : 20,
    height : 30,

    health: 100,
    isAttacking: false,
    grounded: false,
    dead: false,

    imageSrc: './img/warrior/Idle.png',
    frameRate: 1,
    frameBuffer: 3,
    scale: 0.5,
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
        Attack1left: {
            imageSrc: './img/warrior/Attack1left.png',
            frameRate: 4,
            frameBuffer: 5,
        },
        TakeHit: {
            imageSrc: './img/warrior/TakeHit.png',
            frameRate: 4,
            frameBuffer: 4,
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

//adding key in player animation
for (let key in player.animations) {
    const image = new Image()
    image.src = player.animations[key].imageSrc

    player.animations[key].image = image
}

//gravity values
let gravity = {
    gravityForce : 0,
}

//movement values
let movement = {
    left : false,
    right : false,
    canJump : false,
    speed : 5,
}

//camerabox values
let camerabox = {
    position: {
      x: player.x,
      y: player.y,
    },
    width: 200,
    height: 80,
}

//velocity values
let velocity = {
    x : 0,
    y : 1,
}

//switching player sprite depending on the key
function switchSprite(key) {
    //same sprite - return
    if (image === player.animations[key].image || !sprite.loaded) return

    //overriding all other animations with the attack animation
    if (
        image === player.animations.Attack1.image  &&
        currentFrame < player.animations.Attack1.frameRate - 1
    ) return
    
    //overriding all other animations with the attack left animation
    if (
        image === player.animations.Attack1left.image  &&
        currentFrame < player.animations.Attack1left.frameRate - 1
    ) return

    //override when player gets hit
    if (
        image === player.animations.TakeHit.image &&
        currentFrame < player.animations.TakeHit.frameRate - 1
    ) return
    
    //override when player dies
    if (image === player.animations.Death.image && !keys.r.pressed) {
        if (currentFrame === player.animations.Death.frameRate - 1)
            player.dead = true
            return
    }

    currentFrame = 0
    image = player.animations[key].image
    player.frameBuffer = player.animations[key].frameBuffer
    player.frameRate = player.animations[key].frameRate
}

function drawPlayer(){
    //player attack box range collision
    //ctx.fillStyle='red';
    //ctx.fillRect(player.attackBox.position.x, player.attackBox.position.y, player.attackBox.width, player.attackBox.height);

    //player collision
    //ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
    //ctx.fillRect(player.x, player.y, player.width, player.height)

    //calling for player sprite animation
    update();

    if(player.dead) return
    playergravity();
    jump();
    moveHorizontal();
    updateCamerabox();

    //camera box collison
    /*ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
    ctx.fillRect(
        camerabox.position.x,
        camerabox.position.y,
        camerabox.width,
        camerabox.height
    )*/
    
    //switching attack box position depanding on what direction the player is facing
    if(player.lastDirection == "right") player.attackBox.position.x = player.x + player.attackBox.offset.x
    else player.attackBox.position.x = player.x - player.attackBox.offset.x - 8
    player.attackBox.position.y = player.y + player.attackBox.offset.y

    if (player.health <= 0) {
        switchSprite('Death')
}

//player take hit
function takeHit() {
    player.health -= 5
    switchSprite('TakeHit')
}

//player greavity
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

//player horizontal move
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

//player jump
function jump(){
    if(movement.canJump == true && player.grounded){
        if(gravity.gravityForce >= 0){
            gravity.gravityForce = -15;
        }
        movement.canJump = false;
        player.grounded = false;
    }
}

//camera box updating
function updateCamerabox() {
    camerabox = {
      position: {
        x: player.x - 165,
        y: player.y - 40,
      },
      width: 350,
      height: camerabox.height,
    }
}

function shouldPanCameraToTheLeft() {
    const cameraboxRightSide = camerabox.position.x + camerabox.width
    const scaledDownCanvasWidth = canvas.width / 3

    shouldPanCameraUp()

    if (cameraboxRightSide >= 1500) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= velocity.x;
    }
}

function shouldPanCameraToTheRight() {
    shouldPanCameraUp()

    if (camerabox.position.x <= 0) return

    if (camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= velocity.x;
    }
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