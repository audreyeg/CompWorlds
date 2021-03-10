class Dynamite
{
    constructor(game,x,y,camera)
    {
        this.x = x;
        this. y = y;
        this.camera = camera;
        this.game = game;
        this.timer = 420;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dynimite.png");
        this.explosion = new Animator(ASSET_MANAGER.getAsset("./sprites/Explosion.png"), 148, 55, 84, 70,7, .15, 1, false, false, camera);
    }
    update() 
    {
        this.timer--;
        if(this.timer == 0)
        {
            this.removeFromWorld = true;
        }
    }
    draw(ctx) 
    {
          var xPos = this.x;
          var yPos = this.y;
          if(this.camera != null)
          {      
            var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
            var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
            xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
            yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
          }
          if(this.timer > 120)
          {
            ctx.drawImage(this.spritesheet,  470, 230,513, 182, xPos, yPos, 64,22);
          }
          else
          {
            this.explosion.drawFrame(this.game.clockTick, ctx, this.x, this.y - 50,2);
          }
    }
}
class Explodable
{
    constructor(game,x,y,w,h,object1,object2,camera)
    {
        this.game = game;
        this.camera = camera;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xPos;
        this.yPos;
        this.object1 = object1;
        this.object2 = object2;
        this.timer = -1;
        this.interactable = true;
        this.BB = new BoundingBox(this.x,this.y,this.w,this.h);
    }
    update()
    {
        if(this.timer == 0)
        {
            this.object1.destroyed = true;
            this.object2.destroyed = true;
            this.removeFromWorld = true;
        }
        if(this.timer > 0)
        {
            this.timer--;
        }
        var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
        var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
        this.xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
        this.yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
        this.updateBB();
    }
    updateBB()
    {
        this.BB = new BoundingBox(this.xPos, this.yPos, this.BB.width, this.BB.height);
    }
    draw(ctx)
    {
        if (PARAMS.DEBUG && this.BB != null) 
        {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}