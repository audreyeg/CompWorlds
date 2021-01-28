class CowBoy {
  constructor(game, x, y,stats) {
    Object.assign(this, { game, x, y,stats });

    this.stats = stats;
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
    this.gravity = 9.8 / 60;
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
    this.animations.push(new Animator(this.spritesheet, 478, 213, 113, 90, 4, 1 / 4, 0, false, true));

    //dead
    this.animations.push(new Animator(this.spritesheet, 253, 564, 345 - 253, 613 - 564, 1, 0.1, 2, false, true));
  }

  draw(ctx) {
    //idle, face right, not shooting
    if (this.state == 0 && this.facing == 0 && this.fire == 0) {
      this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    }
    //idle, face right, shooting
    else if (this.state == 0 && this.facing == 0 && this.fire == 1) {
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
    else if (this.state == 0 && this.facing == 1 && this.fire == 0) {
      ctx.scale(-1, 1);
      this.animations[2].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
      ctx.restore();
    }
    //idle, face left, shooting 
    else if (this.state == 0 && this.facing == 1 && this.fire == 1) {
      ctx.scale(-1, 1);
      this.animations[8].drawFrame(this.game.clockTick, ctx, -this.x - 60, this.y, 1);
      ctx.restore();
    }
    //move left, face left, not shooting
    else if (this.state == 1 && this.facing == 1 && this.fire == 0) {
      ctx.scale(-1, 1);
      this.animations[3].drawFrame(this.game.clockTick, ctx, -this.x - 44, this.y, 1);
      ctx.restore();
    }
    //move left, face left, shooting 
    else if (this.state == 1 && this.facing == 1 && this.fire == 1) {
      ctx.scale(-1, 1);
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
    else if (this.state == 1 && this.facing == 4 && this.fire == 1) {
      this.animations[8].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
    //dead 
    else if (this.state == 2) {
      this.animations[9].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    }
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90 * 2);
  }
  update() {
    if (!this.dead) {
      if (this.timer == 0) {
        this.state = 0;
        this.facing = 0;
        this.fire = 0;
        this.attacking = false;
      }
      else {
        this.timer--;
      }
      if (!this.onGround) {
        this.velocity.y += this.gravity;
      }
      if (this.game.interact) {
        //this.attack();
      }
      //collision
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
    }
    if (!this.dead) {
      this.updateBB();
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  attack() {
    this.state = 0;
    this.facing = 0;
    this.fire = 1;
    this.timer = 52;
    this.attacking = true;
  }
  heal(amount) {
    this.health += amount;
    if (this.health > 50) {
      this.health = 50;
    }
  }
  killed() {
    this.state = 2;
    this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90);
    this.y += 90;
  }
}


class OverWorldPlayer {
  constructor(game, x, y,stats) {
    Object.assign(this, { game, x, y,stats});
    this.stats = stats;
    this.x = x;
    this.y = y;
    this.game = game;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
    this.horizontalWalking = new Animator(this.spritesheet, 2, 88, 20, 31, 3, .33, 1, false, true);
    this.upWalking = new Animator(this.spritesheet, 5, 59, 18, 27, 3, .33, 4, false, true);
    this.downWalking = new Animator(this.spritesheet, 6, 3, 18, 27, 3, .33, 1, false, true);
    this.updateBB();
    this.facingState = 0; //0 = right, 1 = left 2 = up 3 = down
    this.velocity = { x: 0, y: 0 };
    this.SCALE = 2;
    this.lastX;
    this.lastY;
    this.stun = 0;
    this.timer = 0;
    //this.playerInventory = Inventory();

  }
    update() {
    if(this.stun == 0)
    {
      if (this.game.left && !this.game.right && !this.game.up && !this.game.down)
      {
        this.velocity.x = -this.stats.speed * 3;
        this.facingState = 1;
      }
      else if (this.game.right && !this.game.left && !this.game.up && !this.game.down)
      {
        this.velocity.x = this.stats.speed * 3;
        this.facingState = 0;
      }
      else if (this.game.up && !this.game.down && !this.game.left && !this.game.right)
      {
        this.velocity.y = -this.stats.speed * 3;
        this.facingState = 2;
      }
      else if (this.game.down && !this.game.up && !this.game.left && !this.game.right)
      {
        this.velocity.y = this.stats.speed * 3;
        this.facingState = 3;
      }
      else {
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
    else
    {
      this.stun--;
    }

    //collision
    var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        if (entity instanceof Heal) 
        {
          playerInventory.addItem("medpac", 1);
          entity.removeFromWorld = true;
        }
         if (entity instanceof Coin) 
        {
          playerInventory.addItem("coin", 1);
          entity.removeFromWorld = true;
        }
        if (entity instanceof npc) 
        {
          that.timer = 100;
          var str = "";
          str += "hello. I am an NPC";
          document.getElementById("chat").innerHTML = str;
        }
      }
      
      that.updateBB();
    });
    if (that.timer != 0) {
          that.timer --;
        }
    else if (that.timer == 0) {
       document.getElementById("chat").innerHTML = "";
    }

    this.lastX = this.x;
    this.lastY = this.y;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.stats.setX(this.x);
    this.stats.setY(this.y);
  }
  draw(ctx) {
    if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 0) {
      ctx.drawImage(this.spritesheet, 2, 88, 20, 31, this.x, this.y, 20 * this.SCALE, 31 * this.SCALE);
    }
    else if (this.facingState == 0) {
      this.horizontalWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
    }
    else if (this.facingState == 1) {
      ctx.scale(-1, 1);
      this.horizontalWalking.drawFrame(this.game.clockTick, ctx, -this.x - (20 * this.SCALE), this.y, this.SCALE);
      ctx.restore();
    }
    else if (this.facingState == 2) {
      this.upWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
    }
    else if (this.facingState == 3) {
      this.downWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
    }
    ctx.strokeStyle = 'Red';
    ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
  }
  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x + 5, this.y + 20, 30, 35);

  }
  push()
  {
    if(this.stun == 0)
    {
      this.x = this.lastY;
      this.x = this.lastX;
      console.log(this.velocity.y);
      this.velocity.x = -(this.velocity.x);
      this.velocity.y = -(this.velocity.y);
     console.log(this.velocity.y);
     this.stun = 5;
    }
  }
}
class Character
{
  constructor(game) 
  {
    Object.assign(this, {game});
    this.game = game;
    this.health = 50;
    this.damage = 5;
    this.armor = 5;
    this.maxHealth = 100;
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    console.log(this.health);
  } 
  takeDamage(amt)
  {
    this.health -= amt;
    if(this.health <= 0)
    {
      this.health = 0;
    }
  }
  heal(amt)
  {
    this.health += amt;
    if(this.health >= this.maxHealth)
    {
      this.health = this.maxHealth;''
    }
  }
  increaseMaxHP(amt)
  {
    this.maxHealth += amt;
  }
  setArmor(amt)
  {
    this.armor = amt;
  }
  setDamage(amt)
  {
    this.damage = amt;
  }
  setX(x)
  {
    this.x = x;
  }
  setY(y)
  {
    this.y = y;
  }
  update()
  {

  }
  draw()
  {

  }
}

