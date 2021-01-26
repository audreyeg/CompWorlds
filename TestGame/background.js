class Town { 
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/TownConceptV3.png");
    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet,0,0,700,350,0,0,1400,700);
    };
};