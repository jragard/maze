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
let prevCell;
let playerDiv;

for (let i = 0; i < map.length; i++) {
    mapArray.push([]);
    mapArray[i].push(...map[i].split(""));
}

function createDiv(type, row, cell) {
    divEl = document.createElement("div");
    divEl.className = "cell " + type;

    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    divEl.dataset['cell'] = cell;
    divEl.dataset['row'] = row;

    document.getElementById("container").appendChild(divEl);
}

function createPlayer() {
    playerDiv = document.createElement("div");
    playerDiv.className = "player";
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    [startCell] = document.getElementsByClassName("start");
    startCell.appendChild(playerDiv);
    prevCell = startCell;
}

function createMaze() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i].substr(j, 1) === "W") {
                createDiv("wall", i, j);
            }
            if (map[i].substr(j, 1) === " ") {
                createDiv("floor", i, j);
            }
            if (map[i].substr(j, 1) === "S") {
                createDiv("start", i, j);
            }
            if (map[i].substr(j, 1) === "F") {
                createDiv("finish", i, j);
            }
        }
    }
}


window.onload = function () {
    createMaze();
    createPlayer();
}

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    outerloop:
    for (let i = 0; i < mapArray.length; i++) {

        innerloop:
        for (let j = 0; j < mapArray[i].length; j++) {

            if (mapArray[i][j] === "S" && mapArray[i][j + 1] === " " && keyName === "ArrowRight") {
                mapArray[i][j] = " ";
                mapArray[i][j + 1] = "S";
                // https://stackoverflow.com/questions/4559032/easy-to-understand-definition-of-asynchronous-event
                // https://rowanmanning.com/posts/javascript-for-beginners-async/
                moveCell(i, j + 1);
                break;
            } if (mapArray[i][j] === "S" && mapArray[i][j - 1] === " " && keyName === "ArrowLeft") {
                mapArray[i][j] = " ";
                mapArray[i][j - 1] = "S";
                moveCell(i, j - 1);
                break;
            } if (mapArray[i][j] === "S" && mapArray[i - 1][j] === " " && keyName === "ArrowUp") {
                mapArray[i][j] = " ";
                mapArray[i - 1][j] = "S";
                moveCell(i - 1, j);
                break;
            } if (mapArray[i][j] === "S" && mapArray[i + 1][j] === " " && keyName === "ArrowDown") {
                mapArray[i][j] = " ";
                mapArray[i + 1][j] = "S";
                moveCell(i + 1, j);
                break outerloop;
            } if (mapArray[i][j] === "S" && mapArray[i][j + 1] === "F" && keyName === "ArrowRight") {
                printWin();
                break;
            }

        }


    }


});

function moveCell(nextRowPos, nextCellPos) {
    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#CSS_access
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    const nextCell = document.querySelector(`.cell[data-row='${nextRowPos}'][data-cell='${nextCellPos}']`);
    prevCell.removeChild(playerDiv);
    nextCell.appendChild(playerDiv);
    prevCell = nextCell;
}

function printWin() {
    let destination = document.getElementById("winMessage");
    text = document.createTextNode("You Win!");
    destination.appendChild(text);
}