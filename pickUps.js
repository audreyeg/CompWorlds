class medPack{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.medPack = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/health.png");
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y ,25.7,18.5);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,319,39,257,185,this.x,this.y,25.7,18.5);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
class Heal{

    constructor(game, x, y,animated = false) {
        Object.assign(this, { game, x, y });
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/HealthPickup.png");
        this.x = x;
        this.y = y;
        this.lifetime = 45;
        this.animated = animated;
        this.BB = new BoundingBox(x,y,30,30);
    };
    update()
    {
        if(this.animated)
        {
             if(this.lifetime == 0)
             {
                 this.removeFromWorld = true;
             }
             this.lifetime--;
             this.y -= 2;
        }
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,5,2,21,21,this.x,this.y,30,30);
    }
}
class Coin{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coin.png");
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(x,y,30,30);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,2,2,50,50,this.x,this.y,30,30);
    }
}
class Crit{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        //this.game.crit = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crit.png");
        this.x = x;
        this.y = y;
        this.lifetime = 30;
    };
    update()
    {
        if(this.lifetime == 0)
        {
            this.removeFromWorld = true;
        }
        this.lifetime--;
        this.y -= 2;
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,0,300,300,this.x,this.y,30,30);
    }
}
