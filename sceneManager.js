class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.entityStorage = [];
        this.storageSize;   
        this.cowboy;
        // this.fight = false;
        // this.overworld = true;
        // The above is replaced with the following, which is changed whenever a new scene is loaded
        this.sceneLoaded = "overworld";
        this.fightScene;

        this.loadTown(); 
        // TODO: Delete the below. For testing only.
        // this.saveEntities();
        // this.clearEntities();
        // this.loadBank(); 
    };

    loadBank() {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "bank";

        var TILE_WIDTH = 128;

        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            gameEngine.addEntity(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                gameEngine.addEntity(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            gameEngine.addEntity(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        // Make corners
        gameEngine.addEntity(new HouseTopLeftCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseTopRightCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        gameEngine.addEntity(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        gameEngine.addEntity(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        // TODO: Put door here!
        // gameEngine.addEntity(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseBottomLeftCornerBeam(gameEngine, 3 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseBottomWall(gameEngine, 4 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseBottomWall(gameEngine, 5 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        
        gameEngine.addEntity(new Money(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Money(gameEngine, 4.5 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Money(gameEngine, 4 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        gameEngine.addEntity(new Money(gameEngine, 4.5 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));


        // Add beep bop boop bep cowboy
        gameEngine.addEntity(this.cowboy);

    }

    loadSheriff() {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "sheriff";
        
        var TILE_WIDTH = 128;


        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            gameEngine.addEntity(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                gameEngine.addEntity(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            gameEngine.addEntity(new HouseBottomWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, true));
            gameEngine.addEntity(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        // Make corners
        gameEngine.addEntity(new HouseBottomRightCornerBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        gameEngine.addEntity(new HouseBottomLeftCornerBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        gameEngine.addEntity(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        gameEngine.addEntity(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        gameEngine.addEntity(new HouseBottomWall(gameEngine, 0 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new ClosedCage(gameEngine, 1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseBottomLeftCornerBeam(gameEngine, 2 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new ClosedCage(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseLeftWall(gameEngine, 2 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseBottomLeftCornerBeam(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new OpenCage(gameEngine, 4.9 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseLeftWall(gameEngine, 4 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        

        // Add beep bop boop bep cowboy
        gameEngine.addEntity(this.cowboy);

    }

    loadSaloon() {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "saloon";

        var TILE_WIDTH = 128;

        // Make corners
        gameEngine.addEntity(new HouseTopLeftRoundCorner(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseTopRightRoundCorner(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        gameEngine.addEntity(new HouseTopLeftRoundCorner(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        gameEngine.addEntity(new HouseTopRightRoundCorner(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        // Make and left sides of screen
        for (var i = 1; i < 5; i++) {
            gameEngine.addEntity(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseLeftWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, true));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                gameEngine.addEntity(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, j === 5));
            }
            gameEngine.addEntity(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            gameEngine.addEntity(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        gameEngine.addEntity(new WheelTable(gameEngine, 5 * TILE_WIDTH, 1 * TILE_WIDTH, true));
        gameEngine.addEntity(new WheelTable(gameEngine, 5 * TILE_WIDTH, 2.5 * TILE_WIDTH, true));
        gameEngine.addEntity(new WheelTable(gameEngine, 5 * TILE_WIDTH, 4 * TILE_WIDTH, true));

        gameEngine.addEntity(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        gameEngine.addEntity(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        gameEngine.addEntity(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 3 * TILE_WIDTH, false));
        
        gameEngine.addEntity(new Crate(gameEngine, 1 * TILE_WIDTH, 0.1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Crate(gameEngine, 1 * TILE_WIDTH, 1.1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Crate(gameEngine, 1 * TILE_WIDTH, 2.1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Crate(gameEngine, 1 * TILE_WIDTH, 3.1 * TILE_WIDTH, false));
        gameEngine.addEntity(new Crate(gameEngine, 1 * TILE_WIDTH, 4.1 * TILE_WIDTH, false));
        
        for (var i = 0; i < 5; i += 0.5) {
            gameEngine.addEntity(new Barrel(gameEngine, 1.75 * TILE_WIDTH, (i + 0.1) * TILE_WIDTH, false));
        }

        // Add beep bop boop bep cowboy
        gameEngine.addEntity(this.cowboy);
        
    }

    loadTown()
    {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "overworld";

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
        //saloon
        gameEngine.addEntity(new Floor(gameEngine, 45, 150, 975, 550));
        gameEngine.addEntity(new Saloon(gameEngine, 0, 25, true));

        //sheriff
        gameEngine.addEntity(new Floor(gameEngine, 575, 60, 975, 550));
        gameEngine.addEntity(new Sheriff(gameEngine, 520, 25, true));

        //bank
        gameEngine.addEntity(new Floor(gameEngine, 1100, 50, 470, 600));
        gameEngine.addEntity(new Bank(gameEngine, 1075, 20, true));

        gameEngine.addEntity(new House(gameEngine, 5, 545, 350, 150));
        gameEngine.addEntity(new House(gameEngine, 405, 545, 200, 150));
        gameEngine.addEntity(new House(gameEngine, 650, 545, 250, 150));
        gameEngine.addEntity(new House(gameEngine, 1000, 545, 400, 150));
        gameEngine.addEntity(this.cowboy);
    }
    loadFightScene()
    {
        this.saveEntities();
        this.clearEntities();
        this.sceneLoaded = "fight";

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
        if(this.sceneLoaded == "overworld" && this.cowboy.x > 700)
        {
            // The following is replaced with this.sceneLoaded = "fight", which is set in the loadFightScene() method
            // this.fight = true;
            // this.overworld = false;
            this.loadFightScene();
        }
        if((this.fight && this.fightScene.end) || (this.cowboy.y > 700 && (this.sceneLoaded == "bank" || this.sceneLoaded == "saloon" || this.sceneLoaded == "sheriff" )))
        {
            this.reloadEntites();
            this.sceneLoaded = "overworld";
        }
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
            if(this.entityStorage[i] instanceof OverWorldPlayer)
            {
                this.cowboy = this.entityStorage[i];
            }
        }
        this.fightScene = null;
        this.entityStorage = [];
    }
}
