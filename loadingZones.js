
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
                    that.game.camera.loadScene("saloon");
                     document.getElementById("townAudio").pause();
                     document.getElementById("saloonAudio").play();
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
                    that.game.camera.loadScene("sheriff");
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
                    that.game.camera.loadScene("bank");
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
                    that.game.camera.loadScene("town");
                    document.getElementById("saloonAudio").pause();
                     document.getElementById("townAudio").play();
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
    constructor(game,x,y,w,h,enemy)
    {
        Object.assign(this, { game, x, y,w,h,enemy});
        this.game = game;
        this.BB = new BoundingBox(x,y,w,h);
        this.enemy = enemy
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
                    that.game.camera.enemySpawner.currentEnemies--;
                    that.game.camera.createFightSceneWithEnemy(that.enemy,that.x,that.y);
                    document.getElementById("townAudio").pause();
                    document.getElementById("fightAudio").play();
                    //that.removeFromWorld = true;
                    that.enemy.parent.removeFromWorld = true;
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

