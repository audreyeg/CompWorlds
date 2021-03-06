class Camera {
    constructor(scene, xInit = 0, yInit = 0, angle = 0, pixelScale = 1, linearScale = [1, 1]) {
        this.scene = scene;
        this.x = xInit;
        this.y = yInit;
        this.angle = angle;
        this.pixelScale = pixelScale;
        this.linearScale = linearScale;
        this.followEntity = null;
        this.xOffset = 0;
        this.yOffset = 0;

        this.animationQueue = [];
    }

    draw() {
        // for () {

        // }

    }

    update() {
        if (this.followEntity != null) {
            this.x = this.followEntity.x - this.xOffset;
            this.y = this.followEntity.y - this.yOffset;
        }
    }

    setEntityToFollow(entity, xOffset = 0, yOffset = 0) {
        this.followEntity = entity;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    clearAnimations() {
        this.animationQueue = [];
    }

    moveToPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    translate(x, y) {
        this.x += x;
        this.y += y;
    }

    // In radians
    setRotation(angle) {
        this.angle = angle;
    }

    // TODO: Add animation methods

}

// DyanmicDrawable is given its x, y coordinates in its draw method
class DynamicDrawable {
    constructor( camera, sx, sy, sdx, sdy, dx, dy, tileSprite ) {
        Object.assign(this, { camera, sx, sy, sdx, sdy, dx, dy, tileSprite });
        // this.spritesheet = ASSET_MANAGER.getAsset(tileSprite);
        this.BB = null;
        this.hasCollision = false;
        this.rotations = [];
        this.xPos;
        this.yPos
    }

    update()
    {
        if(this.BB != null)
        {
            this.updateBB()
            if(this.hasCollision)
            {
                var that = this;
                gameEngine.entities.forEach(function (entity) 
                {
                    if (entity.BB && that.BB.collide(entity.BB)) 
                    {
                        that.collision(entity);
                    }
                });
            }
        }
    }

    draw(ctx, x, y) {
        var camera = this.camera;

        var realAngle = camera.angle % (Math.PI * 2);
        var digitsToRound = 2;
        realAngle = Math.round(realAngle * (10 ** digitsToRound)) / (10 ** digitsToRound);

        if (this.rotations[JSON.stringify(realAngle)] == undefined) {
            this.rotations[JSON.stringify(realAngle)] = this.createRotatedCanvas(realAngle);
        }

        var rotatedSprite = this.rotations[JSON.stringify(realAngle)];
        var tileWidth = camera.pixelScale * camera.linearScale[0];
        var tileHeight = camera.pixelScale * camera.linearScale[1];
        var thisTileWidth = rotatedSprite[0].width * tileWidth;
        var thisTileHeight = rotatedSprite[0].height * tileHeight;
        this.xPos = (x - camera.x) * tileWidth * Math.cos(realAngle) - (camera.y - y) * tileHeight * Math.sin(realAngle) - rotatedSprite[1];
        this.yPos = (x - camera.x) * tileWidth * Math.sin(realAngle) - (camera.y - y) * tileHeight * Math.cos(realAngle) - rotatedSprite[2];
        
        if (this.xPos < ctx.canvas.width && this.xPos + thisTileWidth - 1 >= 0 && this.yPos < ctx.canvas.height && this.yPos + thisTileHeight - 1 >= 0) {
            ctx.drawImage(rotatedSprite[0], 0, 0, rotatedSprite[0].width,rotatedSprite[0].height,this.xPos,this.yPos,thisTileWidth, thisTileHeight);
            if (PARAMS.DEBUG && this.BB != null) 
            {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            }
        }

    };
    updateBB()
    {
        if(this instanceof overWorldCoyote)
        {
            this.BB = new BoundingBox(this.xPos, this.yPos + 20, this.BB.width, this.BB.height);
        }
        else
        {
            this.BB = new BoundingBox(this.xPos, this.yPos, this.BB.width, this.BB.height);
        }
    }
    collision(player)
    {}
    createRotatedCanvas(angle) {
        var realAngle = angle % (Math.PI * 2);
        var canvas = document.createElement('canvas');
        canvas.width = Math.abs(this.dx * Math.cos(realAngle)) + Math.abs(this.dy * Math.sin(realAngle));
        canvas.height = Math.abs(this.dx * Math.sin(realAngle)) + Math.abs(this.dy * Math.cos(realAngle));
        var offscreenCtx = canvas.getContext('2d');

        var translationX = 0;
        var translationY = 0;

        if (0 <= realAngle && realAngle < Math.PI) {
            translationX += this.dy * Math.sin(realAngle);
        }
        if (Math.PI / 2 <= realAngle && realAngle < Math.PI * 3 / 2) {
            translationX -= this.dx * Math.cos(realAngle);
            translationY -= this.dy * Math.cos(realAngle);
        }
        if (Math.PI <= realAngle && realAngle < Math.PI * 2) {
            translationY -= this.dx * Math.sin(realAngle);
        }

        offscreenCtx.save();
        offscreenCtx.translate(translationX, translationY);
        offscreenCtx.rotate(realAngle);
        offscreenCtx.drawImage(this.tileSprite, this.sx, this.sy, this.sdx, this.sdy, 0, 0, this.dx, this.dy);
        offscreenCtx.restore();

        return [canvas, translationX, translationY];
    }
}

class Drawable extends DynamicDrawable {
    constructor( x, y, camera, sx, sy, sdx, sdy, dx, dy, tileSprite ) {
        super(camera, sx, sy, sdx, sdy, dx, dy, tileSprite);
        Object.assign(this, { x, y });
    }

    draw(ctx) {
        super.draw(ctx, this.x, this.y);
    }
}
