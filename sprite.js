let sprite = {
    position: {
        x: 0,
        y: 0,
    },
    width: 0,
    height: 0,

    loaded: false,
    loadedBackground: false,
    elapsedFrames: 0
}

let currentFrame = 0;

let image = new Image();

function onload() {
    sprite.position.x = player.x
    sprite.position.y = player.y
    sprite.width = (image.width / player.frameRate) * player.scale
    sprite.height = image.height * player.scale
    sprite.loaded = true
}
  
function drawSprite() {
    onload()

    if (!image) return

    const cropbox = {
        position: {
            x: currentFrame * (image.width / player.frameRate),
            y: 0,
        },
        width: image.width / player.frameRate,
        height: image.height,
    }
  
    ctx.drawImage(
        image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        sprite.position.x - 30,
        sprite.position.y - 22,
        sprite.width,
        sprite.height
    )
}
  
function update() {
    drawSprite()
    if(!player.dead) updateFrames()
}
  
function updateFrames() {
    sprite.elapsedFrames++

    if (sprite.elapsedFrames % player.frameBuffer === 0) {
    if (currentFrame < player.frameRate - 1) currentFrame++
    else currentFrame = 0
    }
}