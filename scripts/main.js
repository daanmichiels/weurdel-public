let game;
let grid;
let eventsYetToBeSent = [];
let flushEventsTimeout;
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Gray"] = 1] = "Gray";
    Color[Color["Yellow"] = 2] = "Yellow";
    Color[Color["Green"] = 3] = "Green";
})(Color || (Color = {}));
var GameState;
(function (GameState) {
    GameState[GameState["Playing"] = 0] = "Playing";
    GameState[GameState["Win"] = 1] = "Win";
    GameState[GameState["Loss"] = 2] = "Loss";
})(GameState || (GameState = {}));
function logStartOfGameEvent(game) {
    logEvent('start_of_game', {
        'game_id': game.gameId,
        'target': game.target,
    });
}
class Game {
    constructor(nRows, nCols) {
        if (typeof nRows === 'undefined')
            nRows = 6;
        if (typeof nCols === 'undefined')
            nCols = wordLength;
        this.nRows = nRows;
        this.nCols = nCols;
        this.gameId = Game.generateGameId();
        this.target = targetWords[Math.floor(targetWords.length * Math.random())];
        this.guesses = [];
        this.state = GameState.Playing;
        this.colors = [];
        for (let row = 0; row < nRows; ++row) {
            let rowColors = [];
            for (let col = 0; col < nCols; ++col) {
                rowColors.push(Color.White);
            }
            this.colors.push(rowColors);
        }
    }
    updateColorsForLastGuess() {
        let row = this.guesses.length - 1;
        let guess = this.guesses[row];
        let reference = this.target.split('');
        // greens
        for (let c = 0; c < this.nCols; ++c) {
            if (guess[c] === reference[c]) {
                this.colors[row][c] = Color.Green;
                reference[c] = '_';
            }
        }
        // yellows & grays
        for (let c = 0; c < this.nCols; ++c) {
            if (guess[c] === this.target[c])
                continue;
            let found = false;
            for (let d = 0; d < this.nCols; ++d) {
                if (guess[c] === reference[d]) {
                    this.colors[row][c] = Color.Yellow;
                    reference[d] = '_';
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.colors[row][c] = Color.Gray;
            }
        }
    }
    submitWord(word) {
        if (this.state != GameState.Playing)
            throw new Error("Cannot submit word to inactive game");
        if (word.length != this.nCols)
            throw new Error("Word has incorrect length");
        this.guesses.push(word);
        this.updateColorsForLastGuess();
        if (word == this.target) {
            this.state = GameState.Win;
        }
        else if (this.guesses.length == this.nRows) {
            this.state = GameState.Loss;
        }
    }
    static generateGameId() {
        let suffix = '';
        suffix += Math.floor(256 * Math.random()).toString(16);
        suffix += Math.floor(256 * Math.random()).toString(16);
        return new Date().toISOString() + '_' + suffix;
    }
    static loadOrNew() {
        let currentGameJSON = getFromStorage(`${getBaseKey()}/currentGame`);
        if (currentGameJSON == null) {
            let game = new Game();
            if (typeof handpickedEvent !== 'undefined') {
                game.target = handpickedEventTarget;
            }
            logStartOfGameEvent(game);
            return game;
        }
        else {
            let currentGame = JSON.parse(currentGameJSON);
            let game = new Game();
            game.gameId = currentGame['game_id'];
            game.target = currentGame['target'];
            let guesses = currentGame['guesses'];
            for (let i = 0; i < guesses.length; ++i) {
                game.submitWord(guesses[i]);
            }
            logEvent('load_game', {
                'game_id': game.gameId,
                'target': game.target,
            });
            return game;
        }
    }
}
class CellState {
    constructor(letter, color) {
        if (typeof letter == 'undefined')
            letter = '';
        if (typeof color == 'undefined')
            color = Color.White;
        this.letter = letter;
        this.color = color;
    }
}
// Choice of how to transition a cell to its new state
var AnimationChoice;
(function (AnimationChoice) {
    AnimationChoice[AnimationChoice["Immediate"] = 0] = "Immediate";
    AnimationChoice[AnimationChoice["Flip"] = 1] = "Flip";
})(AnimationChoice || (AnimationChoice = {}));
class CellTransition {
}
class Delay {
    constructor(duration) {
        this.duration = duration;
    }
}
class GameGrid {
    constructor(root, nRows, nCols) {
        if (typeof nRows === 'undefined')
            nRows = 6;
        if (typeof nCols === 'undefined')
            nCols = wordLength;
        this.nRows = nRows;
        this.nCols = nCols;
        this.currentGuess = '';
        this.cells = [];
        for (let r = 0; r < this.nRows; ++r) {
            let row_ = [];
            for (let c = 0; c < this.nCols; ++c) {
                let cell = document.createElement("div");
                cell.classList.add('grid-cell');
                root.appendChild(cell);
                row_.push(cell);
            }
            this.cells.push(row_);
        }
        this.transitions = [];
        for (let r = 0; r < this.nRows; ++r) {
            let row = [];
            for (let c = 0; c < this.nCols; ++c) {
                row.push([]);
            }
            this.transitions.push(row);
        }
        this.setActiveCell(0, 0);
    }
    clear() {
        for (let r = 0; r < this.nRows; ++r) {
            for (let c = 0; c < this.nCols; ++c) {
                this.pushTransition(r, c, new Delay(100 * c + 58 * r));
                let transition = new CellTransition();
                transition.target = new CellState('', Color.White);
                transition.animationChoice = AnimationChoice.Flip;
                this.pushTransition(r, c, transition);
            }
        }
        this.currentGuess = '';
        this.setActiveCell(0, 0);
    }
    setActiveCell(row, col) {
        if (row == this.activeRow && col == this.activeCol)
            return;
        if (this.activeCol < this.nCols)
            this.cells[this.activeRow][this.activeCol].classList.remove('active');
        if (col < this.nCols)
            this.cells[row][col].classList.add('active');
        this.activeRow = row;
        this.activeCol = col;
    }
    pushTransition(row, col, transition) {
        let grid = this;
        let cell = this.cells[row][col];
        let isAnimating = this.transitions[row][col].length > 0;
        this.transitions[row][col].push(transition);
        function handleEnd() {
            cell.classList.remove('flip_right_b');
            cell.removeEventListener('animationend', handleEnd);
            grid.transitions[row][col].shift();
            if (grid.transitions[row][col].length > 0)
                setTimeout(handleStart, 0);
        }
        function handleMiddle() {
            let transition = grid.transitions[row][col][0];
            cell.classList.remove('flip_right_a');
            grid.setCellDirect(cell, transition.target.letter, transition.target.color);
            cell.classList.add('flip_right_b');
            cell.removeEventListener('animationend', handleMiddle);
            cell.addEventListener('animationend', handleEnd);
        }
        function handleStart() {
            let transition = grid.transitions[row][col][0];
            if (transition instanceof Delay) {
                setTimeout(() => {
                    grid.transitions[row][col].shift();
                    if (grid.transitions[row][col].length > 0)
                        setTimeout(handleStart, 0);
                }, transition.duration);
            }
            else if (transition.animationChoice == AnimationChoice.Immediate) {
                grid.setCellDirect(grid.cells[row][col], transition.target.letter, transition.target.color);
                grid.transitions[row][col].shift();
                if (grid.transitions[row][col].length > 0)
                    setTimeout(handleStart, 0);
            }
            else {
                grid.cells[row][col].classList.add('flip_right_a');
                grid.cells[row][col].addEventListener('animationend', handleMiddle);
            }
        }
        if (!isAnimating) {
            handleStart();
        }
    }
    setCellDirect(cell, letter, color) {
        cell.innerHTML = letter;
        cell.classList.remove('green');
        cell.classList.remove('yellow');
        cell.classList.remove('gray');
        if (color == Color.Green)
            cell.classList.add('green');
        if (color == Color.Yellow)
            cell.classList.add('yellow');
        if (color == Color.Gray)
            cell.classList.add('gray');
    }
}
function flushEvents() {
    flushEventsTimeout = undefined;
    if (gtag) {
        for (let i = 0; i < eventsYetToBeSent.length; ++i) {
            let event = eventsYetToBeSent[i];
            gtag('event', event['type'], event['payload']);
        }
    }
    else {
        flushEventsTimeout = setTimeout(flushEvents, 1000);
    }
}
function logEvent(type, payload) {
    console.log(type, payload);
    if (gtag) {
        gtag('event', type, payload);
    }
    else {
        eventsYetToBeSent.push({
            'type': type,
            'payload': payload
        });
        if (flushEventsTimeout === undefined) {
            flushEventsTimeout = setTimeout(flushEvents, 1000);
        }
    }
}
function getListOfKeyboardKeys() {
    return [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del']
    ];
}
function colorKey(letter, color) {
    let key = document.getElementById("key_" + letter);
    if (color === Color.Green) {
        key.classList.remove('gray');
        key.classList.remove('yellow');
        key.classList.add('green');
    }
    if (color === Color.Yellow) {
        if (key.classList.contains('green'))
            return;
        key.classList.add('yellow');
    }
    if (color === Color.Gray) {
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
// re-use the grid functionality for this
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
    if (pressedKey === " ") {
        handleKey('space');
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
let explanationAnimationStarted = false;
function showExplanation(show) {
    let help = document.getElementById("explanation-wrapper");
    if (show) {
        help.style.display = 'flex';
    }
    else {
        help.style.display = 'none';
    }
    if (!explanationAnimationStarted) {
        let grid = document.getElementById("help-grid");
        let cells = grid.children;
        function step(n) {
            let delay = 2000;
            if (n == 0) {
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
                delay = 200;
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
            }
            if (n < 8) {
                let nextStep = (n + 1) % 10;
                window.setTimeout(() => step(nextStep), delay);
            }
        }
        if (show) {
            window.setTimeout(() => step(0), 0);
            explanationAnimationStarted = true;
        }
    }
}
function showEogButton(show) {
    if (show) {
        document.getElementById("button-help").style.display = 'none';
        document.getElementById("button-show-eog").style.display = 'block';
    }
    else {
        document.getElementById("button-help").style.display = 'block';
        document.getElementById("button-show-eog").style.display = 'none';
    }
}
function showEndOfGame(show) {
    let eog = document.getElementById("end-of-game-wrapper");
    if (show) {
        eog.style.display = 'flex';
        document.getElementById("button-help").style.display = 'none';
        document.getElementById("button-show-eog").style.display = 'block';
        document.getElementById('end-of-game-restart').focus();
    }
    else {
        eog.style.display = 'none';
    }
}
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
const usingLocalStorage = storageAvailable('localStorage');
function getFromStorage(key) {
    if (!usingLocalStorage)
        return undefined;
    return localStorage.getItem(key);
}
function getBaseKey() {
    if (typeof handpickedEvent !== 'undefined') {
        return `weurdel_handpicked_${handpickedEventName}`;
    }
    let baseKey = `weurdel${wordLength}`;
    if (wordLength === 5) {
        baseKey = 'weurdel';
    }
    return baseKey;
}
function getStatistics() {
    let freqs = [0, 0, 0, 0, 0, 0, 0];
    let streak = 0;
    let maxStreak = 0;
    if (usingLocalStorage) {
        let baseKey = getBaseKey();
        let freqsString = localStorage.getItem(`${baseKey}/frequencies`);
        let streakString = localStorage.getItem(`${baseKey}/streak`);
        let maxStreakString = localStorage.getItem(`${baseKey}/maxStreak`);
        if (freqsString) {
            freqs = freqsString.split('/').map(x => parseInt(x));
        }
        if (streakString) {
            streak = parseInt(streakString);
            maxStreak = Math.max(streak, maxStreak);
        }
        if (maxStreakString) {
            maxStreak = parseInt(maxStreakString);
        }
    }
    return {
        'freqs': freqs,
        'streak': streak,
        'maxStreak': maxStreak,
    };
}
function updateStatisticsAndClearCurrentGame() {
    let stats = getStatistics();
    if (game.state == GameState.Loss) {
        stats['freqs'][0] += 1;
        stats['streak'] = 0;
    }
    else if (game.state == GameState.Win) {
        stats['freqs'][game.guesses.length] += 1;
        stats['streak'] += 1;
        stats['maxStreak'] = Math.max(stats['maxStreak'], stats['streak']);
    }
    if (usingLocalStorage) {
        let baseKey = getBaseKey();
        localStorage.setItem(`${baseKey}/frequencies`, stats['freqs'].join('/'));
        localStorage.setItem(`${baseKey}/streak`, stats['streak'].toString());
        localStorage.setItem(`${baseKey}/maxStreak`, stats['maxStreak'].toString());
        localStorage.removeItem(`${baseKey}/currentGame`);
    }
}
function startNewGame() {
    clearKeyboardColors();
    game = new Game();
    if (typeof handpickedEvent !== 'undefined') {
        game.target = handpickedEventTarget;
    }
    logStartOfGameEvent(game);
    grid.clear();
    showEogButton(false);
}
function setEndOfGameMessage(msg) {
    let elem = document.getElementById("end-of-game-message");
    elem.innerHTML = msg;
}
function setHistogramWidths() {
    let freqs = getStatistics()['freqs'];
    let maxFreq = 1;
    for (let i = 0; i < freqs.length; ++i) {
        maxFreq = Math.max(freqs[i], maxFreq);
    }
    document.getElementById("freq-bar-loss").style.width = `${6 * freqs[0] / maxFreq}em`;
    document.getElementById("freq-label-loss").innerHTML = freqs[0].toString();
    for (let i = 1; i < freqs.length; ++i) {
        document.getElementById("freq-bar-" + i).style.width = `${6 * freqs[i] / maxFreq}em`;
        document.getElementById("freq-label-" + i).innerHTML = freqs[i].toString();
    }
}
function determineEndOfGameMessage() {
    let result;
    let stats = getStatistics();
    let streak = stats['streak'];
    let maxStreak = stats['maxStreak'];
    if (game.state == GameState.Loss) {
        if (typeof handpickedEvent !== 'undefined') {
            result = "Oeps. Misschien kan je<br>opnieuw proberen?";
        }
        else {
            result = "Het woord was <em>" + game.target + "</em>.";
        }
    }
    else if (game.state == GameState.Playing) {
        result = "";
    }
    else {
        if (streak >= 3) {
            if (streak % 10 == 0) {
                result = `Al ${streak} keer op rij<br>gewonnen! Hoera!`;
            }
            else {
                result = `Al ${streak} keer op rij<br>gewonnen!`;
            }
        }
        else {
            if ((typeof handpickedEvent !== 'undefined') && handpickedEventTarget === 'olijf') {
                result = "Gewonnen! Het is een<br>olijf<em>boom</em>, natuurlijk.";
            }
            else if ((typeof handpickedEvent !== 'undefined') && handpickedEventTarget === 'sauna') {
                result = "Gewonnen!<br>Dit is een bon voor<br>een uitstap naar een spa samen met mij.";
            }
            else {
                result = "Gewonnen!";
            }
        }
    }
    if (maxStreak >= 3) {
        result += `<br>Langste winstreeks: ${maxStreak}`;
    }
    return result;
}
function handleKey(name) {
    name = name.toLowerCase();
    if (game.state != GameState.Playing) {
        return;
    }
    if (name === 'enter' || name == 'space') {
        if (grid.activeCol !== grid.nCols) {
            return;
        }
        let is_valid_guess = is_valid_word(grid.currentGuess);
        logEvent('submit_guess', {
            'game_id': game.gameId,
            'guess': grid.currentGuess,
            'guesses': grid.activeRow + 1,
            'is_valid_guess': is_valid_guess,
        });
        if (!is_valid_guess) {
            for (let c = 0; c < grid.nCols; ++c) {
                grid.cells[grid.activeRow][c].classList.remove('shake');
                shake(grid.cells[grid.activeRow][c]);
            }
            return;
        }
        game.submitWord(grid.currentGuess);
        updateCellColors(game, grid.activeRow);
        updateKeyboardColors(game, grid.activeRow);
        // store new game state
        if (usingLocalStorage) {
            let state = JSON.stringify({
                'game_id': game.gameId,
                'target': game.target,
                'guesses': game.guesses
            });
            let baseKey = getBaseKey();
            localStorage.setItem(`${baseKey}/currentGame`, state);
        }
        if (game.state == GameState.Win) {
            logEvent('end_of_game', {
                'game_id': game.gameId,
                'outcome': 'win',
                'guesses': grid.activeRow + 1,
                'target': game.target
            });
            updateStatisticsAndClearCurrentGame();
            setEndOfGameMessage(determineEndOfGameMessage());
            setHistogramWidths();
            setTimeout(() => { showEndOfGame(true); showEogButton(true); }, 1000);
        }
        else if (game.state == GameState.Playing) {
            grid.setActiveCell(grid.activeRow + 1, 0);
            grid.currentGuess = '';
        }
        else {
            logEvent('end_of_game', {
                'game_id': game.gameId,
                'outcome': 'loss',
                'guesses': grid.activeRow + 1,
                'target': game.target
            });
            updateStatisticsAndClearCurrentGame();
            setEndOfGameMessage(determineEndOfGameMessage());
            ;
            setHistogramWidths();
            setTimeout(() => { showEndOfGame(true); showEogButton(true); }, 1000);
        }
    }
    else if (name === 'del') {
        if (grid.activeCol === 0) {
            return;
        }
        grid.currentGuess = grid.currentGuess.slice(0, -1);
        let transition = new CellTransition();
        transition.target = new CellState('', Color.White);
        transition.animationChoice = AnimationChoice.Immediate;
        grid.setActiveCell(grid.activeRow, grid.activeCol - 1);
        grid.pushTransition(grid.activeRow, grid.activeCol, transition);
    }
    else {
        if (grid.activeCol == grid.nCols) {
            return;
        }
        let transition = new CellTransition();
        transition.target = new CellState(name, Color.White);
        transition.animationChoice = AnimationChoice.Immediate;
        grid.pushTransition(grid.activeRow, grid.activeCol, transition);
        animate(grid.cells[grid.activeRow][grid.activeCol], 'pulse');
        grid.currentGuess = grid.currentGuess + name;
        grid.setActiveCell(grid.activeRow, grid.activeCol + 1);
    }
}
function setUpKeyboard() {
    let board = document.getElementById("keyboard");
    let keys = getListOfKeyboardKeys();
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
function updateKeyboardColors(game, row) {
    let colors = game.colors[row];
    let word = game.guesses[row];
    for (let i = 0; i < game.nCols; ++i)
        colorKey(word[i], colors[i]);
}
function clearKeyboardColors() {
    let keys = getListOfKeyboardKeys();
    for (let r = 0; r < keys.length; r++) {
        for (let c = 0; c < keys[r].length; c++) {
            document.getElementById("key_" + keys[r][c]).classList.remove('green');
            document.getElementById("key_" + keys[r][c]).classList.remove('yellow');
            document.getElementById("key_" + keys[r][c]).classList.remove('gray');
        }
    }
}
function updateCellColors(game, r) {
    for (let c = 0; c < game.nCols; ++c) {
        if (c > 0) {
            let delay = new Delay(120 * c);
            grid.pushTransition(r, c, delay);
        }
        let transition = new CellTransition();
        transition.target = new CellState(game.guesses[r][c], game.colors[r][c]);
        transition.animationChoice = AnimationChoice.Flip;
        grid.pushTransition(r, c, transition);
    }
}
function go() {
    setUpKeyboard();
    setUpButtonHandlers();
    showExplanation(false);
    showEndOfGame(false);
    game = Game.loadOrNew();
    grid = new GameGrid(document.getElementById('grid'));
    for (let r = 0; r < game.guesses.length; ++r) {
        updateKeyboardColors(game, r);
        updateCellColors(game, r);
    }
    grid.setActiveCell(game.guesses.length, 0);
    document.addEventListener("keydown", handleKeyboardKey);
}
//# sourceURL=main.js
