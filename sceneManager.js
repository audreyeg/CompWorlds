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
        this.scenes["desert"] = new Desert(game, this.cowboy);
        this.scenes["cave"] = new CaveScene(game, this.cowboy);
        this.scenes["fight"] = new FightScene(game, this.cowboy, new coyote(gameEngine,486,450));

        this.x = 0;

        this.missions = new MissionManager(this.game);
        this.currentScene = null;
        this.inventory = null;
        this.currentEnemy = null;

        //this.loadScene("town");

    };

    update() {
        if (playGame) {
             this.loadScene("sheriff");
            playGame = false;
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
        if(this.fight && this.fightEnd)
        {
            this.fight = false;
            this.fightEnd = false;
            this.loadScene(this.currentScene);
            document.getElementById("fightAudio").pause();
            document.getElementById("townAudio").play();
            this.currentEnemy.removeFromWorld = true;
            this.currentEnemy = null;
        }
        this.missions.missions["KillCoyote"].update();
        this.missions.missions["Bank"].update();
        this.missions.missions["FindRing"].update();
        this.cowboy.update();
    }
    draw(ctx) 
    { 
       this.missions.missions["KillCoyote"].draw(ctx);
        this.missions.missions["Bank"].draw(ctx);
        this.missions.missions["FindRing"].draw(ctx);
       this.cowboy.draw(ctx);
    }

    loadScene(scene) {
        var sceneToLoad = this.scenes[scene]
        this.game.entities = sceneToLoad.entities;
        this.currentScene = scene;
        var temp = this.game.entities.length
        for (var i = 0; i < temp; i++) 
        {
          var temp2 = this.game.entities[i];
          if(temp2 instanceof SceneInventory) 
          {
              this.inventory = temp2;
          }
      }
    }

    createFightSceneWithEnemy(enemy) 
    {
        this.currentEnemy = enemy;
        var sceneToLoad = new FightScene(this.game, this.cowboy, enemy);
        this.game.entities = sceneToLoad.entities;
        this.fight = true;
    }
}
