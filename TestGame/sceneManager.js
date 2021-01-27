class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.entityStorage = [];
        this.storageSize;   
        this.cowboy;
        this.fight = false;
        this.fightScene;
        this.overworld = true;

        this.loadTown(); 
    };

    loadTown()
    {
        this.x = 0;
        gameEngine.addEntity(new Town(gameEngine,0,0));
        this.cowboy = new  OverWorldPlayer(gameEngine,0,450);
        for(var i = 0; i < 3; i++)
        {
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 0,256 * i));
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 1,256 * i));
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 2,256 * i));
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 3,256 * i));
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 4,256 * i));
            gameEngine.addEntity(new DesertGround(gameEngine,256 * 5,256 * i));
        }
        for(var i = 0; i < 44; i++ )
        {
            gameEngine.addEntity(new Road(gameEngine,32 * i,400));
            gameEngine.addEntity(new Road(gameEngine,32 * i,464));
        }
        //gameEngine.addEntity(new groundCen(gameEngine,0,366));
        gameEngine.addEntity(this.cowboy);
    }
    loadFightScene()
    {
        this.x = 0;
        this.coyote = new coyote(gameEngine,486,450);
        this.cowboy = new CowBoy(gameEngine,160,400);
        gameEngine.addEntity(this.coyote);
        gameEngine.addEntity(this.cowboy);
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
        this.fightScene = new Fight(gameEngine,this.cowboy,this.coyote);
        gameEngine.addEntity(this.fightScene);
    }
    update()
    {
        if(this.overworld && this.cowboy.x > 700)
        {
            this.fight = true;
            this.overworld = false;
            this.storageSize = gameEngine.entities.length;
            for(var i = 0; i < this.storageSize ; i++)
            {
                var entity = gameEngine.entities[i];
                this.entityStorage.push(entity); 
            }
            this.clearEntities();
            this.loadFightScene();
        }
        if(this.fight)
        {
            if(this.fightScene.end)
            {
                this.reloadEntites();
                this.fight = false;
            }
        }
    }
    draw()
    {

    }
    clearEntities() 
    {
        gameEngine.entities = [];
    }
    reloadEntites()
    {
        this.clearEntities();
        this.storageSize = this.entityStorage.length;
        //console.log(this.storageSize);
        for(var i = 0; i < this.storageSize; i++)
        {
            gameEngine.addEntity(this.entityStorage[i]);
            if(this.entityStorage[i] instanceof OverWorldPlayer)
            {
                this.cowboy = this.entityStorage[i];
            }
        }
        console.log(this.game.entities);
        this.fightScene = null;
        this.entityStorage = [];
    }
}