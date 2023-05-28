//enemy sprite values
let enemysprite = {
    position: {
        x: 0,
        y: 0,
    },
    width: 0,
    height: 0,

    loaded: false,
    elapsedFrames: 0
}

let enemycurrentFrame = 0;

let enemyimage = new Image();


//set enemy sprite values onload of image
function enemyonload() {
    enemysprite.position.x = enemy.x
    enemysprite.position.y = enemy.y
    enemysprite.width = (enemyimage.width / enemy.frameRate) * enemy.scale
    enemysprite.height = enemyimage.height * enemy.scale
    enemysprite.loaded = true
}

//drawing enemy sprite
function drawEnemySprite() {
    enemyonload()

    if (!enemyimage) return

    const cropbox = {
        position: {
            x: enemycurrentFrame * (enemyimage.width / enemy.frameRate),
            y: 0,
        },
        width: enemyimage.width / enemy.frameRate,
        height: enemyimage.height,
    }
  
    ctx.drawImage(
        enemyimage,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        enemysprite.position.x - 42,
        enemysprite.position.y - 34,
        enemysprite.width,
        enemysprite.height
    )
}
  
function enemyupdate() {
    drawEnemySprite()
    updateEnemyFrames()
}

//updating enemy sprite frames
function updateEnemyFrames() {
    if (enemy.dead) return
    
    enemysprite.elapsedFrames++

    if (enemysprite.elapsedFrames % enemy.frameBuffer === 0) {
        if (enemycurrentFrame < enemy.frameRate - 1) enemycurrentFrame++
        else enemycurrentFrame = 0
    }
}