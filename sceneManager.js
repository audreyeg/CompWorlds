class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.cowboy = new Character(this.game);

        this.scenes = [];
        this.scenes["town"] = new TownScene(game, this.cowboy);
        this.scenes["bank"] = new BankScene(game, this.cowboy);
        this.scenes["saloon"] = new SaloonScene(game, this.cowboy);
        this.scenes["sheriff"] = new SheriffScene(game, this.cowboy);

        this.x = 0;

        this.currentScene = null;
        this.sceneStack = [];

        this.loadScene(this.scenes["town"]);
    };

    update() { }
    draw() { }

    // TODO: Maybe combine the next two methods
    // Note: Do not use this to load a scene already present in the scenestack. TODO: Make this impossible
    loadScene(scene) {
        this.sceneStack.push(this.currentScene);
        this.game.entities = scene.getEntities();
        this.currentScene = scene;
    }

    // Note: Do not use on an empty scenestack. TODO: Make this impossible
    popScene() {
        var newScene = this.sceneStack.pop();
        this.game.entities = newScene.getEntities();
        this.currentScene = newScene;
    }

    createFightSceneWithEnemy(enemy) {
        console.log(enemy);
        return new FightScene(this.game, this.cowboy, enemy);
    }
}
