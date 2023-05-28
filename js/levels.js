//current level
let gamecontroller = {
    level : 0,
    levelStart : true,
    fullstory : false,
    defetedenemy : false
}

//platforms values
let platform = {
    x : 0,
    y : 0,
    width : 0,
    height : 0,
    color : "#000000"
}

//deathplatforms values
let deathplatform = {
    x : 0,
    y : 0,
    width : 0,
    height : 0,
    color : "#000000"
}

//start values
let startvalues = {
    x : 0,
    y : 0,
}

//exit values
let exit = {
    x : 0,
    y : 0,
    width : 0,
    height : 0
}

//lava values
let lava = {
    y : 729,
    height : 10,
    text: false
}

//treasure img
let treasure = new Image()
treasure.src = "./img/treasure.png"

//exitdoors img
let exitdoors = new Image()
exitdoors.src = "./img/doors.png"

//level changing
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

//set player position based on start values
function start({x, y}){
    if(gamecontroller.levelStart){
        player.x = x;
        player.y = y;
        camera.position.x = 0
        camera.position.y = -320
        gamecontroller.levelStart = false;
    }
}

//level 1
function level1(){
    camerabox.height = 150
    startvalues.x = 30;
    startvalues.y = 540;
    start(startvalues);
    background.src = "./img/backgrounds/background1.png"

    setPlatformsValue(930, 581, 100, 10, "#604040");
    setPlatformsValue(0, 590, 180, 10, "#604040");
    setPlatformsValue(1150, 432, 350, 10, "#604040");
    setPlatformsValue(620, 590, 100, 10, "#604040");
    setPlatformsValue(420, 448, 100, 10, "#604040");
    setPlatformsValue(0, 300, 250, 10, "#604040");
    setPlatformsValue(858, 290, 100, 10, "#604040");
    setPlatformsValue(610, 200, 100, 10, "#604040");
    setPlatformsValue(892, 50, 100, 10, "#604040");
    setPlatformsValue(1300, 161, 200, 10, "#604040");

    setDeathPlatformsValue(0, lava.y, 1500, lava.height, "#8E0000")

    setLevelExitValue(1435, 92, 100, 100)

    //show lava text
    if (!lava.text){
        document.querySelector('#displayText').style.display = 'flex'
        document.querySelector('#displayText').innerHTML = 'Lava is rising, run!'
    } else document.querySelector('#displayText').style.display = 'none'
    
    //the lava text is shown for the first five seconds after the level starts
    function textlava(){
        setInterval(function() {
            lava.text = true
        }, 5000);
    }
    
    textlava();
    clearInterval(textlava)
}

//lifting of lava every 0.3 seconds
function lavarise(){
    lava.y -= 5;
    lava.height += 5;
    setTimeout(lavarise, 300)
}

lavarise()

//level 2
function level2(){
    camerabox.height = 80
    startvalues.x = 30;
    startvalues.y = 530;
    start(startvalues);
    background.src = "./img/backgrounds/background2.png"

    setPlatformsValue(0, 729, 1500, 10, "#867840");
    setPlatformsValue(355, 633, 100, 10, "#867840");
    setPlatformsValue(620, 633, 100, 10, "#867840");
    setPlatformsValue(880, 633, 100, 10, "#867840");
    setPlatformsValue(1128, 519, 100, 10, "#867840");
    setPlatformsValue(880, 380, 100, 10, "#867840");
    setPlatformsValue(620, 380, 100, 10, "#867840");
    setPlatformsValue(355, 380, 100, 10, "#867840");
    setPlatformsValue(80, 277, 100, 10, "#867840");
    setPlatformsValue(355, 105, 100, 10, "#867840");
    setPlatformsValue(620, 105, 100, 10, "#867840");
    setPlatformsValue(880, 105, 100, 10, "#867840");
    setPlatformsValue(1238, 93, 262, 10, "#867840");

    setDeathPlatformsValue(250, 729, 1250, 10, "#00A905")

    setLevelExitValue(1435, 24, 100, 100)
}

