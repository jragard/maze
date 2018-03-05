const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];


// ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]
// ["W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", " ", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", " ", " ", "W", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "F"]
// ["S", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W"]
// ["W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W"]
// ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]

const mapArray = [];

for (let i = 0; i < map.length; i++) {
    mapArray.push([]);
    mapArray[i].push(...map[i].split(""));
}

function createDiv(type) {
    divEl = document.createElement("div");
    divEl.className = "cell " + type;
    document.getElementById("container").appendChild(divEl);
}

function createPlayer() {
    playerDiv = document.createElement("div");
    playerDiv.className = "player";
    startCell = document.getElementsByClassName("start");
    startCell[0].appendChild(playerDiv);
}

function createMaze() {
    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
            if (map[i].substr(j, 1) === "W") {
                createDiv("wall");
            }
            if (map[i].substr(j, 1) === " ") {
                createDiv("floor");
            }
            if (map[i].substr(j, 1) === "S") {
                createDiv("start");
            }
            if (map[i].substr(j, 1) === "F") {
                createDiv("finish");
            }
        }
    }
}


window.onload = function () {
    createMaze();
    createPlayer();
}

let startTop = 440;
let startLeft = 300;

document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    
    for (i = 0; i < mapArray.length; i++) {
        for (j = 0; j < mapArray[i].length; j++) {
            if (mapArray[i][j] === "S" && mapArray[i][j + 1] === " " && keyName === "ArrowRight") {
                startLeft += 40;
                mapArray[i][j] = " ";
                mapArray[i][j + 1] = "S";
                break;
          } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === " " && keyName === "ArrowLeft") {
              startLeft -= 40;
              mapArray[i][j] = " ";
              mapArray[i][j - 1] = "S";
              break;
          } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === " " && keyName === "ArrowUp") {
              startTop -= 40;
              mapArray[i][j] = " ";
              mapArray[i - 1][j] = "S";
              break;
          } if (mapArray [i][j] === "S" && mapArray[i + 1][j] === " " && keyName === "ArrowDown") {
              startTop += 40;
              mapArray[i][j] = " ";
              mapArray[i + 1][j] = "S";
              break;
          } if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "F" && keyName === "ArrowRight") {
              startLeft += 40;
              printWin();
              break;
          }

    }
}

// ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]
// ["W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", "W", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", " ", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W"]
// ["W", " ", "W", " ", " ", " ", "W", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "F"]
// ["S", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W"]
// ["W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", "W", " ", "W", " ", "W", " ", " ", " ", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", "W", "W", "W", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W"]
// ["W", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W"]
// ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]

    document.getElementsByClassName("player")[0].style.top = startTop + "px";
    document.getElementsByClassName("player")[0].style.left = startLeft + "px";

});

function printWin() {
    let destination = document.getElementById("winMessage");
    text = document.createTextNode("You Win!");
    destination.appendChild(text);
}