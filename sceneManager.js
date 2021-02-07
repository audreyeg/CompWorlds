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
        this.missions = new MissionManager(game);

        this.x = 0;

        this.currentScene = null;
        // this.sceneStack = [];
        this.inventory = null;

        this.loadScene("town");
    };

    update() {
        if(this.fight && this.fightEnd)
        {
            this.fight = false;
            this.fightEnd = false;
            this.loadScene(this.currentScene);
        }
        this.missions.missions["Bank"].update();
    }
    draw(ctx) 
    { 
        /*
        ctx.font = "15px Papyrus";
        ctx.fillStyle = "Red";
        ctx.fillText("Coins: ", 5, 25);
        ctx.font = "30px Papyrus";
        ctx.fillStyle = "Red";
        ctx.fillText(this.inventory.checkItem("coin"), 55, 25);
        */
       this.missions.missions["Bank"].draw(ctx);
    }

    loadScene(scene) {
        var sceneToLoad = this.scenes[scene]
        this.game.entities = sceneToLoad.entities;
        this.currentScene = scene;
        var temp = this.game.entities.length
        for (var i = 0; i < temp; i++) 
        {
          console.log(this.game.entities[i]);
          var temp2 = this.game.entities[i];
          if(temp2 instanceof SceneInventory) 
          {
              console.log(temp2);
              this.inventory = temp2;
          }
      }
    }

    createFightSceneWithEnemy(enemy) 
    {
        console.log(enemy);
        var sceneToLoad = new FightScene(this.game, this.cowboy, enemy);
        this.game.entities = sceneToLoad.entities;
        this.fight = true;
    }
}
