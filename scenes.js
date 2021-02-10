// Abstract Scene class, one for each scene
class Scene {
    constructor(game, character) {
        this.game = game;
        this.character = character;
        this.entities = [];
        this.inventory = new SceneInventory(this.game,this); 
    };
}

class FightScene extends Scene {
    constructor(game, character, enemy) {
        super(game, character);
        this.enemy = enemy;

        // Sets up scene
        this.fightChar = new CowBoy(gameEngine,160,400,this.character);
        //this.enemy = new coyote(gameEngine,486,450);
        this.x = 0;
        this.entities.push(this.fightChar);
        this.entities.push(this.enemy);
        this.entities.push(new groundLeft(gameEngine,0,600));
        this.entities.push(new groundCen(gameEngine,84,600));
        this.entities.push(new groundCen(gameEngine,168,600));
        this.entities.push(new groundCen(gameEngine,252,600));
        this.entities.push(new groundCen(gameEngine,336,600));
        this.entities.push(new groundCen(gameEngine,420,600));
        this.entities.push(new groundCen(gameEngine,504,600));
        this.entities.push(new groundCen(gameEngine,588,600));
        this.entities.push(new groundCen(gameEngine,672,600));
        this.entities.push(new groundRig(gameEngine,756,600));
        this.entities.push(new groundLside(gameEngine,0,684));
        this.entities.push(new groundMid(gameEngine,84,684));
        this.entities.push(new groundMid(gameEngine,168,684));
        this.entities.push(new groundMid(gameEngine,252,684));
        this.entities.push(new groundMid(gameEngine,336,684));
        this.entities.push(new groundMid(gameEngine,420,684));
        this.entities.push(new groundMid(gameEngine,504,684));
        this.entities.push(new groundMid(gameEngine,588,684));
        this.entities.push(new groundMid(gameEngine,672,684));
        this.entities.push(new groundMid(gameEngine,756,684));
        console.log(this.enemy)
        this.fightScene = new Fight(gameEngine,this.fightChar,this.enemy);
        this.entities.push(this.fightScene);
        this.entities.push(this.inventory);
    }

}

class BankScene extends Scene {
    constructor(game, character) {
        super(game, character)

        // Sets up scene
        var TILE_WIDTH = 128;
    
        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        
        }
    
        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }
    
        // Make corners
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
    
        this.entities.push(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        // TODO: Put door here!
        // gameEngine.addEntity(new HouseLeftWall(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 3 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 4 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 5 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Chest(gameEngine, 2.5 * TILE_WIDTH, .5 * TILE_WIDTH, false));
    
        // Add beep bop boop bep cowboy
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        this.entities.push(this.inventory);
    }
}

