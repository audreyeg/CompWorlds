class SceneLoader
{
    constructor(game)
    {
        this.game = game;
        this.scenes = [];
        this.newScene = [];
        this.cowboy = new Character(this.game);
        this.loadTown();// town = 0
        this.loadSaloon()//saloon = 1;
        this.loadSheriff();//sheriff = 2;
        this.loadBank();//Bank = 3;
    }
    loadTown()
    {
        this.newScene = [];
        this.newScene.push(new Town(gameEngine,0,0));
        for(var i = 0; i < 3; i++)
        {
            this.newScene.push(new DesertGround(gameEngine,256 * 0,256 * i));
            this.newScene.push(new DesertGround(gameEngine,256 * 1,256 * i));
            this.newScene.push(new DesertGround(gameEngine,256 * 2,256 * i));
            this.newScene.push(new DesertGround(gameEngine,256 * 3,256 * i));
            this.newScene.push(new DesertGround(gameEngine,256 * 4,256 * i));
            this.newScene.push(new DesertGround(gameEngine,256 * 5,256 * i));
        }
        for(var i = 0; i < 44; i++ )
        {
            this.newScene.push(new Road(gameEngine,32 * i,400));
            this.newScene.push(new Road(gameEngine,32 * i,464));
        }
        //gameEngine.addEntity(new groundCen(gameEngine,0,366));
        //saloon
        //gameEngine.addEntity(new Floor(gameEngine, 45, 150, 975, 550));
        this.newScene.push(new Saloon(gameEngine, 0, 25, true));

        //sheriff
        //gameEngine.addEntity(new Floor(gameEngine, 575, 60, 975, 550));
        this.newScene.push(new Sheriff(gameEngine, 520, 25, true));

        //bank
        //gameEngine.addEntity(new Floor(gameEngine, 1100, 50, 470, 600));
        this.newScene.push(new Bank(gameEngine, 1075, 20, true));

        this.newScene.push(new House(gameEngine, 5, 545, 350, 150));
        this.newScene.push(new House(gameEngine, 405, 545, 200, 150));
        this.newScene.push(new House(gameEngine, 650, 545, 250, 150));
        this.newScene.push(new House(gameEngine, 1000, 545, 400, 150));
        this.newScene.push(new OverWorldPlayer(gameEngine,0,450,this.cowboy));
        this.newScene.push(new saloonLZ(gameEngine,170,355,55,25));
        this.newScene.push(new sheriffLZ(gameEngine,700,255,55,25));
        this.newScene.push(new bankLZ(gameEngine,1165,300,23,25));
        this.newScene.push(new fightLZ(gameEngine,1165,450,50,50));
        this.newScene.push(new fightLZ(gameEngine,1065,450,50,50));
        this.newScene.push(new fightLZ(gameEngine,1265,450,50,50));

        this.newScene.push(new Heal(gameEngine, 200, 400));
        this.newScene.push(new Heal(gameEngine, 800, 400));
        this.newScene.push(new Coin(gameEngine, 500, 400));
        this.newScene.push(new Coin(gameEngine, 100, 400));

        this.scenes.push(this.newScene);
    }
    loadBank() {
        this.newScene = [];

        var TILE_WIDTH = 128;

        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.newScene.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.newScene.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.newScene.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.newScene.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        // Make corners
        this.newScene.push(new HouseTopLeftCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.newScene.push(new HouseTopRightCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.newScene.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.newScene.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        this.newScene.push(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        // TODO: Put door here!
        // gameEngine.addEntity(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new HouseBottomLeftCornerBeam(gameEngine, 3 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.newScene.push(new HouseBottomWall(gameEngine, 4 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.newScene.push(new HouseBottomWall(gameEngine, 5 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        
        this.newScene.push(new Money(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new Money(gameEngine, 4 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.newScene.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));


        // Add beep bop boop bep cowboy
        this.newScene.push(new OverWorldPlayer(gameEngine,384,700,this.cowboy));
        this.newScene.push(new townLZ(gameEngine,350,750,50,25));
        this.scenes.push(this.newScene);
    }
    loadSheriff() {
        this.newScene = [];
        
        var TILE_WIDTH = 128;


        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.newScene.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.newScene.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.newScene.push(new HouseBottomWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, true));
            this.newScene.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        // Make corners
        this.newScene.push(new HouseBottomRightCornerBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.newScene.push(new HouseBottomLeftCornerBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.newScene.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.newScene.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        this.newScene.push(new HouseBottomWall(gameEngine, 0 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new ClosedCage(gameEngine, 1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new HouseBottomLeftCornerBeam(gameEngine, 2 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new ClosedCage(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new HouseLeftWall(gameEngine, 2 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.newScene.push(new HouseBottomLeftCornerBeam(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new OpenCage(gameEngine, 4.9 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new HouseLeftWall(gameEngine, 4 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        

        // Add beep bop boop bep cowboy
        this.newScene.push(new OverWorldPlayer(gameEngine,384,700,this.cowboy));
        this.newScene.push(new townLZ(gameEngine,350,750,50,25));
        this.scenes.push(this.newScene);
    }
    loadSaloon() {
        this.newScene = [];

        var TILE_WIDTH = 128;

        // Make corners
        this.newScene.push(new HouseTopLeftRoundCorner(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.newScene.push(new HouseTopRightRoundCorner(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.newScene.push(new HouseTopLeftRoundCorner(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.newScene.push(new HouseTopRightRoundCorner(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        // Make and left sides of screen
        for (var i = 1; i < 5; i++) {
            this.newScene.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.newScene.push(new HouseLeftWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, true));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.newScene.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, j === 5));
            }
            this.newScene.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.newScene.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        this.newScene.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 1 * TILE_WIDTH, true));
        this.newScene.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 2.5 * TILE_WIDTH, true));
        this.newScene.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 4 * TILE_WIDTH, true));

        this.newScene.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.newScene.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.newScene.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 3 * TILE_WIDTH, false));
        
        this.newScene.push(new Crate(gameEngine, 1 * TILE_WIDTH, 0.1 * TILE_WIDTH, false));
        this.newScene.push(new Crate(gameEngine, 1 * TILE_WIDTH, 1.1 * TILE_WIDTH, false));
        this.newScene.push(new Crate(gameEngine, 1 * TILE_WIDTH, 2.1 * TILE_WIDTH, false));
        this.newScene.push(new Crate(gameEngine, 1 * TILE_WIDTH, 3.1 * TILE_WIDTH, false));
        this.newScene.push(new Crate(gameEngine, 1 * TILE_WIDTH, 4.1 * TILE_WIDTH, false));
        
        for (var i = 0; i < 5; i += 0.5) {
            this.newScene.push(new Barrel(gameEngine, 1.75 * TILE_WIDTH, (i + 0.1) * TILE_WIDTH, false));
        }

        this.newScene.push(new npc(gameEngine, 500, 400));
        // Add beep bop boop bep cowboy
        this.newScene.push(new OverWorldPlayer(gameEngine,350,700,this.cowboy));
        this.newScene.push(new townLZ(gameEngine,350,750,50,25));
        this.scenes.push(this.newScene);
    }
}