//INVENTORY

Inventory = function(){
    var self = {
        items:[] //{id:"itemId",amount:1}

    }

    //add item to inentory 
    self.addItem = function(id,amount){
    for(var i = 0 ; i < self.items.length; i++){
      if(self.items[i].id === id){
        self.items[i].amount += amount;
        self.refreshRender();
        return;
      }
    }
    self.items.push({id:id,amount:amount});
    self.refreshRender();
    }

    //remove item from inventory 
    self.removeItem = function(id,amount){
    for(var i = 0 ; i < self.items.length; i++){
      if(self.items[i].id === id){
        self.items[i].amount -= amount;
        if(self.items[i].amount <= 0)
          self.items.splice(i,1);
        self.refreshRender();
        return;
      }
    }    
    }

    //see if item is already in inventory 
    self.hasItem = function(id,amount){
    for(var i = 0 ; i < self.items.length; i++){
      if(self.items[i].id === id){
        return self.items[i].amount >= amount;
      }
    }  
    return false;
    }

    //make buttons for items
  self.refreshRender = function(){
    var str = "";
    for(var i = 0 ; i < self.items.length; i++){
      let item = Item.List[self.items[i].id];
      let onclick = "Item.List['" + item.id + "'].event()";
      str += "<button onclick=\"" + onclick + "\">" + item.name + " x" + self.items[i].amount + "</button>";
    }

    document.getElementById("inventory").innerHTML = str;
  }


  return self;
}

//define inventory items and how they're used
Item = function(id,name,event){
  var self = {
    id:id,
    name:name,
    event:event,
  }
  Item.List[self.id] = self;
  return self;
}
Item.List = {};

//health pacs will increase health and be removed upon use 
Item("medpac","MedPac",function(){
  this.health += 10;
  console.log(this.health);
  playerInventory.removeItem("medpac",1);
});

//right now coins will be dropped if clicked on 
Item("coin","Coin",function(){
  playerInventory.removeItem("coin",1);
  dropx = gameEngine.camera.scenes.cowboy.x;
  dropy = gameEngine.camera.scenes.cowboy.y;
  gameEngine.addEntity(new Coin(gameEngine, dropx + 50, dropy + 50));
});
