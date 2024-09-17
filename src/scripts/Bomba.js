class Bomba {
    constructor(gridX, gridY, radius, delay) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.radius = radius;
        this.timer = delay;
        this.exploded = false;
        this.explosionDuration = 40;
        this.explosionTimer = this.explosionDuration;
        this.explosions = [];
    }

    update() {
        if (this.timer > 0) {
            this.timer--;
        } else {
            if (!this.exploded) {
                this.exploded = true;
                this.generateExplosions();
                Explosion.play();
            } else {
                this.explosionTimer--;
                if (this.explosionTimer <= 0) {
                    this.exploded = false;
                }
            }
        }

        if (!this.exploded) {
            updateBombaFrame();
        } else {
            updateExplotionFrame();
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.drawImage(
                bombaSprite,
                bombaCurrentFrame * blockSize, 0,
                blockSize, blockSize,
                this.gridX * blockSize, this.gridY * blockSize,
                blockSize, blockSize
            );
        } else {
            this.drawExplosions();
        }
        setTimeout(() => {
            // QUEDA PENDIENTE EL FINALIZAR EL JUEGO
            if (Win()) {
                endGame(true);
            }
        }, 2000);
    }

    generateExplosions() {
        this.explosions = [];

        // Explosión arriba
        for (let i = 1; i <= this.radius; i++) {
            const newY = this.gridY - i;
            if (map[newY] && map[newY][this.gridX] === 1) {
                break;
            } else if (map[newY] && map[newY][this.gridX] === 2) {
                this.explosions.push({ x: this.gridX, y: newY, direction: 'up' });
                map[newY][this.gridX] = 0;
                score += 10
                break;
            } else if (map[newY] && map[newY][this.gridX] === 0) {
                this.explosions.push({ x: this.gridX, y: newY, direction: 'up' });
            }
        }
        
        // Explosión abajo
        for (let i = 1; i <= this.radius; i++) {
            const newY = this.gridY + i;
            if (map[newY] && map[newY][this.gridX] === 1) {
                break;
            } else if (map[newY] && map[newY][this.gridX] === 2) {
                this.explosions.push({ x: this.gridX, y: newY, direction: 'down' });
                map[newY][this.gridX] = 0;
                score += 10
                break;
            } else if (map[newY] && map[newY][this.gridX] === 0) {
                this.explosions.push({ x: this.gridX, y: newY, direction: 'down' });
            }
        }

        // Explosión izquierda
        for (let i = 1; i <= this.radius; i++) {
            const newX = this.gridX - i;
            if (map[this.gridY][newX] === 1) {
                break;
            } else if (map[this.gridY][newX] === 2) {
                this.explosions.push({ x: newX, y: this.gridY, direction: 'left' });
                map[this.gridY][newX] = 0;
                score += 10
                break;
            } else if (map[this.gridY][newX] === 0) {
                this.explosions.push({ x: newX, y: this.gridY, direction: 'left' });
            }
        }

        // Explosión derecha
        for (let i = 1; i <= this.radius; i++) {
            const newX = this.gridX + i;
            if (map[this.gridY][newX] === 1) {
                break;
            } else if (map[this.gridY][newX] === 2) {
                this.explosions.push({ x: newX, y: this.gridY, direction: 'right' });
                map[this.gridY][newX] = 0;
                score += 10
                break;
            } else if (map[this.gridY][newX] === 0) {
                this.explosions.push({ x: newX, y: this.gridY, direction: 'right' });
            }
        }
    }

    drawExplosions() {
        this.drawExplosion(this.gridX, this.gridY, 'center');
        this.explosions.forEach(exp => this.drawExplosion(exp.x, exp.y, exp.direction));    
    }

    drawExplosion(x, y, direction) {
        const spriteRow = {
            'center': 0,
            'up': 3,
            'down': 4,
            'left': 1,
            'right': 2
        };

        const row = spriteRow[direction] || 0;

        ctx.drawImage(
            explotionSprite,
            explotionSpriteCurrentFrame * blockSize, row * blockSize,
            blockSize, blockSize,
            x * blockSize, y * blockSize,
            blockSize, blockSize
        );
        
    }
}