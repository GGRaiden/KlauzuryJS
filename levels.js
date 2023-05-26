let gamecontroller = {
    level: 3,
    levelStart: true
}

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

function levelController(){
    switch(gamecontroller.level){
        case 0:
            menu();
            break;
        case 1:
            level1();
            break;
        case 2:
            level2();
            break;
        case 3:
            level3();
            break;
        case 4:
            level4();
            break;
        default:
            gamecontroller.level = 0;
            break;
    }
}

function spawn({x, y}){
    if(gamecontroller.levelStart){
        player.x = x;
        player.y = y;
        gamecontroller.levelStart = false;
    }
}

function level1(){
    spawner.x = 30;
    spawner.y = 450;
    spawn(spawner);
    background.src = "./img/backgrounds/background1.png"

    setPlatformValue(0, 729, 1500, 10, "#000000");
    setPlatformValue(800, 600, 100, 20, "#000000");
    setPlatformValue(600, 500, 100, 20, "#000000");
}

function level2(){
    background.src = "./img/backgrounds/background2.png"
}

function level3(){
    spawner.x = 30;
    spawner.y = 530;
    spawn(spawner);
    background.src = "./img/backgrounds/background3.png"

    setPlatformValue(0, 560, 1500, 10, "rgba(255, 255, 255, 0)");

    drawEnemy();
    switchEnemySprite("Idle")
}

function level4(){
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