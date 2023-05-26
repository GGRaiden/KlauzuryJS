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

for (let key in enemy.animations) {
    const image = new Image()
    image.src = enemy.animations[key].imageSrc

    enemy.animations[key].image = image
}

function switchEnemySprite(key) {
    if (enemyimage === enemy.animations[key].image || !enemysprite.loaded) return

    if (enemyimage === enemy.animations.Death.image) {
        if (enemycurrentFrame === enemy.animations.Death.frameRate - 1)
            enemy.dead = true
        return
    }

    if (
        enemyimage === enemy.animations.TakeHit.image &&
        enemycurrentFrame < enemy.animations.TakeHit.frameRate - 1
    ) return
    if (
        enemyimage === enemy.animations.Attack1.image  &&
        enemycurrentFrame < enemy.animations.Attack1.frameRate - 1
    ) return
    if (
        enemyimage === enemy.animations.Attack1left.image  &&
        enemycurrentFrame < enemy.animations.Attack1left.frameRate - 1
    ) return

    enemycurrentFrame = 0
    enemyimage = enemy.animations[key].image
    enemy.frameBuffer = enemy.animations[key].frameBuffer
    enemy.frameRate = enemy.animations[key].frameRate
}

function drawEnemy(){
    //ctx.fillStyle='blue';
    //ctx.fillRect(enemy.playerDetection.x, enemy.playerDetection.y, enemy.playerDetection.width, enemy.playerDetection.height);
    
    //ctx.fillStyle='red';
    //ctx.fillRect(enemy.attackBox.position.x, enemy.attackBox.position.y, enemy.attackBox.width, enemy.attackBox.height);

    enemyupdate();

    if (enemy.dead) return
    
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

    if (enemy.lastDirection == "left") enemy.attackBox.position.x = enemy.x + enemy.attackBox.offset.x
    else enemy.attackBox.position.x = enemy.x - enemy.attackBox.offset.x - 18
    enemy.attackBox.position.y = enemy.y + enemy.attackBox.offset.y
}

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

function takeEnemyHit() {
    enemy.health -= 5

    if (enemy.health <= 0) {
      switchEnemySprite('Death')
    } else switchEnemySprite('TakeHit')
}