class lCaveWall extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 160, 15, 15, 32, 16 * 3,32 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class rCaveWall extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 176, 15, 15, 32, 16 * 3,32 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class tCaveWall extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 199, 65, 51, 46, 51*3,47*3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class bCaveWall extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 199, 50, 40, 16, 40*3,16*3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class caveFloor extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 0, 144, 31, 31, 64,64, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class cavePillar extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 204, 49, 40, 62, 40 * 3,62 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,40 * 3,62 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class cavePillarREdge extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 237, 49, 19, 62, 19 * 3,62 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,19 * 3,62 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class cavePillarLEdge extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 193, 49, 19, 62, 19 * 3,62 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,19 * 3,62 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class cavePillarVertical extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 211, 324, 27, 39, 27 * 3,39 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,27 * 3,39 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class cavePillarTEdge extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 211, 311, 28, 15, 28 * 3,15 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,28 * 3,15 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class cavePillarBEdge extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 211, 358, 28, 15, 28 * 3,15 * 3, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.game = game;
        this.firstLoad = true;
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(new DrawBoundry(gameEngine,this.x,this.y,28 * 3,15 * 3,this.camera));
            this.firstLoad = false;
        }
    }
}
class Boulder extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 0, 0, 255, 255, 80,80, ASSET_MANAGER.getAsset("./sprites/boulder.png"));
        this.game = game;
        this.firstLoad = true;
        this.destroyed = false;
        this.boundry = new DrawBoundry(gameEngine,this.x,this.y,80,80,this.camera)
    }
    update() {
        if(this.firstLoad)   
        {
            this.game.entities.push(this.boundry);
            this.firstLoad = false;
        }
        if(this.destroyed)
        {
            this.boundry.removeFromWorld = true;
            this.removeFromWorld = true;
        }
    }
}





















class caveOutside extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 97, 49, 14, 14, 64,64, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}
class caveExit extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 48, 56, 48, 46, 48*2,48*2, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
        this.BB = new BoundingBox(x,y,48*2,48*2);
        this.hasCollision = true;
    }
    collision(entity)
    {
        if(entity instanceof OverWorldPlayer && entity.facingState == 3)
        {
            entity.y -= 20;
            gameEngine.camera.loadScene("desert");
        }
    }
}