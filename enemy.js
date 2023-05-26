let enemy = {
    x: 900,
    y: 530,
    width : 18,
    height : 30,
    health: 100,
    dead: false,

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
    Jump: {
        imageSrc: './img/enemy/Jump.png',
        frameRate: 2,
        frameBuffer: 5,
    },
    Fall: {
        imageSrc: './img/enemy/Fall.png',
        frameRate: 2,
        frameBuffer: 5,
    },
    Attack1: {
        imageSrc: './img/enemy/Attack1.png',
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
    offset: {
        x: -170,
        y: 50
    },
    width: 170,
    height: 50
    },

    velocity : {
        x: 0,
        y: 0
    },

    movement : {
        left: false,
        right: false,
    }
}

for (let key in enemy.animations) {
    const image = new Image()
    image.src = enemy.animations[key].imageSrc

    enemy.animations[key].image = image
}

function switchEnemySprite(key) {
    if (enemyimage === enemy.animations.Death.image) {
        if (enemycurrentFrame === enemy.animations.Death.frameRate - 1)
            enemy.dead = true
            return
    }

    if (
        enemyimage === enemy.animations.TakeHit.image &&
        enemycurrentFrame < enemy.animations.TakeHit.frameRate - 1
    )
    return

    if (enemyimage === enemy.animations[key].image || !enemysprite.loaded) return

    enemycurrentFrame = 0
    enemyimage = enemy.animations[key].image
    enemy.frameBuffer = enemy.animations[key].frameBuffer
    enemy.frameRate = enemy.animations[key].frameRate

    //console.log(enemyimage === enemy.animations[key].image)
}

function drawEnemy(){
    enemyupdate();

    if (enemy.dead) return
    
    if (player.x < enemy.x && !player.dead) {
        enemy.x -= 1
        enemy.velocity.x = -1
        switchEnemySprite('Run')   
    } else if (player.x > enemy.x && !player.dead){
        enemy.x += 1
        enemy.velocity.x = 1
        switchEnemySprite('Run')
    } else {
        switchEnemySprite('Idle')
    }

    console.log(enemyimage !== enemy.animations.Run.image)
}

function takeEnemyHit() {
    enemy.health -= 10

    if (enemy.health <= 0) {
      switchEnemySprite('Death')
    } else switchEnemySprite('TakeHit')
}