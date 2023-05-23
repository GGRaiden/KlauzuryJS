let menubackground = new Image();
menubackground.src = "./img/backgrounds/menubackground.jpg"

let rect = canvas.getBoundingClientRect();

let mousePos = {
  x: 0,
  y: 0,
};

let levelMenuExecuted = false;

function menu() {
  if (!levelMenuExecuted) {
    titlescreen();
  }
  else {
    levelsmenu();
  }
}

function titlescreen() {
  ctx.filter = "brightness(30%)"
  ctx.drawImage(menubackground, 0, -390, menubackground.width, 1120);

  ctx.font = ("90px ThaleahFat")
  ctx.fillStyle = "#D46A00"
  ctx.filter = "brightness(100%)"
  ctx.fillText("JOURNEY OF THE KING", 359, 245);

  ctx.fillStyle = "#9A4D00"
  ctx.fillRect(661, 427, 173, 59)

  ctx.font = ("64px ThaleahFat")
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText("PLAY", 685, 471);

  if (mousePos.x >= 661 && mousePos.x <= 834 && mousePos.y >= 427 && mousePos.y <= 486) {
      levelMenuExecuted = true;
  }
}

function levelsmenu() {
  ctx.filter = "brightness(30%)"
  ctx.drawImage(menubackground, 0, -390, menubackground.width, 1120);

  ctx.filter = "brightness(100%)"
  ctx.fillStyle = "#333333"
  ctx.fillRect(331, 105, 839, 521)

  ctx.fillStyle = "#9A4D00";
  ctx.fillRect(344, 118, 60, 59);
  ctx.fillRect(344, 275, 173, 59);
  ctx.fillRect(557, 275, 173, 59);
  ctx.fillRect(770, 275, 173, 59);
  ctx.fillRect(983, 275, 173, 59);
  ctx.fillRect(619, 408, 263, 59);

  ctx.font = ("48px ThaleahFat")
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText("X", 362, 158);

  ctx.fillText("LEVEL 1", 356, 315);
  ctx.fillText("LEVEL 2", 564, 315);
  ctx.fillText("LEVEL 3", 777, 315);
  ctx.fillText("LEVEL 4", 990, 315);

  ctx.fillText("FULL STORY", 638, 448);

  if (mousePos.x >= 344 && mousePos.x <= 404 && mousePos.y >= 118 && mousePos.y <= 177) {
    levelMenuExecuted = false;
  }
  if (mousePos.x >= 344 && mousePos.x <= 507 && mousePos.y >= 275 && mousePos.y <= 334) {
    gamecontroller.level = 1;
  }
  if (mousePos.x >= 557 && mousePos.x <= 730 && mousePos.y >= 275 && mousePos.y <= 334) {
    gamecontroller.level = 2;
  }
  if (mousePos.x >= 770 && mousePos.x <= 943 && mousePos.y >= 275 && mousePos.y <= 334) {
    gamecontroller.level = 3;
  }
  if (mousePos.x >= 983 && mousePos.x <= 1156 && mousePos.y >= 275 && mousePos.y <= 334) {
    gamecontroller.level = 4;
  }
  if (mousePos.x >= 619 && mousePos.x <= 882 && mousePos.y >= 408 && mousePos.y <= 467) {
  }
}

function getMousePos(event) {
  mousePos.x = event.clientX - rect.left;
  mousePos.y = event.clientY - rect.top;
}