class Crit{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        //this.game.crit = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crit.png");
        this.x = x;
        this.y = y;
        this.lifetime = 30;
    };
    update()
    {
        if(this.lifetime == 0)
        {
            this.removeFromWorld = true;
        }
        this.lifetime--;
        this.y -= 2;
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,0,300,300,this.x,this.y,30,30);
    }
}