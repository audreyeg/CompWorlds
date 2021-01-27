class npc{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.npc = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        this.x = x;
        this.y = y;
        this.updateBB();
        this.number = 0;
        this.dead = false
        this.gravity = 9.8/60;
        this.velocity = { x: 0, y: 0 };
    };
    update()
    {
        this.velocity.y += this.gravity;
        if(this.dead)
        {
            this.removeFromWorld = true;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if(entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft)
                {
                    that.velocity.y = 0;
                    //that.y = entity.y - 118;
                }
            }
        });
        this.y += this.velocity.y;
        this.updateBB();
                  
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,60,89,13,25,this.x,this.y,50,60);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
    updateBB()
    {
            this.BB = new BoundingBox(this.x, this.y ,50,60);
    }
}