//level 3
function level3(){
    camerabox.height = 80
    startvalues.x = 30;
    startvalues.y = 530;
    start(startvalues);
    background.src = "./img/backgrounds/background3.png"

    setPlatformsValue(0, 560, 1500, 10, "rgba(255, 255, 255, 0)");

    if(gamecontroller.defetedenemy) setLevelExitValue(1435, 491, 100, 100)

    drawEnemy();

    if (player.health <= 0 && keys.r.pressed) restart()
}

//restart level 3
function restart(){
    player.health = 100
    enemy.health = 100
    player.dead = false
    switchSprite('Fall')

    gamecontroller.levelStart = true;
    start(startvalues);

    enemy.x = 1400
    enemy.y = 530

    document.querySelector('#displayText').style.display = 'none'

    gsap.to('#playerHealth', {
        width: player.health + '%'
    })
    gsap.to('#enemyHealth', {
        width: enemy.health + '%'
    })
}

//level 4
function level4(){
    camerabox.height = 80
    startvalues.x = 30;
    startvalues.y = 550;
    start(startvalues);
    background.src = "./img/backgrounds/background4.png"
    setPlatformsValue(0, 588, 1500, 10, "rgba(255, 255, 255, 0)");

    ctx.drawImage(treasure, 1400, 529, 60, 60);

    //check if the player has entered the sprite with the treasure, if so, show the text and reload the page after 5 seconds
    if(player.y + 30 >= 529 && player.y + player.height - 30 <= 529 + 30){
        if(player.x + 15 >= 1400 && player.x + player.width - 15 <= 1400 + 25){
            document.querySelector('#displayText').style.display = 'flex'
            document.querySelector('#displayText').innerHTML = 'You won!'
            setTimeout(function(){
                window.location.reload();
             }, 5000);
        }
    }
}

//setting platforms values to platforms creator
function setPlatformsValue(x, y, width, height, color){
    platform.x = x;
    platform.y = y;
    platform.width = width;
    platform.height = height;
    platform.color = color;

    platformsCreator(platform);
}

//creating platforms
function platformsCreator({x, y, width, height, color}){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    //collision between player and platforms, if player is on top of the platfrom - stop player
    if(player.y + player.height + gravity.gravityForce >= y && player.y + player.height < y + 10){
        if(player.x + player.width > x && player.x < x + width){
            player.y = y - player.height;
            gravity.gravityForce = 0;
            velocity.y = 0;
            player.grounded = true
        }
    }
}

//setting death platforms values to death platforms creator
function setDeathPlatformsValue(x, y, width, height, color){
    deathplatform.x = x;
    deathplatform.y = y;
    deathplatform.width = width;
    deathplatform.height = height;
    deathplatform.color = color;

    deathCreator(deathplatform)
}

//creating death platforms
function deathCreator({x, y, width, height, color}){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    //return the player to the beginning of the level if he touches the death platforms
    if(player.y + player.height >= y && player.y <= y + height){
        if(player.x + player.width >= x + 10 && player.x <= x + width - 10){
            player.x = startvalues.x;
            player.y = startvalues.y;
            camera.position.x = 0
            camera.position.y = -400
            lava.height = 10
            lava.y = 729
            movement.canJump = false;
        }
    }
}

//setting level exit values to level exit creator
function setLevelExitValue(x, y, width, height){
    exit.x = x;
    exit.y = y;
    exit.width = width;
    exit.height = height;

    levelExit(exit);
}

//creating level exit
function levelExit({x, y, width, height}){
    ctx.drawImage(exitdoors, x, y, width, height)

    //the player touches the level exit - move him to the next level
    if(player.y >= y - player.height/2 && player.y + player.height <= y + height + player.height/2){
        if(player.x >= x - player.width && player.x + player.width <= x + width + player.width){
            gamecontroller.level++
            document.querySelector('#displayText').style.display = 'none'

            //not turning on full story mode - turn on menu
            if(gamecontroller.fullstory == false) {
                levelMenuExecuted = false
                gamecontroller.level = 0;
            }

            gamecontroller.levelStart = true;
            movement.canJump = false;
        }
    }
}