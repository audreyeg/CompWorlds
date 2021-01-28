class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.scenes = new SceneLoader();
        this.currentScene = 0;
        this.nextScene = 0;
        this.loadingScene = [];
        this.entityStorage = [];
        this.changeScene(0);
    };
    changeScene(newScene)
    {
        this.loadingScene = this.scenes.scenes[newScene];
        //console.log(this.loadingScene);
        this.scenes.scenes[this.currentScene] = this.game.entities;
        this.game.entities = this.loadingScene;
        this.currentScene = newScene;
    }





    loadFightScene(enemy)
    {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "fight";
        this.fightChar = new CowBoy(gameEngine,160,400,this.scenes.cowboy);
        this.enemy = enemy;
        //this.enemy = new coyote(gameEngine,486,450);
        this.x = 0;
        gameEngine.addEntity(this.fightChar);
        gameEngine.addEntity(this.enemy);
        gameEngine.addEntity(new groundLeft(gameEngine,0,600));
        gameEngine.addEntity(new groundCen(gameEngine,84,600));
        gameEngine.addEntity(new groundCen(gameEngine,168,600));
        gameEngine.addEntity(new groundCen(gameEngine,252,600));
        gameEngine.addEntity(new groundCen(gameEngine,336,600));
        gameEngine.addEntity(new groundCen(gameEngine,420,600));
        gameEngine.addEntity(new groundCen(gameEngine,504,600));
        gameEngine.addEntity(new groundCen(gameEngine,588,600));
        gameEngine.addEntity(new groundCen(gameEngine,672,600));
        gameEngine.addEntity(new groundRig(gameEngine,756,600));
        gameEngine.addEntity(new groundLside(gameEngine,0,684));
        gameEngine.addEntity(new groundMid(gameEngine,84,684));
        gameEngine.addEntity(new groundMid(gameEngine,168,684));
        gameEngine.addEntity(new groundMid(gameEngine,252,684));
        gameEngine.addEntity(new groundMid(gameEngine,336,684));
        gameEngine.addEntity(new groundMid(gameEngine,420,684));
        gameEngine.addEntity(new groundMid(gameEngine,504,684));
        gameEngine.addEntity(new groundMid(gameEngine,588,684));
        gameEngine.addEntity(new groundMid(gameEngine,672,684));
        gameEngine.addEntity(new groundMid(gameEngine,756,684));
        this.fightScene = new Fight(gameEngine,this.fightChar,this.enemy);
        gameEngine.addEntity(this.fightScene);
    }
    update()
    {
    }
    
    draw()
    {
    }
    clearEntities() 
    {
        gameEngine.entities = [];
    }
    saveEntities() {
        this.storageSize = gameEngine.entities.length;
        for(var i = 0; i < this.storageSize ; i++)
        {
            var entity = gameEngine.entities[i];
            this.entityStorage.push(entity); 
        }
    }
    reloadEntites()
    {
        this.clearEntities();
        this.storageSize = this.entityStorage.length;
        //console.log(this.storageSize);
        for(var i = 0; i < this.storageSize; i++)
        {
            gameEngine.addEntity(this.entityStorage[i]);
            if(this.entityStorage[i] instanceof Character)
            {
                this.cowboy = this.entityStorage[i];
            }
        }
        this.fightScene = null;
        this.entityStorage = [];
    }
}
