var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/coyote.png");
ASSET_MANAGER.queueDownload("./sprites/npc.png");
ASSET_MANAGER.queueDownload("./sprites/DesertGround.png");
ASSET_MANAGER.queueDownload("./sprites/dialoug.png");
ASSET_MANAGER.queueDownload("./sprites/health.png");
ASSET_MANAGER.queueDownload("./sprites/cowboy.png");
ASSET_MANAGER.queueDownload("./sprites/crit.png");
ASSET_MANAGER.queueDownload("./sprites/HealthPickup.png");
ASSET_MANAGER.queueDownload("./sprites/TownConceptV3.png");
ASSET_MANAGER.queueDownload("./sprites/DesertTileSet.png");
ASSET_MANAGER.queueDownload("./sprites/house.png");
ASSET_MANAGER.queueDownload("./sprites/saloon.png");
ASSET_MANAGER.queueDownload("./sprites/sheriff.png");
ASSET_MANAGER.queueDownload("./sprites/bank.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/saloongirl.png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (14).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (15).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (16).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (21).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (22).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (24).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (27).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (23).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (26).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (30).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (33).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (29).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (31).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Static Objects/Other/Money (1).png");
ASSET_MANAGER.queueDownload("./sprites/Cage_grey_standard_staying_3.png");
ASSET_MANAGER.queueDownload("./sprites/Cage_grey_broken_staying_3.png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Static Objects/Other/Wheel 2.png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Tiles/House/HouseTile (36).png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Static Objects/Other/Crate.png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Static Objects/Other/Barrel.png");
ASSET_MANAGER.queueDownload("./sprites/coin.png");
ASSET_MANAGER.queueDownload("./sprites/png/Separate/128/Animated Objects/Chest/Chest (4).png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);



	// Code to test camera thing
	/* TODO: DELETE
	var spriteName = "./sprites/png/Separate/128/Tiles/House/HouseTile (23).png";
	var camera = new Camera();
	camera.setRotation(Math.PI / 4);
	camera.moveToPosition(-1000, 0);
	camera.pixelScale = 0.5
	console.log(camera);
	var thing = new Drawable(gameEngine, 0, 0, 128, 128, spriteName);
	thing.draw(ctx, camera);
	var thing = new Drawable(gameEngine, 128, 0, 128, 128, spriteName);
	thing.draw(ctx, camera);
	var thing = new Drawable(gameEngine, 256, 0, 128, 128, spriteName);
	thing.draw(ctx, camera);
	var thing = new Drawable(gameEngine, 384, 0, 128, 128, spriteName);
	thing.draw(ctx, camera);
	*/
	        


	new SceneManager(gameEngine);
	gameEngine.start();
});
