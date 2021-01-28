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
class DesertGround
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
        ctx.drawImage(this.spritesheet,384,384,512,512,this.x,this.y,128 * 8,128 * 8);
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
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
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
        ctx.strokeStyle = 'Red';
         ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
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
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

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
