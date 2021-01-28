class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.fight = false;
        this.fightEnd = false;

        this.cowboy = new Character(this.game);

        this.scenes = [];
        this.scenes["town"] = new TownScene(game, this.cowboy);
        this.scenes["bank"] = new BankScene(game, this.cowboy);
        this.scenes["saloon"] = new SaloonScene(game, this.cowboy);
        this.scenes["sheriff"] = new SheriffScene(game, this.cowboy);
        this.scenes["fight"] = new FightScene(game, this.cowboy, new coyote(gameEngine,486,450));

        this.x = 0;

        this.currentScene = null;
        // this.sceneStack = [];

        this.loadScene("town");
    };

    update() {
        if(this.fight && this.fightEnd)
        {
            this.fight = false;
            this.fightEnd = false;
            this.loadScene(this.currentScene);
        }
    }
    draw() { }

    loadScene(scene) {
        var sceneToLoad = this.scenes[scene]
        this.game.entities = sceneToLoad.entities;
        this.currentScene = scene;
    }

    createFightSceneWithEnemy(enemy) 
    {
        console.log(enemy);
        var sceneToLoad = new FightScene(this.game, this.cowboy, enemy);
        this.game.entities = sceneToLoad.entities;
        this.fight = true;
    }
}
