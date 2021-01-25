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