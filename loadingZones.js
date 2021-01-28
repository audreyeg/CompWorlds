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
                    entity.y += 5;
                    that.game.camera.loadSaloon();
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
                    entity.y += 5;
                    that.game.camera.loadSheriff();
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
                    entity.y += 5;
                    that.game.camera.loadBank();
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
