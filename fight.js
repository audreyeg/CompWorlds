class Fight {
    constructor(game,player,enemy) 
    {
        console.log(enemy);

        Object.assign(this, {game, player, enemy});
        this.player = player;
        this.enemy = enemy;
        this.player.turn = true;
        this.enemy.turn = false;
        this.dialoug = false
        this.dialogBox;
        this.delay = 0;
        this.defending = false;
        this.charging = false;
        this.chargeTime = 0;
        this.enemy.dead = false;
        this.player.dead = false;
        this.wait = 0;
        this.crit = false;
        this.attacking = false;
        this.end = false;
    }

    draw(ctx) 
    {
      ctx.font = "15px Papyrus";
      ctx.fillStyle = "Red";
      ctx.fillText("health: ", 5, 25);
      ctx.font = "30px Papyrus";
      ctx.fillStyle = "Red";
      ctx.fillText(this.player.stats.health, 55, 25);
      ctx.font = "15px Papyrus";
      ctx.fillStyle = "Red";
      ctx.fillText("Enemy health: ", 500, 25);
      ctx.font = "30px Papyrus";
      ctx.fillStyle = "Red";
      ctx.fillText(this.enemy.health, 600, 25);
    }
    update() 
    {
        if(this.player.turn && this.delay == 0 && (!this.enemy.dead || !this.player.dead))
        {
            if(!this.dialoug)
            {
                this.dialoug = true;
                this.dialogBox = new dialog(gameEngine,100,100,"Z)Attack X)Defend C)Heal");
                this.game.addEntity(this.dialogBox);
            }
            if(this.game.one)
            {
                this.enemy.turn = true;
                this.player.turn = false;
                this.dialogBox.removeFromWorld = true;
                this.dialoug = false;
                this.player.attack();
                this.enemy.health -= this.player.stats.damage;
                this.delay = 120;
            }
            else if(this.game.two)
            {
                this.enemy.turn = true;
                this.player.turn = false;
                this.dialogBox.removeFromWorld = true;
                this.dialoug = false;
                this.delay = 120;
                this.defending = true;
            }
            else if(this.game.three)
            {
                this.player.turn = false;
                this.enemy.turn = true;
                this.dialogBox.removeFromWorld = true;
                this.dialoug = false;
                this.delay = 120;
                this.player.stats.heal(25);
                gameEngine.addEntity(new Heal(gameEngine,this.player.x,this.player.y,true));
                gameEngine.addEntity(new Heal(gameEngine,this.player.x + 30,this.player.y - 20,true));
                gameEngine.addEntity(new Heal(gameEngine,this.player.x + 60,this.player.y,true));
            }
            if(this.enemy.health <= 0)
            {
                this.enemy.dead = true;
            }
        }
        else if(this.enemy.turn && this.delay == 0 && (!this.enemy.dead || !this.player.dead))
        {

                this.temp = Math.floor(Math.random() * 10);
                this.temp2 = Math.floor(Math.random() * 10);

            //if(this.temp == 1 ||this.temp == 2 ||this.temp == 3 ||this.temp == 4 ||this.temp == 5 ||this.temp == 6 ||this.temp == 7 ||this.temp == 8 )
            if(this.temp == 1)
            {
                this.crit = true;
                this.attacking = true;
                this.wait = 45;
                this.enemy.attack();
                this.player.turn = true;
                this.enemy.turn = false;
                this.delay = 120;
            }
            else if(this.temp2 == 1)
            {
                this.enemy.heal(25);
                this.player.turn = true;
                this.enemy.turn = false;
                this.defending = false;
                this.delay = 120;
                gameEngine.addEntity(new Heal(gameEngine,this.enemy.x,this.enemy.y,true));
                gameEngine.addEntity(new Heal(gameEngine,this.enemy.x + 30,this.enemy.y - 20,true));
                gameEngine.addEntity(new Heal(gameEngine,this.enemy.x + 60,this.enemy.y,true));
            }
            else
            {
                this.attacking = true;
                this.wait = 45;
                this.delay = 120;
                this.enemy.attack();
                this.player.turn = true;
                this.enemy.turn = false;
            }
        }
        else if(this.player.dead || this.enemy.dead)
        {

            if(!this.dialoug && this.player.dead)
            {
                this.dialogBox = new dialog(gameEngine,100,100,"You Have Died!");
                this.dialoug = true;
                this.game.addEntity(this.dialogBox);
                this.player.killed();
            }
            else if(!this.dialoug && this.enemy.dead)
            {
               // this.dialogBox = new dialog(gameEngine,100,100,"You Have Killed The Coyote!");
               // this.dialoug = true;
               // this.game.addEntity(this.dialogBox);
               this.game.camera.cowboy.giveXP(this.enemy.baseXP * this.enemy.lvl);
               this.game.camera.fightEnd = true;
            }
        }
        else
        {
            this.delay--;
        }
        if(this.attacking && this.wait == 0)
        {
            if(this.crit)
            {
                if(this.defending)
                {
                    this.player.stats.takeDamage(this.enemy.damage);
                    this.defending = false;
                }
                else
                {
                    this.player.stats.takeDamage(this.enemy.damage * 5);
                }
                gameEngine.addEntity(new Crit(gameEngine,this.enemy.x,this.enemy.y));
                this.crit = false;
                if(this.player.stats.health <= 0)
                {
                    this.player.dead = true;
                }
            }
            else
            {
                if(this.defending)
                {
                    this.player.stats.takeDamage(this.enemy.damage / 5);
                    this.defending = false;
                }
                else
                {
                    this.player.stats.takeDamage(this.enemy.damage);
                }
                if(this.player.health <= 0)
                {
                    this.player.dead = true;
                }
            }
            this.attacking = false;
        }
        else
        {
            this.wait--;
        }
    }

}
