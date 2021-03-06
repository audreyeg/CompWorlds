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
class caveOutside extends Drawable
{
    constructor(game,x,y,camera)
    {
        super(x, y, camera, 96, 49, 14, 14, 64,64, ASSET_MANAGER.getAsset("./sprites/CaveTileset.png"));
    }
}