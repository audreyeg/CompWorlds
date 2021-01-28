class saloonLZ
{
    constructor(game,x,y,w,h)
    {
        Object.assign(this, { game, x, y,w,h});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
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
                    entity.y += 10;
                    that.game.camera.loadScene(that.game.camera.scenes["saloon"]);
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

}
class sheriffLZ
{
    constructor(game,x,y,w,h)
    {
        Object.assign(this, { game, x, y,w,h});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
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
                    entity.y += 10;
                    that.game.camera.loadScene(that.game.camera.scenes["sheriff"]);
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

}
class bankLZ
{
    constructor(game,x,y,w,h)
    {
        Object.assign(this, { game, x, y,w,h});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
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
                    entity.y += 10;
                    that.game.camera.loadScene(that.game.camera.scenes["bank"]);
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

}
class townLZ
{
    constructor(game,x,y,w,h)
    {
        Object.assign(this, { game, x, y,w,h});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
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
                    entity.y -= 10;
                    that.game.camera.popScene();
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

}
class fightLZ
{
    constructor(game,x,y,w,h)
    {
        Object.assign(this, { game, x, y,w,h});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
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
                    that.removeFromWorld = true;
                    that.game.camera.loadScene(that.game.camera.createFightSceneWithEnemy(new coyote(gameEngine,486,450)));
                }
            }
        });
    }
    draw(ctx)
    {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

}

