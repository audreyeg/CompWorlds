class CowBoy {
    constructor(game,x,y) {
    	Object.assign(this, {game, x, y});
    	
        
        // Starting Coordinates
        this.x = x;
        this.y = y;
        this.game = game;
       
       //this.game.animation = this;
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cowboy.png");

        this.facing = 0; //0 = right, 1 = left
        this.state = 0; //0 = idle, 1 = running
        this.fire = 0; //0 = not shooting, 1 = shooting, 2 = dead
        this.health = 50;
        this.dead = false;
        this.gravity = 9.8/60;
        this.velocity = { x: 0, y: 0 };
        this.onGround = false;
        this.attacking = false;
        this.turn;

        this.updateBB();

        //cowboy's animations
        this.animations = [];

        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop

        //idle + facing right
        this.animations.push(new Animator(this.spritesheet, 9, 9, 62, 90, 2, .5, 2, false, true));
        //move right + facing right
  		  this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true));
       
       //idle + facing left 
       this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
       //moving left and facing left
       this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true));

       //idle + facing up
		   this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
		//moving up and facing up 
	    	this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 15, 0.1, 2.5, false, true));

       //idle + facing down 
       this.animations.push(new Animator(this.spritesheet, 6, 6, 44, 69, 1, 0.1, 2, false, true));
       //moving down and facing down
       this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 15, 0.1, 2.5, false, true));
        //shooting
        this.animations.push(new Animator(this.spritesheet, 478,213, 113, 90,4,1/4, 0, false, true));

        //dead
        this.animations.push(new Animator(this.spritesheet, 253,564, 345-253, 613-564, 1, 0.1, 2, false, true));
    }

  draw(ctx) {
  		//idle, face right, not shooting
  		if (this.state == 0 && this.facing == 0 && this.fire == 0) {
  			this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
  		}
  		 //idle, face right, shooting
  		else if (this.state == 0 && this.facing == 0 && this.fire == 1){
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
  		} 
  		//move right, face right, not shooting
  		 else if (this.state == 1 && this.facing == 0 && this.fire == 0) {
  			this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//move right, face right, shooting
  		else if (this.state == 1 && this.facing == 0 && this.fire == 1) {
			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
  		} 
  		//idle, face left, not shooting
  		else if (this.state == 0 && this.facing == 1 && this.fire == 0){
  			ctx.scale(-1,1);
  			this.animations[2].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
  			ctx.restore();
  		} 
  		//idle, face left, shooting 
  		else if (this.state == 0 && this.facing == 1 && this.fire == 1){
  			ctx.scale(-1,1);
  			this.animations[8].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 1);
  			ctx.restore();
  		}
  		 //move left, face left, not shooting
  		else if (this.state == 1 && this.facing == 1 && this.fire == 0){
  			ctx.scale(-1,1);
  			this.animations[3].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
  			ctx.restore();
  		}
  		//move left, face left, shooting 
  		else if (this.state == 1 && this.facing == 1 && this.fire == 1){
  			ctx.scale(-1,1);
  			this.animations[8].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 1);
  			ctx.restore();
  		} 
  		else if (this.state == 0 && this.facing == 3) {
  			this.animations[4].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving up, not shooting
  		else if (this.state == 1 && this.facing == 3 && this.fire == 0) {
  			this.animations[5].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving up, shooting
  		else if (this.state == 1 && this.facing == 3 && this.fire == 1) {
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
  		else if (this.state == 0 && this.facing == 4) {
  			this.animations[6].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
  		//moving down, not shooting
  		 else if (this.state == 1 && this.facing == 4 && this.fire == 0) {
  			this.animations[7].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		} 
  		//moving down, shooting
  		else if (this.state == 1 && this.facing == 4 && this.fire == 1){
  			this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  		}
      //dead 
      else if (this.state == 2) {
        this.animations[9].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
      }
    }

    updateBB() {
    	this.lastBB = this.BB;
    	this.BB = new BoundingBox(this.x, this.y, 62*2, 90*2);
    }
    update() {
      if(!this.dead)
        {
        if(this.timer == 0)
        {
          this.state = 0; 
          this.facing = 0;
          this.fire = 0;
          this.attacking = false;
        }
        else
        {
          this.timer --;
        }
        if(!this.onGround)
        {
            this.velocity.y += this.gravity;
        }
        if(this.game.interact)
        {
          //this.attack();
        }
          //collision
          var that = this;
          this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
              if(entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft && that.velocity.y != 0)
                  {
                      that.velocity.y = 0;
                      //that.y = entity.y - 118;
                      that.onGround = true;
                  }
            }
          });
      }
        if(!this.dead)
        {
          this.updateBB();
        }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  attack()
  {
    this.state = 0;
    this.facing = 0; 
    this.fire = 1;
    this.timer = 52;
    this.attacking = true;
  }
  heal(amount)
  {
    this.health += amount;
    if(this.health > 50)
    {
      this.health = 50;
    }
  }
  killed()
  {
    this.state = 2;
    this.BB = new BoundingBox(this.x, this.y, 62*2, 90);
    this.y += 90;
  }
}
