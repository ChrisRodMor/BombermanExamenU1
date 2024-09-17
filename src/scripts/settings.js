const keysPressed = { up: false, down: false, left: false, right: false, space: false, shift: false };

document.addEventListener("keydown", (e) => {
    //console.log(e.keyCode);
    switch (e.keyCode) {
        case 87:
            totalFrames = 7;
            frameRow = 0;
            if (!keysPressed.up && !keysPressed.down) { 
                player.move(0, -1); 
            }
            keysPressed.up = true; 
        break;
        case 65:
            totalFrames = 7;
            frameRow = 3;
            if (!keysPressed.left && !keysPressed.right) { 
                player.move(-1, 0); 
            }
            keysPressed.left = true; 
        break;
        case 83:
            totalFrames = 7;
            frameRow = 2;
            if (!keysPressed.down && !keysPressed.up) { 
                player.move(0, 1); 
            }
            keysPressed.down = true; 
        break;
        case 68:
            totalFrames = 7;
            frameRow = 1;
            if (!keysPressed.right && !keysPressed.left) { 
                player.move(1, 0); 
            }
            keysPressed.right = true; 
        break;
        case 32:
            if(!player.isDead){
                keysPressed.space = true; 
            }
        break;
        case 16:
            if(!player.isDead){
                tp.pause();
                tp.play();
                player.moveToRandomPosition();
                player.update();
                keysPressed.shift = true; 
            }
        break;

    }
});

document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 87: 
            keysPressed.up = false; 
        break;
        
        case 65: 
            keysPressed.left = false;  
        break;

        case 83: 
            keysPressed.down = false;  
        break;

        case 68: 
            keysPressed.right = false; 
        break;

        case 32: 
            keysPressed.space = false; 
        break;

        case 16: 
            keysPressed.shift = false; 
        break;

    }
    if (!keysPressed.up && !keysPressed.down && !keysPressed.left && !keysPressed.right) {
        player.moving = false;
        totalFrames = 1;
    }
});