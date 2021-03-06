
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
                if (entity instanceof OverWorldPlayer && entity.facingState == 2) 
                {
                    entity.y += 10;
                    that.game.camera.loadScene("saloon");
                     document.getElementById("townAudio").pause();
                     document.getElementById("saloonAudio").play();
                }
            }
        });
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
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
                if (entity instanceof OverWorldPlayer && entity.facingState == 2) 
                {
                    entity.y += 10;
                    that.game.camera.loadScene("sheriff");
                }
            }
        });
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
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
                if (entity instanceof OverWorldPlayer && entity.facingState == 2) 
                {
                    entity.y += 10;
                    that.game.camera.loadScene("bank");
                }
            }
        });
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}
class desertLZ
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
                if (entity instanceof OverWorldPlayer && entity.facingState == 0) 
                {
                    entity.x -= 20;
                    that.game.camera.loadScene("desert");
                }
            }
        });
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
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
                if (entity instanceof OverWorldPlayer && entity.facingState == 3) 
                {
                    entity.y -= 10;
                    that.game.camera.loadScene("town");
                    document.getElementById("saloonAudio").pause();
                    document.getElementById("townAudio").play();
                }
            }
        });
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }

}

