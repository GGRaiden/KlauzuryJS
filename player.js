let player = {
    x : 100,
    y : 400,
    width : 20,
    height : 30,

    imageSrc: './img/warrior/Idle.png',
    frameRate: 1,
    frameBuffer: 3,
    scale: 0.5,
    animations: {
        Idle: {
        imageSrc: './img/warrior/Idle.png',
        frameRate: 8,
        frameBuffer: 3,
        },
        Run: {
        imageSrc: './img/warrior/Run.png',
        frameRate: 8,
        frameBuffer: 5,
        },
        Jump: {
        imageSrc: './img/warrior/Jump.png',
        frameRate: 2,
        frameBuffer: 3,
        },
        Fall: {
        imageSrc: './img/warrior/Fall.png',
        frameRate: 2,
        frameBuffer: 3,
        },
        FallLeft: {
        imageSrc: './img/warrior/FallLeft.png',
        frameRate: 2,
        frameBuffer: 3,
        },
        RunLeft: {
        imageSrc: './img/warrior/RunLeft.png',
        frameRate: 8,
        frameBuffer: 5,
        },
        IdleLeft: {
        imageSrc: './img/warrior/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 3,
        },
        JumpLeft: {
        imageSrc: './img/warrior/JumpLeft.png',
        frameRate: 2,
        frameBuffer: 3,
        },
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

    currentFrame = 0
    image = player.animations[key].image
    player.frameBuffer = player.animations[key].frameBuffer
    player.frameRate = player.animations[key].frameRate
}

function drawPlayer(){    
    //ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
    //ctx.fillRect(player.x, player.y, player.width, player.height)
    playergravity();
    jump();
    moveHorizontal();
    updateCamerabox();
    update();

    /*ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
    ctx.fillRect(
        camerabox.position.x,
        camerabox.position.y,
        camerabox.width,
        camerabox.height
    )*/
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
        y: player.y - 20,
      },
      width: 200,
      height: 60,
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
      750
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