class MissionManager
{
    constructor(game)
    {
        this.game = game;
        this.missions = [];
        this.missions["Bank"] = new BankerMission(this.game);
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
        //console.log(this.game.camera.currentScene);
        //console.log(this.game.camera.inventory.checkItem("coin"));
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