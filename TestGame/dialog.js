class dialog{
    constructor(game, x, y, text) {
        Object.assign(this, { game, x, y });
        this.game.dialog = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dialoug.png");
        this.x = x;
        this.y = y;
        this.words = text.split(" ");
        this.num = 0;
        this.delay = 30;
    };
    update()
    {
        if(this.delay == 0)
        {
            this.num++
            this.delay = 30;
        }
        else if (this.num < this.words.length - 1)
        {
            this.delay--
        }
    }
    draw(ctx)
    {
        ctx.drawImage(this.spritesheet,0,480,318,79,this.x,this.y,318,79);
        ctx.font = "10px Papyrus";
        ctx.fillStyle = "Black";
        this.space = this.x + 20;
        for(var i = 0; i <= this.num; i++)
        {
            ctx.fillText(this.words[i], this.space, this.y + 40 );
            //this.getWidthOfText(this.words[i],"Papyrus",30);
            this.space += (this.getWidthOfText(this.words[i],"sans-serif",10) * 3);
        }
    }
    getWidthOfText(txt, fontname, fontsize){
        if(this.getWidthOfText.c === undefined){
            this.getWidthOfText.c=document.createElement('canvas');
            this.getWidthOfText.ctx=this.getWidthOfText.c.getContext('2d');
        }
        var fontspec = fontsize + ' ' + fontname;
        if(this.getWidthOfText.ctx.font !== fontspec)
            this.getWidthOfText.ctx.font = fontspec;
        return this.getWidthOfText.ctx.measureText(txt).width;
    }
}