class Fight {
    constructor(game, player, enemy) {
        console.log(enemy);

        Object.assign(this, { game, player, enemy });
        this.player = player;
        this.enemy = enemy;
        this.player.turn = true;
        this.enemy.turn = false;
        this.delay = 0;
        this.wait = 0;
        this.end = false;
        this.damage = 0;
        this.defending = false;
        this.print = true;
    }

    draw(ctx) {
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
        ctx.fillText("Special", 500, 75);
        ctx.strokeStyle = "Black";
        ctx.strokeRect(500, 110, 200, 20);
        ctx.fillRect(500, 110, this.enemy.specialMeter * 2, 20);
        ctx.fillText("Special (Not yet implimented)", 5, 75);
        ctx.strokeStyle = "Black";
        ctx.strokeRect(5, 110, 200, 20);
        ctx.fillRect(5, 110, this.player.specialMeter * 2, 20);

    }
    update() {
        if (this.player.turn && this.delay == 0 && !this.end) {
            changeChat("Z) Attack" + '<br>' + "X) Defend (Requires and consumes 1 armor piece)" + '<br>' + "C) Heal (Requires and consumes 1 medpac)" + '<br>' + "V) Special Attack (Requires and consumes full special meter)");
            if (this.game.one) {
                this.player.attack();
                this.enemy.health -= this.player.stats.damage;
                if(this.enemy.health <= 0)
                {
                    this.enemy.health = 0;
                }
                changeChat("You hit the enemy for " + this.player.stats.damage + " damage");
                this.enemy.specialMeter += 10;
                this.delay = 120;
                this.player.turn = false;
                this.enemy.turn = true;
            }
            else if (this.game.two) {
                if (playerInventory.hasItem("armor", 0)) {
                    this.player.defending = true;
                    playerInventory.removeItem("armor", 1)
                    this.defending = true
                    this.delay = 120;
                    this.player.turn = false;
                    this.enemy.turn = true;
                    changeChat("You take a defensive stance");
                }
                else {
                    changeChat("You have no Armor Plates!");
                    this.delay = 120;
                }
            }
            else if (this.game.three) {
                if (this.player.stats.health == this.player.stats.maxHealth) {
                    changeChat("Your health is full!");
                    this.delay = 120;
                }
                else if (playerInventory.hasItem("medpac", 0)) {
                    this.player.heal()
                    this.delay = 120;
                    this.player.turn = false;
                    this.enemy.turn = true;
                    changeChat("You restored 25 health!");
                    gameEngine.addEntity(new Heal(gameEngine, this.player.x, this.player.y, true));
                    gameEngine.addEntity(new Heal(gameEngine, this.player.x + 30, this.player.y - 20, true));
                    gameEngine.addEntity(new Heal(gameEngine, this.player.x + 60, this.player.y, true));

                }
                else {
                    changeChat("You have no medpacs!");
                    this.delay = 120;
                }
            }
            else if (this.game.four) {
                if (this.player.stats.specialMeter < 100) {
                    changeChat("Special is not ready!");
                    this.delay = 120;
                }
                else {
                    this.player.special();
                    changeChat("You used bullet barrage!");
                }
            }
            if(this.enemy.health == 0)
            {
                this.end = true;
                this.enemy.dead = true;
            }
        }
        else if (this.enemy.turn && this.delay == 0 && !this.end) {
            var check = -1;
            if (this.start) {
                check = Math.floor(Math.random() * 10);
                this.start = false;
            }
            if (check == 1) {
                this.enemy.heal();
                this.delay = 120;
                gameEngine.addEntity(new Heal(gameEngine, this.enemy.x, this.enemy.y, true));
                gameEngine.addEntity(new Heal(gameEngine, this.enemy.x + 30, this.enemy.y - 20, true));
                gameEngine.addEntity(new Heal(gameEngine, this.enemy.x + 60, this.enemy.y, true));
                this.enemy.turn = false;
                this.player.turn = true;
                this.start = true;
            }
            else if (!this.attacking) {
                if (this.enemy.specialMeter < 100) {
                    this.enemy.attack();
                    this.enemy.specialMeter += 25;
                    this.damage = this.enemy.damage;
                    this.attacking = true;
                    this.wait = 0;
                    changeChat("You were hit for X damage");
                }
                else if (this.enemy.specialMeter >= 100) {
                    this.enemy.specialMeter = 0;
                    this.enemy.special();
                    this.damage = this.enemy.specialDamage;
                    this.attacking = true;
                    this.wait = this.enemy.specialDelay;
                    changeChat(this.enemy.name + " attacks with " + this.enemy.specialName);
                }
            }
            else {
                if (this.wait > 0) {
                    this.wait--;
                }
                else {
                    if (this.defending) {
                        this.damage = Math.floor(this.damage / 5);
                        this.player.defending = false;
                        this.defending = false;
                    }
                    changeChat("You were hit for " + Math.floor(this.damage) + " damage");
                    this.player.stats.takeDamage(Math.floor(this.damage));
                    this.delay = 120;
                    this.enemy.turn = false;
                    this.player.turn = true;
                    this.start = true;
                    this.attacking = false;
                }
            }
            if(this.player.stats.health == 0)
            {
                this.end = true;
                this.player.dead = true;
            }
        }
        else if (this.end) {
            if(this.enemy.dead)
            {
                if(this.print)
                {
                    var str = "Killing the " + this.enemy.name + " has granted " + this.enemy.baseXP + " XP!";
                    this.game.camera.cowboy.giveXP(this.enemy.baseXP);
                    var num =  Math.floor(Math.random() * this.enemy.chance);
                    if(num == 1)
                    {
                        var num2 = this.enemy.rewardMin + Math.floor(Math.random() * this.enemy.spread);
                        str += "<br>You looted " + num2 + " " + this.enemy.reward + "!"; 
                        playerInventory.addItem(this.enemy.reward, num2);
                    }
                    str += "<br>Press Space to continue!";
                    changeChat(str);
                    this.print = false;
                }
                else if(this.game.interact)
                {
                    this.game.camera.fightEnd = true;
                }
               
            }
            else if(this.player.dead)
            {
                changeChat("You Have Died"); 
            }


        }
        else if (this.delay > 0) {
            this.delay--;
        }
    }
}
