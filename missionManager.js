class MissionManager
{
    constructor(game)
    {
        this.game = game;
        this.missions = [];
        this.missions["Bank"] = new BankerMission(this.game);
        this.missions["KillCoyote"] = new KillCoyoteMission(this.game);
        this.missions["FindRing"] = new findStolenRing(this.game);
        this.missions["FindMoney"] = new findMoney(this.game);
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
            // ctx.font = "15px Papyrus";
            // ctx.fillStyle = "Red";
            // ctx.fillText("Put Two Coins Into The Chest", 5, 25);
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
            // ctx.font = "15px Papyrus";
            // ctx.fillStyle = "Red";
            // ctx.fillText("Kill One Coyote", 5, 25);
           addQuests("coyote");
        }
        if (this.state == 2) {
            addQuests("coyote killed");
        }
        if (this.state == 3) {
            clearQuests("coyote");
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
            // ctx.font = "15px Papyrus";
            // ctx.fillStyle = "Red";
            // ctx.fillText("Find the stolen ring", 5, 25);
            //document.getElementById("quests").innerHTML = "Find the stolen ring.";
            addQuests("find ring");
        }
        if (this.state == 2)
        {
            addQuests("return ring");
        }
        if (this.state == 3) {
            clearQuests("ring");
        }
    }
}

class findMoney extends Missions 
{
    constructor(game)
    {
        super(game,"Find Money");
        this.flags["found"] = false;
        this.state = 0;
    }
    update()
    {
        if(this.state == 1)
        {
            if(moneyFound)
            {
                  this.state = 2;
            }
        }
    }
    draw(ctx)
    {
        if(this.state == 1)
        {
            addQuests("find money");
        }
        if (this.state == 2)
        {
            addQuests("return money");
        }
        if (this.state == 3) {
            clearQuests("money");
        }
    }
}

