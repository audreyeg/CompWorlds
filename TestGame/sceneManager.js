class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.loadTown();    
        this.cowboy;
    };

    loadTown()
    {
        this.x = 0;
        gameEngine.addEntity(new Town(gameEngine,0,0));
        this.cowboy = new  OverWorldPlayer(gameEngine,0,450);
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
        this.fight = new Fight(gameEngine,this.cowboy,this.coyote);
        gameEngine.addEntity(this.fight);
    }
    update()
    {
        if(this.cowboy.x < 0)
        {
            this.clearEntities();
            this.loadFightScene();
        }
    }
    draw()
    {

    }
    clearEntities() 
    {
        this.game.entities = [];
    };
}