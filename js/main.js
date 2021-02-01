var gNums = [];
var gBoard;

var gSize = 2;
var gEasy = 4;
var gMedium = 6;
var gHard = 8;

var gNeedNum = 0;

var gStartTime;
var gTime;
var gInterval;
var gBestTime;

var gPlay = document.querySelector('.play');

function init() {
    gPlay.style.display = 'none';
    createNums(gSize)
    gBoard = createBoard(gSize);
    renderBoard(gBoard);
}

function toggleGame() {
    clear()
    createNums(gSize)
    gBoard = createBoard(gSize);
    renderBoard(gBoard);
}

function clear() {
    gNeedNum = 0;
    clearInterval(gInterval);
    gInterval = null;
    var timer = document.querySelector(".timer");
    timer.innerHTML = 'TOUCH THE NUMS';
    var msg = document.querySelector(".msg-container");
    msg.style.display = 'none';
    // msg.innerText = `Best time: ${(gTime / 1000).toFixed(3)}`;
    gPlay.style.display = 'none';


}

function difficulty(elBtn) {
    if (elBtn.innerText === 'Easy')
        gSize = gEasy;

    else if (elBtn.innerText === 'Medium')
        gSize = gMedium;

    else if (elBtn.innerText === 'Hard')
        gSize = gHard;
    clear()
    init();
}

function startTimer() {
    var timeDisplay;
    gStartTime = new Date();
    var timer = document.querySelector(".timer");
    gInterval = setInterval(function() {
        gTime = new Date() - gStartTime;
        timeDisplay = (gTime / 1000).toFixed(3);
        timer.innerText = `${timeDisplay} SECS`
    }, 1);
}

function cellClicked(clickedNum) {
    var currNum = +clickedNum.innerText;
    // console.log(currNum);

    if (currNum === gNeedNum + 1) {
        gNeedNum++
        clickedNum.classList.add('done');
    }
    console.dir(clickedNum)
    if (currNum === 1 && clickedNum.classList.contains('done')) {
        startTimer();
        // console.log(clickedNum)
    };

    if (gNeedNum === gSize ** 2) {
        clearInterval(gInterval);
        gInterval = null;
        gNums = [];
        gPlay.style.display = 'block';
        var msg = document.querySelector(".msg-container");
        msg.style.display = 'block';
        msg.innerText = 'YOU WIN!'

    }
}


function createNums() {
    for (var i = 1; i <= gSize ** 2; i++) {
        gNums.push(i)
    }
}

function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = drawNum();
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            strHtml += `<td class="td" data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)">${cell}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}