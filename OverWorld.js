class Town { 
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/TownConceptV3.png");
    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,0,0,700,350,0,0,1400,700);
    };
};
class overWorldCoyote extends Drawable
{
    constructor(game,x,y,lvl, camera)
    {
        super(x, y, camera, 0, 0, 136, 120, 60, 50, "./sprites/coyote.png");
        this.lvl = lvl
        this.BB = new BoundingBox(x,y + 20,60,30);
    }
    collision(player)
    {
        gameEngine.camera.enemySpawner.currentEnemies--;
        gameEngine.camera.createFightSceneWithEnemy(new coyote(gameEngine,486,450,this,this.lvl),this.x,this.y);
        document.getElementById("townAudio").pause();
        document.getElementById("fightAudio").play();
        this.removeFromWorld = true;
    }

}
class DesertGround extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 384, 384, 128, 128, 256, 256, "./sprites/DesertTileSet.png");
    }
}
class DesertSkull extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 224, 192, 64, 32, 128, 64, "./sprites/DesertTileSet.png");
    }
}
class DesertPlant extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 320, 160, 32, 32, 64, 64, "./sprites/DesertTileSet.png");
        this.BB = new BoundingBox(x,y,64,64);
    }
    collision(player)
    {
        player.stats.health--;
        if(player.stats.health == 0)
        {
            player.removeFromWorld = true;
            document.getElementById("chat").innerHTML = "Dont bring a gun to a cactus fight!";
        }
    }
}
class DesertWell extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 448, 64, 64, 64, 256, 256, "./sprites/DesertTileSet.png");
        this.BB = new BoundingBox(x,y,256,256);
    }
    collision(player)
    {
        //player.push();
    }
}

class Road
{
    constructor(game,x,y)
    {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png");
        this.x = x;
        this.y = y;
    }
    update()
    {

    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,31,433,32,64,this.x,this.y,32,64);
    }

}

class House {
     constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.game.house = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/house.png");
        this.BB = new BoundingBox(this.x,this.y,this.w,this.h);
    }
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,100,18,310,470,this.x,this.y,this.w,this.h);
    }
}

class Saloon {
     constructor(game, x, y, visible) {
        Object.assign(this, { game, x, y, visible});
        this.game.Saloon = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/saloon.png");
        this.BB = new BoundingBox(this.x + 19,this.y,356,350);
    }
    update()
    {
        var that = this;
        this.game.entities.forEach(function (entity) 
        {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if (entity instanceof OverWorldPlayer) 
                {
                    entity.push();
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,0,952,1024,this.x,this.y,400,350);
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

}

class Sheriff {
     constructor(game, x, y, visible) {
        Object.assign(this, { game, x, y});
        this.game.Sheriff = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sheriff.png");
        this.BB = new BoundingBox(this.x + 20,this.y,380,250);
    }
    update()
    {
        var that = this;
        this.game.entities.forEach(function (entity) 
        {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if (entity instanceof OverWorldPlayer) 
                {
                    entity.push();
                }
            }
        });
        
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,0,894,512,this.x,this.y,400,250);
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

class Bank {
     constructor(game, x, y, visible) {
        Object.assign(this, { game, x, y});
        this.game.Bank = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bank.png");
        this.BB = new BoundingBox(this.x,this.y,200,300);
    }
    update()
    {
        var that = this;
        this.game.entities.forEach(function (entity) 
        {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if (entity instanceof OverWorldPlayer) 
                {
                    entity.push();
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,0,1438,1086,this.x,this.y,200,300);
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }

    }
}

class Floor {
       constructor(game, x, y, w, h) {
       Object.assign(this, {game, x, y, w, h});
        this.game.Floor = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png");
        this.BB = new BoundingBox(x,y,w,h);
    }
    update() {
    }
    draw(ctx) {
            //spritesheet, xStart, yStart, width, height, x, y, dimensions of box to fill 
            ctx.drawImage(this.spritesheet, 120, 40, 952, 1200, this.x, this.y, this.w, this.h);

    }
}
