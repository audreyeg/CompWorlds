// Abstract Scene class, one for each scene
class Scene {
    constructor(game, character) {
        this.game = game;
        this.character = character;
        this.entities = [];
        this.inventory = new SceneInventory(this.game,this);
        this.camera = new Camera();  // Used in desert scene, TODO: use in more scenes
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
        //console.log(this.enemy)
        this.fightScene = new Fight(gameEngine,this.fightChar,this.enemy);
        this.entities.push(this.fightScene);
        this.entities.push(this.inventory);
         this.entities.push(new bgImageForChat(gameEngine,-40,650));
    }

}

class BankScene extends Scene {
    constructor(game, character) {
        super(game, character)

        // Sets up scene
        var TILE_WIDTH = 128;
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
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
        this.entities.push(new HouseBottomLeftCornerBeam(gameEngine, 3 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 4 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        this.entities.push(new HouseBottomWall(gameEngine, 5 * TILE_WIDTH, 2 * TILE_WIDTH, false));
        
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Money(gameEngine, 4.5 * TILE_WIDTH, 1.5 * TILE_WIDTH, false));
        this.entities.push(new Chest(gameEngine, 2.5 * TILE_WIDTH, .5 * TILE_WIDTH, false));
    
        // Add beep bop boop bep cowboy
        this.entities.push(this.inventory);
        this.entities.push(new npc(gameEngine, 384, 300, "banker"));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
    }
}

class SheriffScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
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
        this.entities.push(this.inventory);
        this.entities.push(new npc(gameEngine, 384, 300, "cop"));
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,384,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
    }
}

class SaloonScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 700;
        this.yMin = 0;
        this.yMax = 700;
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
        this.entities.push(this.inventory);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new OverWorldPlayer(gameEngine,350,700,this.character));
        this.entities.push(new townLZ(gameEngine,350,750,50,25));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
    }
}

    
class TownScene extends Scene {
    constructor(game, character) {
        super(game, character)
        this.xMin = 0;
        this.xMax = 1350;
        this.yMin = 0;
        this.yMax = 750;
        // Sets up scene
        this.entities.push(new Town(gameEngine,0,0));
        for(var i = 0; i < 3; i++)
        {
            this.entities.push(new DesertGround(gameEngine,256 * 0,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 1,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 2,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 3,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 4,256 * i, this.camera));
            this.entities.push(new DesertGround(gameEngine,256 * 5,256 * i, this.camera));
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
        this.entities.push(new DesertSign(this.game,1300,300));

        this.entities.push(new Heal(gameEngine, 200, 400));
        this.entities.push(new Heal(gameEngine, 800, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(new Coin(gameEngine, 500, 400));
        this.entities.push(new Coin(gameEngine, 100, 400));
        this.entities.push(this.inventory);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        this.entities.push(new npc(gameEngine, 120, 430, "guide"));
        this.entities.push(new Ring(gameEngine, 800, 700, 40, 40));
        this.entities.push(new npc(gameEngine, 350, 700, "rake"));
        this.entities.push(new npc(gameEngine, 950, 100, "shovel"));
        this.entities.push(new npc(gameEngine, 950, 550, "girl"));
        this.entities.push(new OverWorldPlayer(gameEngine,0,450,this.character));
        this.entities.push(new saloonLZ(gameEngine,170,355,55,25));
        this.entities.push(new sheriffLZ(gameEngine,700,255,55,25));
        this.entities.push(new bankLZ(gameEngine,1165,300,23,25));
        this.entities.push(new desertLZ(gameEngine,1370,415,23,100));
         //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
    }
}

class Desert extends Scene {
    constructor(game, character) {
        super(game, character);
        this.xMin = -2560;
        this.xMax = 2620;
        this.yMin = -2500;
        this.yMax = 2600;
        // this.camera.pixelScale = 128;

        //this.camera.setEntityToFollow(character);
        this.entities.push(this.camera);

        for (var i = -26; i < 25; i++) {
            for (var j = -26; j < 25; j++) {
                this.entities.push(new DesertGround(gameEngine, i * 128, j * 128, this.camera));

            }
        }

        var things = {};
        for (var i = 0; i < 40; i++) {
            // Add skull
            var x = Math.random() * 40 - 20;
            var y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 40 - 20;
                y = Math.random() * 40 - 20;
            }
            var thing = new DesertSkull(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
            
            // Add plant
            x = Math.random() * 40 - 20;
            y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 40 - 20;
                y = Math.random() * 40 - 20;
            }
            thing = new DesertPlant(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
        }
        for (var i = 0; i < 5; i++) {
            // Add Well
            var x = Math.random() * 40 - 20;
            var y = Math.random() * 40 - 20;
            while (things[JSON.stringify(x) + JSON.stringify(y)] != undefined) {
                x = Math.random() * 39 - 20;
                y = Math.random() * 39 - 20;
            }
            // Add enemy spawner
            var thing = new DesertWell(gameEngine, x * 128, y * 128, this.camera);
            this.entities.push(thing);

            var thing = new EnemySpawner(gameEngine,x * 128,2000,y * 128,2000,5,1,this.camera);
        
            this.entities.push(thing);
            things[JSON.stringify(x) + JSON.stringify(y)] = thing;
        }
        for(var i = 0; i < 27; i++)
        {
            this.entities.push(new TopGate(gameEngine, -2560 + (i * 194),-2560, this.camera));
            this.entities.push(new TopGate(gameEngine, -2560 + (i * 194), 2660, this.camera))
            this.entities.push(new SideGate(gameEngine, 2660 ,-2560 + (i * 194), this.camera));
        }
        for(var i = 0; i < 13; i++)
        {
            this.entities.push(new SideGate(gameEngine, -2560 ,-2560 + (i * 194), this.camera));
            this.entities.push(new SideGate(gameEngine, -2560 ,2500 - (i * 194), this.camera));
        }
        // Add beep bop boop bep cowboy
        var cowboys = new OverWorldPlayer(gameEngine,-2540,0,this.character, this.camera)
        for(var i = 0; i < 20; i++)
        {
            this.entities.push(new WalkWay(gameEngine,-2642 - (i * 32),0,this.camera));
        }
        this.entities.push(new CaveSideLeft(gameEngine,2358,-2590,this.camera));
        this.entities.push(new CaveSideLeftMid(gameEngine,2365,-2686,this.camera));
        this.entities.push(new CaveSideRight(gameEngine,2678,-2590,this.camera));
        this.entities.push(new CaveSideRightMid(gameEngine,2678,-2686,this.camera));
        this.entities.push(new Cave(gameEngine,2454,-2686,this.camera));
        this.entities.push(new CaveTop(gameEngine,2550,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2390,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2454,-2782,this.camera));
        this.entities.push(new CaveTop(gameEngine,2614,-2782,this.camera));
        this.entities.push(new TownSign(gameEngine,-2500,-120,this.camera));
        this.entities.push(this.inventory);
        this.entities.push(new EnemySpawner(gameEngine,-2600,2000,0,2000,5,2,this.camera))
        this.camera.setEntityToFollow(cowboys, 700, 384);
        this.entities.push(new bgImageForChat(gameEngine,-40,650));
        //this.entities.push(new bgImageForObjective(gameEngine,-25,-190));
        this.entities.push(cowboys);
        this.entities.push(new TownZone(gameEngine,-2610,0,this.camera));
    }
}
