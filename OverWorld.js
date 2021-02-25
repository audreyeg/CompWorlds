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
class Cave extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 383, 0, 64, 96, 64 * 3.5, 96 * 2, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class CaveSideLeft extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 0, 128, 64, 64, 64*1.5,64*1.5, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class CaveSideRightMid extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 128, 96, 64, 64, 64*1.5,64*1.5, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class CaveSideRight extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 128, 128, 64, 64, 64*1.5,64*1.5, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class CaveSideLeftMid extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 0, 96, 64, 64, 64*1.5,64*1.5, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class CaveTop extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 64, 97, 64, 64, 64*2,64*2, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class overWorldCoyote extends Drawable
{
    constructor(game,x,y,lvl, camera,spawner)
    {
        super(x, y, camera, 0, 0, 136, 120, 60, 50, ASSET_MANAGER.getAsset("./sprites/coyote.png"));
        this.lvl = lvl
        this.BB = new BoundingBox(x,y + 20,60,30);
        this.spawner = spawner;
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            gameEngine.camera.createFightSceneWithEnemy(new coyote(gameEngine,486,450,this,this.lvl),this.x,this.y);
            document.getElementById("townAudio").pause();
            document.getElementById("fightAudio").play();
            this.spawner.currentEnemies--;
            this.removeFromWorld = true;
        }
        
    }

}class overWorldBandit extends Drawable
{
    constructor(game,x,y,lvl, camera,spawner)
    {
        super(x, y, camera, 9, 9, 62, 90, 44, 60, ASSET_MANAGER.getAsset("./sprites/bandit.png"));
        this.lvl = lvl
        this.BB = new BoundingBox(x,y,44,60);
        this.spawner = spawner;
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            gameEngine.camera.createFightSceneWithEnemy(new Bandit(gameEngine,600,450,this,this.lvl),this.x,this.y);
            document.getElementById("townAudio").pause();
            document.getElementById("fightAudio").play();
            this.spawner.currentEnemies--;
            this.removeFromWorld = true;
        }
        
    }

}
class TopGate extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 99, 271, 97, 33, 97 * 2, 33 * 2, ASSET_MANAGER.getAsset("./sprites/gates.png"));
        this.BB = new BoundingBox(x,y,97 * 2, 33 * 2);
    }
    collision(entity)
    {
        if(entity instanceof overWorldCoyote)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
        else if(!(entity instanceof TopGate) && !(entity instanceof SideGate))
        {
            entity.removeFromWorld = true;
        }
    }
}
class SideGate extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 99, 308, 9, 97, 9*2, 97*2, ASSET_MANAGER.getAsset("./sprites/gates.png"));
        this.BB = new BoundingBox(x,y,9*2, 97 * 2);
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            entity.push(2);
        }
        else if(entity instanceof overWorldCoyote)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
        else if(!(entity instanceof TopGate) && !(entity instanceof SideGate))
        {
            entity.removeFromWorld = true;
        }
    }
}
class DesertGround extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 384, 384, 128, 128, 256, 256, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class DesertSkull extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 224, 192, 64, 32, 128, 64, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }
}
class WalkWay extends Drawable
{
    constructor(gmae,x,y,camera)
    {
        super(x,y,camera,32, 239, 32, 64, 32 * 2, 64 * 2, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
    }    
}
class TownSign extends Drawable
{
    constructor(gmae,x,y,camera)
    {
        super(x,y,camera,0, 0, 84, 86, 84, 86, ASSET_MANAGER.getAsset("./sprites/TownSign.png"));
        this.BB = new BoundingBox(x,y,84, 86);
    }   
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            entity.push(2);
        }
        else if(entity instanceof overWorldCoyote)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
    }
}
class TownZone extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x,y,camera,48, 239, 32, 64, 32 * 2, 64 * 2, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"))
        this.BB = new BoundingBox(x,y,32 * 2,64 * 2);
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            entity.x += 10;
            gameEngine.camera.loadScene("town");
            document.getElementById("saloonAudio").pause();
            document.getElementById("townAudio").play();
        }
        else if(entity instanceof overWorldCoyote)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
        else if(entity instanceof DesertPlant)
        {
            entity.removeFromWorld = true;
        }
        else if(entity instanceof DesertWell)
        {
            entity.removeFromWorld = true;
        }
    }
}
class DesertPlant extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 320, 160, 32, 32, 64, 64, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
        this.BB = new BoundingBox(x,y,64,64);
        this.delay = 0;
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            if(this.delay == 0)
            {
                entity.stats.health--;
                this.delay = 10;
            }
            else if(this.delay > 0)
            {
                this.delay--;
            }
            entity.push(2);
            if(entity.stats.health == 0)
            {
                entity.removeFromWorld = true;
                document.getElementById("chat").innerHTML = "What exactly were you trying to do to that cactus?";
            }
        }
        else if(entity instanceof overWorldCoyote)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
    }
}
class DesertWell extends Drawable
{
    constructor(game,x,y, camera)
    {
        super(x, y, camera, 448, 64, 64, 64, 256/2, 256/2, ASSET_MANAGER.getAsset("./sprites/DesertTileSet.png"));
        this.BB = new BoundingBox(x,y,256/2,256/2);
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer)
        {
            entity.push(2);
        }
        else if(entity instanceof overWorldCoyote || entity instanceof overWorldBandit)
        {
            entity.spawner.currentEnemies--;
            entity.removeFromWorld = true;
        }
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
                    entity.push(1);
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
                    entity.push(1);
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
                    entity.push(1);
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

class Ring {
        constructor(game, x, y, w, h) {
       Object.assign(this, {game, x, y, w, h});
        this.game.Floor = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ring.png");
        this.BB = new BoundingBox(x,y,w,h);
    }
    update() {
    }
    draw(ctx) {
            //spritesheet, xStart, yStart, width, height, x, y, dimensions of box to fill 
            ctx.drawImage(this.spritesheet, 120, 40, 952, 1200, this.x, this.y, this.w, this.h);

    }

}
