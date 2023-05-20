let levelStart = true;

let platform1 = {
    x : 0,
    y : 0,
    width : 0,
    height : 0,
    color : "#000000"
}

let spawner = {
    x : 0,
    y : 0,
}

function spawn({x, y}){
    if(levelStart){
        player.x = x;
        player.y = y;
        levelStart = false;
    }
}

function level1(){
    spawner.x = 30;
    spawner.y = 300;
    spawn(spawner);

    setPlatformValue(0, 729, 1500, 10, "#000000");
    setPlatformValue(800, 600, 100, 20, "#000000");
    setPlatformValue(600, 500, 100, 20, "#000000");
}

function setPlatformValue(x, y, width, height, color){
    platform1.x = x;
    platform1.y = y;
    platform1.width = width;
    platform1.height = height;
    platform1.color = color;

    platformCreator(platform1);
}

function platformCreator({x, y, width, height, color}){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    if(player.y + player.height + gravity.gravityForce >= y && player.y + player.height < y + 10){
        if(player.x + player.width > x && player.x < x + width){
            player.y = y - player.height;
            gravity.gravityForce = 0;
            velocity.y = 0;
        }
    }
}