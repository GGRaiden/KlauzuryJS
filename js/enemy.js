//enemy values
let enemy = {
    x: 1400,
    y: 530,
    width : 18,
    height : 30,

    health: 100,
    dead: false,
    isAttacking: false,

    imageSrc: './img/enemy/Idle.png',
    frameRate: 1,
    frameBuffer: 3,
    scale: 0.5,
    animations: {
    Idle: {
        imageSrc: './img/enemy/Idle.png',
        frameRate: 4,
        frameBuffer: 6,
    },
    Run: {
        imageSrc: './img/enemy/Run.png',
        frameRate: 8,
        frameBuffer: 5,
    },
    RunRight: {
        imageSrc: './img/enemy/RunRight.png',
        frameRate: 8,
        frameBuffer: 5,
    },
    Attack1: {
        imageSrc: './img/enemy/Attack1.png',
        frameRate: 4,
        frameBuffer: 5,
    },
    Attack1left: {
        imageSrc: './img/enemy/Attack1left.png',
        frameRate: 4,
        frameBuffer: 5,
    },
    TakeHit: {
        imageSrc: './img/enemy/TakeHit.png',
        frameRate: 3,
        frameBuffer: 5,
    },
    Death: {
        imageSrc: './img/enemy/Death.png',
        frameRate: 7,
        frameBuffer: 5,
    }
    },

    attackBox: {
        position: {
            x: 0,
            y: 0,
        },
        offset: {
            x: -34,
            y: 0
        },
        width: 34,
        height: 20
    },

    movement : {
        left: false,
        right: false,
    },

    playerDetection : {
        x: 0,
        y: 0,
        width: 150,
        height: 50
    },

    lastDirection: "left"
}

//adding key in enemy animation
for (let key in enemy.animations) {
    const image = new Image()
    image.src = enemy.animations[key].imageSrc

    enemy.animations[key].image = image
}

//switching enemy sprite depending on the key
function switchEnemySprite(key) {
    //same sprite - return
    if (enemyimage === enemy.animations[key].image || !enemysprite.loaded) return

    //overriding all other animations with the attack animation
    if (
        enemyimage === enemy.animations.Attack1.image  &&
        enemycurrentFrame < enemy.animations.Attack1.frameRate - 1
    ) return
    
    //overriding all other animations with the attack left animation
    if (
        enemyimage === enemy.animations.Attack1left.image  &&
        enemycurrentFrame < enemy.animations.Attack1left.frameRate - 1
    ) return

    //override when player gets hit
    if (
        enemyimage === enemy.animations.TakeHit.image &&
        enemycurrentFrame < enemy.animations.TakeHit.frameRate - 1
    ) return
    
    //override when player dies
    if (enemyimage === enemy.animations.Death.image) {
        if (enemycurrentFrame === enemy.animations.Death.frameRate - 1)
            enemy.dead = true
        return
    }

    enemycurrentFrame = 0
    enemyimage = enemy.animations[key].image
    enemy.frameBuffer = enemy.animations[key].frameBuffer
    enemy.frameRate = enemy.animations[key].frameRate
}

function drawEnemy(){
    //player detection range collision
    //ctx.fillStyle='blue';
    //ctx.fillRect(enemy.playerDetection.x, enemy.playerDetection.y, enemy.playerDetection.width, enemy.playerDetection.height);

    //enemy attack box range collision
    //ctx.fillStyle='red';
    //ctx.fillRect(enemy.attackBox.position.x, enemy.attackBox.position.y, enemy.attackBox.width, enemy.attackBox.height);

    //calling for enemy sprite animation
    enemyupdate();

    if (enemy.dead) return
    
    //changing enemy direction according to the player's position + switching animations
    if (player.x < enemy.x && !player.dead) {
        enemy.x -= 2
        enemy.lastDirection = "left"
        switchEnemySprite('Run')
    } else if (player.x > enemy.x && !player.dead){
        enemy.x += 2
        enemy.lastDirection = "right"
        switchEnemySprite('RunRight')
    } else {
        switchEnemySprite('Idle')
    }

    enemy.playerDetection.x = enemy.x - 70;
    enemy.playerDetection.y = enemy.y - 20;

    //switching attack box position depanding on what direction the enemy is facing
    if (enemy.lastDirection == "left") enemy.attackBox.position.x = enemy.x + enemy.attackBox.offset.x
    else enemy.attackBox.position.x = enemy.x - enemy.attackBox.offset.x - 18
    enemy.attackBox.position.y = enemy.y + enemy.attackBox.offset.y

    if (enemy.health <= 0) switchEnemySprite('Death')
}

//if player is in player detection collision - enemy starts attacking
function enemyattack(){
    if (
      rectangularCollisionPlayer({
        rectangle1: enemy,
        rectangle2: player
      }) && !player.dead && !enemy.dead
    ) {
      enemy.isAttacking = true;
      if (enemy.lastDirection == "left") switchEnemySprite('Attack1')
      else switchEnemySprite('Attack1left')
    }

    setTimeout(enemyattack, 500)
}

enemyattack();

//enemy take hit
function takeEnemyHit() {
    enemy.health -= 5
    switchEnemySprite('TakeHit')
}