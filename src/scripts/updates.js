//SCORE
let score = 0;
let bombsUsed = 0;

function updateFrame() {
    frameCounter++;
    if (frameCounter >= frameDelay) {
        currentFrame = (currentFrame + 1) % totalFrames;
        frameCounter = 0;
    }
}

function updateBombaFrame() {
    bombaFrameCounter++;
    if (bombaFrameCounter >= bombaFrameDelay) {
        bombaCurrentFrame = (bombaCurrentFrame + 1) % bombaFrames;
        bombaFrameCounter = 0;
    }
}

function updateExplotionFrame() {
    explotionSpriteFrameCounter++;
    if (explotionSpriteFrameCounter >= explotionSpriteFrameDelay) {
        explotionSpriteCurrentFrame = (explotionSpriteCurrentFrame + 1) % explotionSpriteFrames;
        explotionSpriteFrameCounter = 0;
    }
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerElement.textContent = `Time: ${timeRemaining}`;
    } else {
        clearInterval(timerInterval);
        endGame(false);
    }
}

function updateScore(newScore) {
    score = newScore;
    document.getElementById('score').textContent = `Score: ${score}`;
}

function updateBombUsed(newBombUsed) {
    BombUsed = newBombUsed;
    document.getElementById('bombsUsed').textContent = `Bombs: ${BombUsed}`;
}