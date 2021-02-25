class npc{

    constructor(game, x, y, place) {
        Object.assign(this, { game, x, y });
        this.game.npc = this;
        // spritesheet
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/saloongirl.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        this.x = x;
        this.y = y;
        this.updateBB();
        this.number = 0;
        this.dead = false
        //this.gravity = 9.8/60;
        this.velocity = { x: 0, y: 0 };
        this.location = place;
        this.saloon = false;
        this.bartender = false;
        this.cop = false;
        this.banker = false;
        this.guide = false;

        if (this.location == "saloon"){
                this.saloon = true;
                this.startPoint = 0;
                this.EndPoint = 92;
                this.wide = 69;
                this.tall = 181;
                 this.spritesheet = ASSET_MANAGER.getAsset("./sprites/saloongirl.png");
                // this.dancingAnimation = new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true);
        }
        else if (this.location == "bartender"){
            this.bartender = true;
            this.startPoint = 30;
            this.EndPoint = 89;
            this.wide = 13;
            this.tall = 25;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        }
        else if (this.location == "cop"){
            this.cop = true;
            this.startPoint = 30;
            this.EndPoint = 89;
            this.wide = 13;
            this.tall = 25;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        }
         else if (this.location == "banker"){
            this.banker = true;
            this.startPoint = 30;
            this.EndPoint = 89;
            this.wide = 13;
            this.tall = 25;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        }
        else if (this.location == "guide"){
            this.guide = true;
            this.startPoint = 30;
            this.EndPoint = 89;
            this.wide = 13;
            this.tall = 25;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
        }
    };

    update()
    {
        //this.velocity.y += this.gravity;
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
        ctx.drawImage(this.spritesheet,this.startPoint,this.EndPoint,this.wide,this.tall,this.x,this.y,50,60);
        //this.dancingAnimation.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
        ctx.restore();
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
