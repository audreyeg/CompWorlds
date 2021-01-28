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
        // this.sceneStack = [];

        this.loadScene("town");
    };

    update() { }
    draw() { }

    loadScene(scene) {
        var sceneToLoad = this.scenes[scene]
        this.game.entities = sceneToLoad.entities;
        this.currentScene = sceneToLoad;
    }

    createFightSceneWithEnemy(enemy) {
        console.log(enemy);
        return new FightScene(this.game, this.cowboy, enemy);
    }
}
