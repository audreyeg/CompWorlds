class Heal{

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/HealthPickup.png");
        this.x = x;
        this.y = y;
        this.lifetime = 45;
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
        ctx.drawImage(this.spritesheet,5,2,21,21,this.x,this.y,30,30);
    }
}