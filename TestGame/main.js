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

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	new SceneManager(gameEngine);
	gameEngine.start();
});
