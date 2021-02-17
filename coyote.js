class coyote{

    constructor(game, x, y,parent,lvl) {
        Object.assign(this, { game, x, y });
        this.game.coyote = this;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coyote.png");
        this.velocity = { x: 0, y: 0 };
        this.dead = false;
        this.updateBB();
        this.stunTime = 0;
        this.walkingAnimaton = new Animator(this.spritesheet,151,0,145,118,5,.25,8,false,true);
        this.attackingAnimaton = new Animator(this.spritesheet,0,794,154,121,5,1/5,1,true,true);
        this.collideTime = 0;
        this.attackTime = 0;
        this.facingState = 0;
        this.attacking = false;
        this.gravity = 9.8/60;
        this.onGround = false;
        this.dialoug = false;
        this.dialougBox;
        this.delay = 0;
        this.returnTime = 0;
        this.turn;
        this.healthMax = (lvl * 1);
        this.health = (lvl * 10);
        this.parent = parent;
        this.baseXP = 25;
        this.lvl = lvl;
        this.damage = 5 * (1 + (this.lvl * .25));
        this.reward = "medpac";
        this.rewardMin = 1;
        this.spread = 1;
        this.chance = 10;
    };
    update()
    {
        if(!this.onGround)
        {
            this.velocity.y += this.gravity;
        }
        if(this.stunTime == 0 && this.attackTime == 0 && !this.dialoug && this.returnTime == 0)
        {
                this.velocity.x = 0; 
        }
        if(this.stunTime > 0)
        {
              this.stunTime--;
        }
        if(this.attackTime > 0)
        {
             this.attackTime--;
             this.velocity.x = -5;
             if(this.attackTime == 0)
             {
                    this.facingState = 1;
                    this.velocity.x = 5
                    this.returnTime = 60;
                    this.attacking = false;
             }
        }
        if(this.collideTime > 0)
        {
            this.collideTime--;
        }
        if(this.delay > 0)
        {
            this.delay--;
        }
        if(this.returnTime > 0)
        {
            this.returnTime--
            if(this.returnTime == 0)
            {
                this.facingState = 0;
                this.move = false;
            }
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) 
            {
                if(entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft && that.velocity.y != 0)
                {
                    that.velocity.y = 0;
                    that.y = entity.y - 118;
                    that.onGround = true;
                }
            }
        });
        if(this.x > 486)
        {
            this.x = 486;
        }
        if(this.dead)
        {
            this.y = 570;
        }
    }
    draw(ctx)
    {
        if(!this.dead)
        {
            if(this.attackTime > 0)
            {
                if(this.facingState == 1)
                {
                    this.attackingAnimaton.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
                }
                else
                {
                    ctx.scale(-1,1);
                    this.attackingAnimaton.drawFrame(this.game.clockTick,ctx,-this.x - (73 * 2 ),this.y,1);
                    ctx.restore();
                }
            }
            else if(this.facingState == 0 && this.velocity.x != 0)
            {
                ctx.scale(-1,1);
                this.walkingAnimaton.drawFrame(this.game.clockTick,ctx,-this.x - (61 * 2),this.y,1);
                ctx.restore();
            }
            else if (this.facingState == 1 && this.velocity.x != 0)
            {
                this.walkingAnimaton.drawFrame(this.game.clockTick,ctx,this.x,this.y,1);
            }
            else
            {
                if(this.facingState == 0)
                {
                    ctx.scale(-1,1);
                    ctx.drawImage(this.spritesheet,0,0,136,120,-this.x - 145 ,this.y,145,120);
                    ctx.restore();
                }
                else
                {
                    ctx.drawImage(this.spritesheet,0,0,136,120,this.x,this.y,145,120);
                }
            }
        }
        else
        {
            ctx.scale(-1,1);
            ctx.drawImage(this.spritesheet,155,849,153,40,-this.x - 153 ,this.y,153,40);
            ctx.restore();
        }
        
    }
    updateBB()
    {
        if(this.attacking == false)
        {
            this.BB = new BoundingBox(this.x, this.y + 26 ,145,94);
        }
        else
        {
            if(this.facingState == 1)
            {
                this.BB = new BoundingBox(this.x, this.y + 26 ,165,94)
            }
            else
            {
                this.BB = new BoundingBox(this.x - 20, this.y + 26 ,165,94)
            }
        }
    }
    attack()
    {
        this.attackTime = 60;
        this.attacking = true;
        this.velocity.x = 0; 
        this.velocity.y = -3; 
        this.onGround = false;

    }
    heal()
    {
      this.health += this.lvl + 5;
      if(this.health > this.healthMax)
      {
        this.health = this.healthMax;
      }
    }
}
class overWorldCoyote
{
    constructor(game,x,y,lvl)
    {
        this.game = game;
        this.x = x;
        this.y = y;
        this.lvl = lvl
        this.BB = new fightLZ(this.game,this.x,this.y + 20,60,30,new coyote(this.game,486,450,this,this.lvl));
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coyote.png");
    }
    update()
    {
        this.BB.update();
    }
    draw(ctx)
    {
            ctx.drawImage(this.spritesheet,0,0,136,120,this.x ,this.y,36.25 * 2,30 * 2);
            this.BB.draw(ctx);
    }
}