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
        this.rake = false;
        this.shovel = false;
        this.girl = false;

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
            this.startPoint = 45;
            this.EndPoint = 229;
            this.wide = 135;
            this.tall = 256;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bartender.png");
        }
        else if (this.location == "cop"){
            this.cop = true;
            this.startPoint = 85;
            this.EndPoint = 20;
            this.wide = 305;
            this.tall = 440;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sheriffnpc.png");
        }
         else if (this.location == "banker"){
            this.banker = true;
            this.startPoint = 358;
            this.EndPoint = 2;
            this.wide = 77;
            this.tall = 159;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/banker.png");
        }
        else if (this.location == "guide"){
            this.guide = true;
            this.startPoint = 175;
            this.EndPoint = 18;
            this.wide = 270;
            this.tall = 420;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/guide.png");
        }
        else if (this.location == "rake"){
            this.rake = true;
            this.startPoint = 171;
            this.EndPoint = 22;
            this.wide = 133;
            this.tall = 137;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/banker.png");
        }
        else if (this.location == "shovel"){
            this.shovel = true;
            this.startPoint = 33;
            this.EndPoint = 0;
            this.wide = 111;
            this.tall = 160;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/banker.png");
        }
         else if (this.location == "girl"){
            this.girl = true;
            this.startPoint = 4;
            this.EndPoint = 0;
            this.wide = 46;
            this.tall = 93;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/random.png");
        }
        this.firstLoad = true;
    };

    update()
    {         
        if(this.firstLoad)   
        {
            this.game.entities.push(new Boundry(gameEngine,this.x,this.y,50,60));
            this.firstLoad = false;
        }
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
        this.BB = new BoundingBox(this.x-15,this.y-15,80,90);
        if(this.location == "bartender")
        {
            this.BB = new BoundingBox(this.x,this.y,150,60);
        }
    }
}