class SheriffScene extends Scene {
    constructor(game, character) {
        super(game, character)
        
        // Sets up scene
        var TILE_WIDTH = 128;
    
    
        // Make and left sides of screen
        for (var i = 0; i < 6; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseRightWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
        }
    
        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, false));
            }
            this.entities.push(new HouseBottomWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, true));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }
    
        // Make corners
        this.entities.push(new HouseBottomRightCornerBeam(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightCornerCrossBeam(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopLeftCornerCrossBeam(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
    
        this.entities.push(new HouseBottomWall(gameEngine, 0 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new ClosedCage(gameEngine, 1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 2 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new ClosedCage(gameEngine, 3 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseLeftWall(gameEngine, 2 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new OpenCage(gameEngine, 4.9 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new HouseLeftWall(gameEngine, 4 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        
    
        // Add beep bop boop bep cowboy
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        this.entities.push(this.inventory);
    }
}

class SaloonScene extends Scene {
    constructor(game, character) {
        super(game, character)

        // Sets up scene
        var TILE_WIDTH = 128;

        // Make corners
        this.entities.push(new HouseTopLeftRoundCorner(gameEngine, 0 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopRightRoundCorner(gameEngine, 5 * TILE_WIDTH, 0 * TILE_WIDTH, false));
        this.entities.push(new HouseTopLeftRoundCorner(gameEngine, 5 * TILE_WIDTH, 5 * TILE_WIDTH, true));
        this.entities.push(new HouseTopRightRoundCorner(gameEngine, 0 * TILE_WIDTH, 5 * TILE_WIDTH, true));

        // Make and left sides of screen
        for (var i = 1; i < 5; i++) {
            this.entities.push(new CenterHouseFadeLeft(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 0 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new CenterHouseFadeRight(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, false));
            this.entities.push(new HouseLeftWall(gameEngine, 5 * TILE_WIDTH, i * TILE_WIDTH, true));
        
        }

        // Make center columns
        for (var i = 1; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.entities.push(new CenterHouse(gameEngine, i * TILE_WIDTH, j * TILE_WIDTH, j === 5));
            }
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 0 * TILE_WIDTH, false));
            this.entities.push(new HouseTopWall(gameEngine, i * TILE_WIDTH, 5 * TILE_WIDTH, true));
        }

        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 1 * TILE_WIDTH, true));
        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 2.5 * TILE_WIDTH, true));
        this.entities.push(new WheelTable(gameEngine, 5 * TILE_WIDTH, 4 * TILE_WIDTH, true));

        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new LeftWallWoodThing(gameEngine, 0.1 * TILE_WIDTH, 3 * TILE_WIDTH, false));
        
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 0.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 1.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 2.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 3.1 * TILE_WIDTH, false));
        this.entities.push(new Crate(gameEngine, 1 * TILE_WIDTH, 4.1 * TILE_WIDTH, false));
        
        for (var i = 0; i < 5; i += 0.5) {
            this.entities.push(new Barrel(gameEngine, 1.75 * TILE_WIDTH, (i + 0.1) * TILE_WIDTH, false));
        }

        this.entities.push(new npc(gameEngine, 500, 400, "saloon"));
        this.entities.push(new npc(gameEngine, 100, 400, "bartender"));
        // Add beep bop boop bep cowboy
        this.entities.push(new OverWorldPlayer(gameEngine,350,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        this.entities.push(this.inventory);
    }
}

    
class TownScene extends Scene {
    constructor(game, character) {
        super(game, character)
        // Sets up scene
        this.entities.push(new Town(gameEngine,0,0));
        for(var i = 0; i < 3; i++)
        {
            this.entities.push(new DesertGround(gameEngine,256 * 0,256 * i));
            this.entities.push(new DesertGround(gameEngine,256 * 1,256 * i));
            this.entities.push(new DesertGround(gameEngine,256 * 2,256 * i));
            this.entities.push(new DesertGround(gameEngine,256 * 3,256 * i));
            this.entities.push(new DesertGround(gameEngine,256 * 4,256 * i));
            this.entities.push(new DesertGround(gameEngine,256 * 5,256 * i));
        }
        for(var i = 0; i < 44; i++ )
        {
            this.entities.push(new Road(gameEngine,32 * i,400));
            this.entities.push(new Road(gameEngine,32 * i,464));
        }
        //gameEngine.addEntity(new groundCen(gameEngine,0,366));
        //saloon
        //gameEngine.addEntity(new Floor(gameEngine, 45, 150, 975, 550));
        this.entities.push(new Saloon(gameEngine, 0, 25, true));

        //sheriff
        //gameEngine.addEntity(new Floor(gameEngine, 575, 60, 975, 550));
        this.entities.push(new Sheriff(gameEngine, 520, 25, true));

        //bank
        //gameEngine.addEntity(new Floor(gameEngine, 1100, 50, 470, 600));
        this.entities.push(new Bank(gameEngine, 1075, 20, true));

        this.entities.push(new House(gameEngine, 5, 545, 350, 150));
        this.entities.push(new House(gameEngine, 405, 545, 200, 150));
        this.entities.push(new House(gameEngine, 650, 545, 250, 150));
        this.entities.push(new House(gameEngine, 1000, 545, 400, 150));
        this.entities.push(new OverWorldPlayer(gameEngine,0,450,this.character));
        this.entities.push(new saloonLZ(gameEngine,170,355,55,25));
        this.entities.push(new sheriffLZ(gameEngine,700,255,55,25));
        this.entities.push(new bankLZ(gameEngine,1165,300,23,25));
        this.entities.push(new fightLZ(gameEngine,1165,450,50,50));
        this.entities.push(new fightLZ(gameEngine,1065,450,50,50));
        this.entities.push(new fightLZ(gameEngine,1265,450,50,50));

        this.entities.push(new Heal(gameEngine, 200, 400));
        this.entities.push(new Heal(gameEngine, 800, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(this.inventory);
    }
}
