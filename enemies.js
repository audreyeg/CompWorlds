class coyote {

  constructor(game, x, y, parent, lvl) {
    Object.assign(this, { game, x, y, parent, lvl });
    // spritesheet
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/coyote.png");
    this.velocity = { x: 0, y: 0 };
    this.dead = false;
    this.updateBB();
    this.name = "Coyote";
    this.stunTime = 0;
    this.walkingAnimaton = new Animator(this.spritesheet, 151, 0, 145, 118, 5, .25, 8, false, true);
    this.attackingAnimaton = new Animator(this.spritesheet, 0, 794, 154, 121, 5, 1 / 5, 1, true, true);
    this.collideTime = 0;
    this.attackTime = 0;
    this.facingState = 0;
    this.attacking = false;
    this.gravity = 9.8 / 60;
    this.onGround = false;
    this.dialoug = false;
    this.dialougBox;
    this.delay = 0;
    this.returnTime = 0;
    this.turn;
    this.healthMax = (lvl * 7);
    this.health = this.healthMax;
    this.parent = parent;
    this.baseXP = 25;
    this.lvl = lvl;
    this.damage = 7 * (1 + (this.lvl * .25));
    this.specialDamage = 35 * (1 + (this.lvl * .25));
    this.reward = "medpac";
    this.rewardMin = 1;
    this.spread = 1;
    this.chance = 10;// 1 in __ chance
    this.critChance = 10; // 1 in __ chance
    this.critMultiplier = 3;
    this.healChance = 10;// 1 in __ chance
    this.specialMeter = 100;
    this.specialName = "Howling Strike";
    this.howl = false;
    this.howling = -1;
    this.specialDelay = 180;
  };
  update() {
    if (this.howling > 0) {
      this.howling--;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.updateBB();
    }
    else if (this.howling == 0) {
      this.y -= 10;
      this.howling = -1;
      this.howl = false;
      this.attack();
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.updateBB();
    }
    else {
      if (!this.onGround) {
        this.velocity.y += this.gravity;
      }
      if (this.stunTime == 0 && this.attackTime == 0 && !this.dialoug && this.returnTime == 0) {
        this.velocity.x = 0;
      }
      if (this.stunTime > 0) {
        this.stunTime--;
      }
      if (this.attackTime > 0) {
        this.attackTime--;
        this.velocity.x = -5;
        if (this.attackTime == 0) {
          this.facingState = 1;
          this.velocity.x = 5
          this.returnTime = 60;
          this.attacking = false;
        }
      }
      if (this.collideTime > 0) {
        this.collideTime--;
      }
      if (this.delay > 0) {
        this.delay--;
      }
      if (this.returnTime > 0) {
        this.returnTime--
        if (this.returnTime == 0) {
          this.facingState = 0;
          this.move = false;
        }
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.updateBB();
      var that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB)) {
          if (entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft && that.velocity.y != 0) {
            that.velocity.y = 0;
            //that.y = entity.y - 118;
            that.onGround = true;
          }
        }
      });
      if (this.x > 486) {
        this.x = 486;
      }
      if (this.dead) {
        this.y = 570;
      }
      if (this.health < 0) {
        this.health = 0;
      }
      if (this.specialMeter > 100) {
        this.specialMeter = 100;
      }
    }
    this.updateBB();
  }
  draw(ctx) {
    if (this.howl) {
      ctx.drawImage(this.spritesheet, 787, 500, 85, 106, this.x, this.y, 85, 106);
    }
    else if (!this.dead) {
      if (this.attackTime > 0) {
        if (this.facingState == 1) {
          this.attackingAnimaton.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        }
        else {
          ctx.scale(-1, 1);
          this.attackingAnimaton.drawFrame(this.game.clockTick, ctx, -this.x - (73 * 2), this.y, 1);
          ctx.restore();
        }
      }
      else if (this.facingState == 0 && this.velocity.x != 0) {
        ctx.scale(-1, 1);
        this.walkingAnimaton.drawFrame(this.game.clockTick, ctx, -this.x - (61 * 2), this.y, 1);
        ctx.restore();
      }
      else if (this.facingState == 1 && this.velocity.x != 0) {
        this.walkingAnimaton.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
      }
      else {
        if (this.facingState == 0) {
          ctx.scale(-1, 1);
          ctx.drawImage(this.spritesheet, 0, 0, 136, 120, -this.x - 145, this.y, 145, 120);
          ctx.restore();
        }
        else {
          ctx.drawImage(this.spritesheet, 0, 0, 136, 120, this.x, this.y, 145, 120);
        }
      }
    }
    else {
      ctx.scale(-1, 1);
      ctx.drawImage(this.spritesheet, 155, 849, 153, 40, -this.x - 153, this.y, 153, 40);
      ctx.restore();
    }
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

  }
  updateBB() {
    if (this.howl) {
      this.BB = new BoundingBox(this.x, this.y + 26, 85, 80);
    }
    else if (this.attacking == false) {
      this.BB = new BoundingBox(this.x, this.y + 26, 145, 94);
    }
    else {
      if (this.facingState == 1) {
        this.BB = new BoundingBox(this.x, this.y + 26, 165, 94)
      }
      else {
        this.BB = new BoundingBox(this.x - 20, this.y + 26, 165, 94)
      }
    }
  }
  attack() {
    this.attackTime = 60;
    this.attacking = true;
    this.velocity.x = 0;
    this.velocity.y = -3;
    this.onGround = false;

  }
  heal() {
    this.health += this.lvl + 5;
    changeChat("The enemy restored " + (this.lvl + 5) + " health!");
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
  }
  special() {
    this.howl = true;
    this.howling = 120;
    this.y += 10;
  }
}

