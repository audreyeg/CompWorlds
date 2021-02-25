class MissionManager
{
    constructor(game)
    {
        this.game = game;
        this.missions = [];
        this.missions["Bank"] = new BankerMission(this.game);
        this.missions["KillCoyote"] = new KillCoyoteMission(this.game);
        this.missions["FindRing"] = new findStolenRing(this.game);
    }
}
class Missions
{
    constructor(game,name)
    {
        this.game = game;
        this.state = 0;// 0: inavtive 1: active 2: completed 
        this.name = name;
        this.flags = [];
    }
}
class BankerMission  extends Missions 
{
    constructor(game)
    {
        super(game,"Pay Two Coins.");
        this.flags["Paid"] = false;
        this.state = 0;
    }
    update()
    {
        if(this.state == 1)
        {
            if(this.game.camera.currentScene == "bank")
            {
                if(this.game.camera.inventory.checkItem("coin") == '2')
                {
                    this.state = 2;
                }
            }
        }
    }
    draw(ctx)
    {
        if(this.state == 1)
        {
            ctx.font = "15px Papyrus";
            ctx.fillStyle = "Red";
            ctx.fillText("Put Two Coins Into The Chest", 5, 25);
        }
    }
}

class KillCoyoteMission  extends Missions 
{
    constructor(game)
    {
        super(game,"Kill Coyote");
        this.flags["Killed"] = false;
        this.state = 0;
        this.killed = coyotesKilled;
        killCoyoteMissionActive = true;
    }
    update()
    {
        if(this.state == 1)
        {
            if(this.killed < coyotesKilled)
            {
                  this.state = 2;
            }
            console.log(this.state);
            console.log("coyotes killed:" + coyotesKilled);
        }
    }
    draw(ctx)
    {
        if(this.state == 1)
        {
            ctx.font = "15px Papyrus";
            ctx.fillStyle = "Red";
            ctx.fillText("Kill One Coyote", 5, 25);
        }
    }
}

class findStolenRing extends Missions 
{
    constructor(game)
    {
        super(game,"Find Ring");
        this.flags["found"] = false;
        this.state = 0;
    }
    update()
    {
        if(this.state == 1)
        {
            if(ringFound)
            {
                  this.state = 2;
            }
        }
    }
    draw(ctx)
    {
        if(this.state == 1)
        {
            ctx.font = "15px Papyrus";
            ctx.fillStyle = "Red";
            ctx.fillText("Find the stolen ring", 5, 25);
        }
    }
}
