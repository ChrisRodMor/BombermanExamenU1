class Character {
    constructor(gridX, gridY, width, height) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.width = width;
        this.height = height;
        this.x = gridX * blockSize;
        this.y = gridY * blockSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.moving = false;
        this.moveDirection = null;
        this.isDead = false;
    }

    move(dx, dy) {
        if (this.isDead){
            return;
        }
        else{
            const newX = this.gridX + dx;
            const newY = this.gridY + dy;
    
            if (map[newY] && map[newY][newX] === 0 && !bombs.some(bomb => bomb.gridX === newX && bomb.gridY === newY)) {
                this.gridX = newX;
                this.gridY = newY;
                this.targetX = newX * blockSize;
                this.targetY = newY * blockSize;
                this.moving = true;
                this.moveDirection = dy !== 0 ? (dy > 0 ? 'down' : 'up') : (dx > 0 ? 'right' : 'left');
            }
        }
    }

    moveToRandomPosition() {
        let newX, newY;

        do {
            newX = Math.floor(Math.random() * map[0].length);
            newY = Math.floor(Math.random() * map.length);
        } while (map[newY][newX] !== 0 || bombs.some(bomb => bomb.gridX === newX && bomb.gridY === newY));

        this.gridX = newX;
        this.gridY = newY;
        this.targetX = newX * blockSize;
        this.targetY = newY * blockSize;
        this.moving = true;
    }

    update() {
        if (this.isDead) return;

        if (this.moving) {
            const dx = (this.targetX - this.x) / movementSpeed;
            const dy = (this.targetY - this.y) / movementSpeed;
            this.x += dx;
            this.y += dy;

            if (Math.abs(this.targetX - this.x) < Math.abs(dx) && Math.abs(this.targetY - this.y) < Math.abs(dy)) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
                this.moveDirection = null;
            }
        }

        updateFrame();
    }

    checkExplosionCollision(explosions) {
    
        explosions.forEach(exp => {
            const explosionX = exp.x * blockSize+5;
            const explosionY = exp.y * blockSize+5;
    
            if (
                player.x < explosionX + blockSize-10 &&
                player.x + this.width > explosionX &&
                player.y < explosionY + blockSize-10 &&
                player.y + this.height > explosionY
            ){
                this.isDead = true; 
                ouch.pause();
                ouch.play(); 
            }
        });
    }
    
}