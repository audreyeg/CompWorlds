class groundCen{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.ground = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertGround.png");
        this.BB = new BoundingBox(this.x,this.y,84,84);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,184,17,84,84,this.x,this.y,84,84);
    }
}
class groundLeft{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.ground = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertGround.png");
        this.BB = new BoundingBox(this.x,this.y,84,84);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,95,17,84,84,this.x,this.y,84,84);
    }
}
class groundRig{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.ground = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertGround.png");
        this.BB = new BoundingBox(this.x,this.y,84,84);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,272,17,84,84,this.x,this.y,84,84);  
    }
}
class groundMid{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.ground = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertGround.png");
        this.BB = new BoundingBox(this.x,this.y,84,84);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,184,106,84,84,this.x,this.y,84,84);
    }
}
class groundLside{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game.ground = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DesertGround.png");
        this.BB = new BoundingBox(this.x,this.y,84,84);
    };
    update()
    {
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,95,106,84,84,this.x,this.y,84,84);
    }
}