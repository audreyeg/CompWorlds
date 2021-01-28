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