let nrows = 6;
let ncols = 5;
let target = targetWords[Math.floor(targetWords.length * Math.random())];
let currentGuess = '';
let activeRow = 0;
let activeCol = 0;
let cells = [];
let gameIsOver = false;
function setUpGrid() {
    let grid = document.getElementById("grid");
    for (let r = 0; r < nrows; ++r) {
        // let row = document.createElement("div");
        // row.classList.add('grid-row');
        let row_ = [];
        for (let c = 0; c < ncols; ++c) {
            let cell = document.createElement("div");
            cell.classList.add('grid-cell');
            if (r === activeRow && c === activeCol) {
                cell.classList.add("active");
            }
            grid.appendChild(cell);
            row_.push(cell);
        }
        // grid.appendChild(row);
        cells.push(row_);
    }
}
function deactivateCell() {
    let cell = cells[activeRow][activeCol];
    cell.classList.remove('active');
}
function clearCell() {
    let cell = cells[activeRow][activeCol];
    cell.innerHTML = '';
}
function activateCell() {
    let cell = cells[activeRow][activeCol];
    cell.classList.add('active');
}
function setCell(contents) {
    let cell = cells[activeRow][activeCol];
    cell.innerHTML = contents;
}
function colorKey(letter, color) {
    let key = document.getElementById("key_" + letter);
    if (color === 'green') {
        key.classList.remove('yellow');
        key.classList.add('green');
    }
    if (color === 'yellow') {
        if (key.classList.contains('green'))
            return;
        key.classList.add('yellow');
    }
    if (color === 'gray') {
        if (key.classList.contains('green'))
            return;
        if (key.classList.contains('yellow'))
            return;
        key.classList.add('gray');
    }
}
function shake(element) {
    animate(element, 'shake');
}
function is_valid_word(guess) {
    return acceptedWords.has(guess);
}
function animate(element, anim) {
    function handleEnd() {
        element.classList.remove(anim);
        element.removeEventListener('animationend', handleEnd);
    }
    element.classList.add(anim);
    element.addEventListener('animationend', handleEnd);
}
function flipAndColor(element, color, delay) {
    function handleEnd() {
        element.classList.remove('flip_right_b');
        element.removeEventListener('animationend', handleEnd);
    }
    function handleMiddle() {
        element.classList.remove('flip_right_a');
        element.classList.add(color);
        element.classList.add('flip_right_b');
        element.removeEventListener('animationend', handleMiddle);
        element.addEventListener('animationend', handleEnd);
    }
    function handleStart() {
        element.classList.add('flip_right_a');
        element.addEventListener('animationend', handleMiddle);
    }
    window.setTimeout(handleStart, 1000 * delay);
}
function handleKeyboardKey(e) {
    // document.addEventListener("keyup", (e) => {
    let pressedKey = String(e.key);
    if (pressedKey === "Backspace") {
        handleKey('del');
    }
    if (pressedKey === "Delete") {
        handleKey('del');
    }
    if (pressedKey === "Enter") {
        handleKey('enter');
    }
    if (pressedKey.length > 1) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();
    if (!pressedKey.match("[a-z]")) {
        return;
    }
    handleKey(pressedKey);
}
function clearAndEraseColor(element) {
    element.innerHTML = '';
    element.classList.remove('green');
    element.classList.remove('yellow');
    element.classList.remove('gray');
}
let explanationAnimationDone = false;
let explanationTimeout;
function showExplanation(show) {
    let help = document.getElementById("explanation-wrapper");
    if (show) {
        help.style.display = 'flex';
    }
    else {
        help.style.display = 'none';
    }
    if (!explanationAnimationDone) {
        let grid = document.getElementById("help-grid");
        let cells = grid.children;
        function step(n) {
            let delay = 2000;
            if (n == 0) {
                clearAndEraseColor(cells[0]);
                clearAndEraseColor(cells[1]);
                clearAndEraseColor(cells[2]);
                clearAndEraseColor(cells[3]);
                clearAndEraseColor(cells[4]);
                document.getElementById("help-instruction-0").style.visibility = 'visible';
                document.getElementById("help-instruction-1").style.visibility = 'hidden';
                document.getElementById("help-instruction-2").style.visibility = 'hidden';
                delay = 600;
            }
            else if (n == 1) {
                cells[0].innerHTML = 'h';
                delay = 600;
            }
            else if (n == 2) {
                cells[1].innerHTML = 'a';
                delay = 500;
            }
            else if (n == 3) {
                cells[2].innerHTML = 'l';
                delay = 400;
            }
            else if (n == 4) {
                cells[3].innerHTML = 'l';
                delay = 400;
            }
            else if (n == 5) {
                cells[4].innerHTML = 'o';
                delay = 600;
            }
            else if (n == 6) {
                document.getElementById("help-instruction-1").style.visibility = 'visible';
                delay = 800;
            }
            else if (n == 7) {
                flipAndColor(cells[0], 'gray', 0 * 0.12);
                flipAndColor(cells[1], 'green', 1 * 0.12);
                flipAndColor(cells[2], 'yellow', 2 * 0.12);
                flipAndColor(cells[3], 'gray', 3 * 0.12);
                flipAndColor(cells[4], 'yellow', 4 * 0.12);
                delay = 1200;
            }
            else if (n == 8) {
                document.getElementById("help-instruction-2").style.visibility = 'visible';
                delay = 10000;
                explanationAnimationDone = true;
            }
            if (n < 8) {
                let nextStep = (n + 1) % 10;
                explanationTimeout = window.setTimeout(() => step(nextStep), delay);
            }
        }
        if (show) {
            window.setTimeout(() => step(0), 0);
        }
    }
    if (!show) {
        if (explanationTimeout !== undefined) {
            clearTimeout(explanationTimeout);
            explanationTimeout = undefined;
        }
    }
}
function showEndOfGame(show) {
    let eog = document.getElementById("end-of-game-wrapper");
    if (show) {
        eog.style.display = 'flex';
    }
    else {
        eog.style.display = 'none';
    }
}
function setEndOfGameMessage(msg) {
    let elem = document.getElementById("end-of-game-message");
    elem.innerHTML = msg;
}
function handleKey(name) {
    if (gameIsOver) {
        return;
    }
    if (name.toLowerCase() === 'enter') {
        if (activeCol !== ncols) {
            return;
        }
        console.assert(currentGuess.length === ncols);
        if (!is_valid_word(currentGuess)) {
            for (let c = 0; c < ncols; ++c) {
                cells[activeRow][c].classList.remove('shake');
                shake(cells[activeRow][c]);
            }
            return;
        }
        let reference = target.split('');
        // greens
        for (let c = 0; c < ncols; ++c) {
            if (currentGuess[c] === reference[c]) {
                flipAndColor(cells[activeRow][c], 'green', c * 0.12);
                reference[c] = '_';
                let letter = currentGuess[c];
                colorKey(letter, 'green');
            }
        }
        // yellows & grays
        for (let c = 0; c < ncols; ++c) {
            if (currentGuess[c] === target[c])
                continue;
            let found = false;
            for (let d = 0; d < ncols; ++d) {
                if (currentGuess[c] === reference[d]) {
                    flipAndColor(cells[activeRow][c], 'yellow', c * 0.12);
                    reference[d] = '_';
                    let letter = currentGuess[c];
                    colorKey(letter, 'yellow');
                    found = true;
                    break;
                }
            }
            if (!found) {
                flipAndColor(cells[activeRow][c], 'gray', c * 0.12);
                let letter = currentGuess[c];
                colorKey(letter, 'gray');
            }
        }
        if (currentGuess === target) {
            gtag('event', 'EndOfGame', {
                'target': target
            });
            setEndOfGameMessage("Gewonnen!");
            gameIsOver = true;
            setTimeout(() => showEndOfGame(true), 1000);
        }
        else if (activeRow < nrows - 1) {
            activeRow += 1;
            activeCol = 0;
            activateCell();
            currentGuess = '';
        }
        else {
            setEndOfGameMessage("Het woord was " + target);
            gameIsOver = true;
            setTimeout(() => showEndOfGame(true), 1000);
        }
    }
    else if (name.toLowerCase() === 'del') {
        if (activeCol === 0) {
            return;
        }
        if (activeCol < ncols) {
            deactivateCell();
        }
        activeCol -= 1;
        activateCell();
        clearCell();
        currentGuess = currentGuess.slice(0, -1);
    }
    else {
        if (activeCol === ncols) {
            return;
        }
        setCell(name);
        deactivateCell();
        animate(cells[activeRow][activeCol], 'pulse');
        activeCol += 1;
        currentGuess = currentGuess + name;
        if (activeCol < ncols) {
            activateCell();
        }
    }
}
function setUpKeyboard() {
    let board = document.getElementById("keyboard");
    let keys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
    ];
    for (let r = 0; r < keys.length; r++) {
        let row = document.createElement("div");
        row.classList.add("keyboard-row");
        if (r === 1) {
            let spacer = document.createElement("div");
            spacer.classList.add('spacer');
            row.appendChild(spacer);
        }
        for (let c = 0; c < keys[r].length; c++) {
            let btn = document.createElement("button");
            btn.innerHTML = keys[r][c];
            btn.classList.add("key");
            btn.id = "key_" + keys[r][c];
            row.appendChild(btn);
        }
        if (r === 1) {
            let spacer = document.createElement("div");
            spacer.classList.add('spacer');
            row.appendChild(spacer);
        }
        board.appendChild(row);
    }
}
function setUpButtonHandlers() {
    let keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let name = key.innerHTML;
        key.addEventListener("click", () => handleKey(name));
    }
}
function go() {
    setUpGrid();
    setUpKeyboard();
    setUpButtonHandlers();
    showExplanation(false);
    showEndOfGame(false);
    document.addEventListener("keydown", handleKeyboardKey);
}
//# sourceMappingURL=main.js.map