class Bandit {
  constructor(game, x, y, parent, lvl) {
    Object.assign(this, { game, x, y, parent, lvl });

    // Starting Coordinates
    this.x = x;
    this.y = 400;
    this.game = game;
    //this.game.animation = this;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bandit.png");

    this.facing = 1; //0 = right, 1 = left
    this.state = 0; //0 = idle, 1 = running
    this.fire = 0; //0 = not shooting, 1 = shooting, 2 = dead
    this.health = 50;
    this.name = "Bandit";
    this.stall = true;
    this.dead = false;
    this.gravity = 9.8 / 60;
    this.velocity = { x: 0, y: 0 };
    this.onGround = false;
    this.attacking = false;
    this.turn;
    this.healthMax = (lvl * 12);
    this.health = this.healthMax;
    this.parent = parent;
    this.baseXP = 30;
    this.lvl = lvl;
    this.damage = 2 * (1 + (this.lvl * .25));
    this.specialDamage = 25 * (1 + (this.lvl * .25));
    this.reward = "coin";
    this.rewardMin = 2;
    this.spread = 5;
    this.chance = 3;// 1 in __ chance
    this.critChance = 15; // 1 in __ chance
    this.critMultiplier = 5;
    this.healChance = 10;// 1 in __ chance
    this.specialMeter = 100;
    this.specialName = "Bullet Barrage";
    this.updateBB();
    this.specialDelay = 360;

    //cowboy's animations
    this.animations = [];
    //idle + facing left 
    this.animations.push(new Animator(this.spritesheet, 9, 9, 62, 90, 2, 0.5, 2, false, true));
    //shooting
    this.animations.push(new Animator(this.spritesheet, 478, 213, 113, 90, 4, 1 / 4, 0, false, true));
    //dead
    this.animations.push(new Animator(this.spritesheet, 253, 564, 345 - 253, 613 - 564, 1, 0.1, 0, false, true));
  }

  draw(ctx) {
    //idle, face left, not shooting
    if (this.state == 0 && this.facing == 1 && this.fire == 0) {
      ctx.scale(-1, 1);
      this.animations[0].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 2);
      ctx.restore();
    }
    //idle, face left, shooting 
    else if (this.state == 0 && this.facing == 1 && this.fire == 1) {
      ctx.scale(-1, 1);
      this.animations[1].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 2);
      ctx.scale(-1, 1);
    }
    //dead 
    else if (this.state == 2) {
      ctx.scale(-1, 1);
      this.animations[2].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 2);
      ctx.scale(-1, 1);
    }
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90 * 2);
  }
  update() {
    if (this.specialAttack) {
      if (this.wait > 0) {
        this.wait--;
      }
      else if (this.barrage > 0) {
        this.barrage--;
        this.state = 0;
        this.facing = 1;
        this.fire = 1;
      }
      else {
        this.specialAttack = false;
        this.timer = 0;
      }
    }
    else {
      if (!this.dead) {
        if (this.timer == 0) {
          this.state = 0;
          this.facing = 1;
          this.fire = 0;
          this.attacking = false;
        }
        else if (this.timer > 0) {
          this.timer--;
        }
        if (!this.onGround) {
          this.velocity.y += this.gravity;
        }
        //collision
        var that = this;
        this.game.entities.forEach(function (entity) {
          if (entity.BB && that.BB.collide(entity.BB)) {
            if (entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft && that.velocity.y != 0) {
              that.velocity.y = 0;
              that.onGround = true;
            }
          }
        });
      }
      if (!this.dead) {
        this.updateBB();
      }
      if (this.health < 0) {
        this.health = 0;
      }
      if (this.dead && this.stall) {
        this.state = 2;
        this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90);
        this.y += 90;
        this.stall = false;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
    if (this.specialMeter > 100) {
      this.specialMeter = 100;
    }
  }
  attack() {
    this.state = 0;
    this.facing = 1;
    this.fire = 1;
    this.timer = 52;
    this.attacking = true;
  }
  heal() {
    this.health += this.lvl + 5;
    changeChat("The enemy restored " + (this.lvl + 5) + " health!");
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
  }
  special() {
    this.specialAttack = true;
    this.wait = 60;
    this.barrage = 300;
  }
}


