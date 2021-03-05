class Horse {
    constructor(game, x, y, camera,player) {
        Object.assign(this, { game, x, y,camera,player })
        this.camera = camera;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/horse-brown.png");
        this.horizontalWalking = new Animator(this.spritesheet, 2, 107, 64, 62, 4, .2, .5, false, true, camera);
        this.horizontalWalkingLeft = new Animator(this.spritesheet, 2, 277, 64, 62, 4, .2, .5, true, true, camera);
        this.upWalking = new Animator(this.spritesheet, 22, 19, 24, 65, 4, .2, 41, false, true, camera);
        this.downWalking = new Animator(this.spritesheet, 23, 201, 23, 53, 4, .2, 41, false, true, camera);
        this.updateBB();
        this.mounting = 0;
        this.facingState = 0; //0 = right, 1 = left 2 = up 3 = down
        this.velocity = { x: 0, y: 0 };
        this.active = false;
    }
    update()
    {
        if(this.active)
        {
            changeChat("Press Space To Dismount Horse!");
            if(this.game.interact && this.mounting == 0)
            {
                this.active = false;
                this.camera.setEntityToFollow(this.player, 700, 384);
                this.player.x = this.x + 200;
                this.player.y = this.y + 200;
                this.player.dismount = 20;
                this.player.active = true;
            }
            if (this.game.right) 
            {
                this.velocity.x = 10;
                this.velocity.y = 0;
            }
            else if (this.game.left) 
            {
                this.velocity.x = -10;
                this.velocity.y = 0;
            }
            else if (this.game.up) 
            {
                this.velocity.y = -10;
                this.velocity.x = 0;
            }
            else if (this.game.down) 
            {
                this.velocity.y = 10;
                this.velocity.x = 0;
            }
            else 
            {
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
            if (this.velocity.x > 0) 
            {
                this.facingState = 0;
            }
            if (this.velocity.x < 0) 
            {
                this.facingState = 1;
            }
            if (this.velocity.y < 0) 
            {
                this.facingState = 2;
            }
            if (this.velocity.y > 0) 
            {
                this.facingState = 3;
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.player.x = this.x;
            this.player.y = this.y;
            if (this.x > this.game.camera.scenes[this.game.camera.currentScene].xMax - 50) {
              this.x = this.game.camera.scenes[this.game.camera.currentScene].xMax - 50;
            }
            if (this.x < this.game.camera.scenes[this.game.camera.currentScene].xMin + 50) {
              this.x = this.game.camera.scenes[this.game.camera.currentScene].xMin + 50;
            }
            if (this.y > this.game.camera.scenes[this.game.camera.currentScene].yMax - 50) {
              this.y = this.game.camera.scenes[this.game.camera.currentScene].yMax - 50;
            }
            if (this.y < this.game.camera.scenes[this.game.camera.currentScene].yMin + 50) {
              this.y = this.game.camera.scenes[this.game.camera.currentScene].yMin + 50;
            }
        }
        else
        {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.updateBB();
        if(this.mounting > 0)
        {
            this.mounting--;
        }
    }
    draw(ctx)
    {
        var xPos = this.x;
        var yPos = this.y;
        if(this.camera != null)
        {      
          var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
          var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
          xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
          yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
        }
        if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 0) {
          ctx.drawImage(this.spritesheet, 66, 108, 64, 61, xPos, yPos, 64 * 1.5, 61 * 1.5);
        }
        else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 1) {
          ctx.drawImage(this.spritesheet, 67, 278, 64, 61, xPos, yPos, 64 * 1.5, 61 * 1.5);
        }
        else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 2) {
          ctx.drawImage(this.spritesheet, 86, 20, 25, 65,  xPos, yPos, 25 * 1.5, 65 * 1.5);
        }
        else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 3) {
          ctx.drawImage(this.spritesheet, 87, 202, 23, 53,  xPos, yPos, 23 * 1.5, 53 * 1.5);
        }
        else if (this.facingState == 0) 
        {
            this.horizontalWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y,1.5);
        }
        else if (this.facingState == 1) 
        {
            this.horizontalWalkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        }
        else if (this.facingState == 2) 
        {
            this.upWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        }
        else if (this.facingState == 3) 
        {
            this.downWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
          }
    }
    updateBB()
    {
        var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
        var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
        var xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
        var yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
        this.BB = new BoundingBox(xPos, yPos, 40, 80);
    }
}