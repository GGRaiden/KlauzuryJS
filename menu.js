let menubackground = new Image();
menubackground.src = "./img/backgrounds/menubackground.jpg"

let rect = canvas.getBoundingClientRect();

//mouse position values
let mousePos = {
  x: 0,
  y: 0,
};

let levelMenuExecuted = false;


//changing between two menus
function menu() {
  if (!levelMenuExecuted) {
    titlescreen();
  }
  else {
    levelsmenu();
  }
}


//title menu
function titlescreen() {
  //background
  ctx.filter = "brightness(30%)"
  ctx.drawImage(menubackground, 0, -390, menubackground.width, 1120);

  //title text
  ctx.font = ("90px ThaleahFat")
  ctx.fillStyle = "#D46A00"
  ctx.filter = "brightness(100%)"
  ctx.fillText("JOURNEY OF THE KING", 359, 245);

  //play button background
  ctx.fillStyle = "#9A4D00"
  ctx.fillRect(661, 447, 173, 59)

  //play button text
  ctx.font = ("64px ThaleahFat")
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText("PLAY", 685, 491);

  if (gamecontroller.level == 0){
    //checking whether the mouse is within range of the play button
    if (mousePos.x >= 661 && mousePos.x <= 834 && mousePos.y >= 447 && mousePos.y <= 506) {
      levelMenuExecuted = true;
    }
  }
  
  document.querySelector('#displayText').style.display = 'none'
}


//level menu
function levelsmenu() {
  //background
  ctx.filter = "brightness(30%)"
  ctx.drawImage(menubackground, 0, -390, menubackground.width, 1120);

  //levelmenu background
  ctx.filter = "brightness(100%)"
  ctx.fillStyle = "#333333"
  ctx.fillRect(331, 105, 839, 521)


  //buttons background
  ctx.fillStyle = "#9A4D00";
  ctx.fillRect(344, 118, 60, 59);
  ctx.fillRect(344, 275, 173, 59);
  ctx.fillRect(557, 275, 173, 59);
  ctx.fillRect(770, 275, 173, 59);
  ctx.fillRect(983, 275, 173, 59);
  ctx.fillRect(619, 378, 263, 59);

  //buttons text
  ctx.font = ("48px ThaleahFat")
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText("X", 362, 158);

  ctx.fillText("LEVEL 1", 356, 315);
  ctx.fillText("LEVEL 2", 564, 315);
  ctx.fillText("LEVEL 3", 777, 315);
  ctx.fillText("LEVEL 4", 990, 315);

  ctx.fillText("FULL STORY", 638, 418);

  if (gamecontroller.level == 0){
    //checking whether the mouse is within range of an individual button
    //exit button
    if (mousePos.x >= 344 && mousePos.x <= 404 && mousePos.y >= 118 && mousePos.y <= 177) {
      levelMenuExecuted = false;
    }
    //level 1 button
    if (mousePos.x >= 344 && mousePos.x <= 507 && mousePos.y >= 275 && mousePos.y <= 334) {
      gamecontroller.level = 1;
      gamecontroller.fullstory = false;
    }
    //level 2 button
    if (mousePos.x >= 557 && mousePos.x <= 730 && mousePos.y >= 275 && mousePos.y <= 334) {
      gamecontroller.level = 2;
      gamecontroller.fullstory = false;
    }
    //level 3 button
    if (mousePos.x >= 770 && mousePos.x <= 943 && mousePos.y >= 275 && mousePos.y <= 334) {
      gamecontroller.level = 3;
      gamecontroller.fullstory = false;
    }
    //level 4 button
    if (mousePos.x >= 983 && mousePos.x <= 1156 && mousePos.y >= 275 && mousePos.y <= 334) {
      gamecontroller.level = 4;
      gamecontroller.fullstory = false;
    }
    //full story button
    if (mousePos.x >= 619 && mousePos.x <= 882 && mousePos.y >= 378 && mousePos.y <= 437) {
      gamecontroller.level = 1;
      gamecontroller.fullstory = true;
    }
  }
}

//mouse position check
function getMousePos(event) {
  mousePos.x = event.clientX - rect.left;
  mousePos.y = event.clientY - rect.top;
}