class Boss {
  constructor(game, x, y, parent, lvl) {
    Object.assign(this, { game, x, y, parent, lvl });

    // Starting Coordinates
    this.x = x;
    this.y = 400;
    this.game = game;
    //this.game.animation = this;

    this.facing = 1; //0 = right, 1 = left
    this.state = 0; //0 = idle, 1 = running
    this.fire = 0; //0 = not shooting, 1 = shooting, 2 = dead
    this.health = 200;
    this.name = "Boss";
    this.stall = true;
    this.dead = false;
    this.gravity = 9.8 / 60;
    this.velocity = { x: 0, y: 0 };
    this.onGround = false;
    this.attacking = false;
    this.turn;
    this.healthMax = (lvl * 12);
    this.health = this.healthMax;
    this.parent = parent;
    this.baseXP = 30;
    this.lvl = lvl;
    this.damage = 2 * (1 + (this.lvl * .25));
    this.specialDamage = 25 * (1 + (this.lvl * .25));
    this.reward = "coin";
    this.rewardMin = 2;
    this.spread = 5;
    this.chance = 3;// 1 in __ chance
    this.critChance = 10; // 1 in __ chance
    this.critMultiplier = 5;
    this.healChance = 5;// 1 in __ chance
    this.specialMeter = 100;
    this.specialName = "Big Bang";
    this.updateBB();
    this.specialDelay = 360;

    //cowboy's animations
    this.animations = [];
    //idle + facing left 
    this.animations.push(new Animator(this.spritesheet, 9, 9, 62 + 32, 90, 2, 0.5, 2, false, true));
    //shooting
    this.animations.push(new Animator(this.spritesheet, 9, 213, 140, 90, 4, 1 / 4, 0, false, true));
    //dead
    this.animations.push(new Animator(this.spritesheet, 253, 540, 345 - 253 + 32, 90, 1, 0.1, 0, false, true));
    // big shooting
    // this.animations.push(new Animator(this.spritesheet, 642, 198, 150, 90, 4, 1 / 4, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 715, 198, 150, 105, 4, 1 / 4, 0, false, true));
  
  }

  draw(ctx) {
    var horOff = -60;

    //idle, face left, not shooting
    if (this.state == 0 && this.facing == 1 && this.fire == 0) {
      ctx.scale(-1, 1);
      this.animations[0].drawFrame(this.game.clockTick, ctx, -this.x - 70 + horOff, this.y - 95, 3);
      ctx.restore();
    }
    //idle, face left, shooting special
    else if (this.state == 0 && this.facing == 1 && this.fire == 1 && this.specialAttack) {
      ctx.scale(-1, 1);
      this.animations[3].drawFrame(this.game.clockTick, ctx, -this.x - 60 + horOff, this.y - 140, 3);
      ctx.scale(-1, 1);
    }
    //idle, face left, shooting 
    else if (this.state == 0 && this.facing == 1 && this.fire == 1) {
      ctx.scale(-1, 1);
      this.animations[1].drawFrame(this.game.clockTick, ctx, -this.x - 60 + horOff, this.y - 95, 3);
      ctx.scale(-1, 1);
    }
    //dead 
    else if (this.state == 2) {
      ctx.scale(-1, 1);
      this.animations[2].drawFrame(this.game.clockTick, ctx, -this.x - 60 + horOff, this.y - 105, 3);
      ctx.scale(-1, 1);
    }
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90 * 2);
  }
  update() {
    if (this.specialAttack) {
      if (this.wait > 0) {
        this.wait--;
      }
      else if (this.barrage > 0) {
        this.barrage--;
        this.state = 0;
        this.facing = 1;
        this.fire = 1;
      }
      else {
        this.specialAttack = false;
        this.timer = 0;
      }
    }
    else {
      if (!this.dead) {
        if (this.timer == 0) {
          this.state = 0;
          this.facing = 1;
          this.fire = 0;
          this.attacking = false;
        }
        else if (this.timer > 0) {
          this.timer--;
        }
        if (!this.onGround) {
          this.velocity.y += this.gravity;
        }
        //collision
        var that = this;
        this.game.entities.forEach(function (entity) {
          if (entity.BB && that.BB.collide(entity.BB)) {
            if (entity instanceof groundCen || entity instanceof groundRig || entity instanceof groundLeft && that.velocity.y != 0) {
              that.velocity.y = 0;
              that.onGround = true;
            }
          }
        });
      }
      if (!this.dead) {
        this.updateBB();
      }
      if (this.health < 0) {
        this.health = 0;
      }
      if (this.dead && this.stall) {
        this.state = 2;
        this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90);
        this.y += 90;
        this.stall = false;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
    if (this.specialMeter > 100) {
      this.specialMeter = 100;
    }
  }
  attack() {
    this.state = 0;
    this.facing = 1;
    this.fire = 1;
    this.timer = 52;
    this.attacking = true;
  }
  heal() {
    this.health += this.lvl + 5;
    changeChat("The enemy restored " + (this.lvl + 5) + " health!");
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
  }
  special() {
    this.specialAttack = true;
    this.wait = 60;
    this.barrage = 300;
  }
}