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
    this.animations.push(new Animator(this.spritesheet, 253, 564, 345 - 253, 613 - 564, 1, 0.1, 0, false, true));
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
    this.cooldown = 0;
    this.talking = false;
    //this.user = 0;
    //this.playerInventory = Inventory();

  }
    update() {
    if(this.stun == 0)
    {
      if(this.talking && this.cooldown <= 0)
      {
        if(this.game.response1)
        {
          console.log("hi1");
          var btn = document.getElementById("response1").click();
          this.cooldown = 60;
        }
        else if(this.game.response2)
        {
          console.log("hi1");
          var btn = document.getElementById("response2").click();
          this.cooldown = 60;
        }
      }
      if (this.game.right)
      {
        this.velocity.x = this.stats.speed ;
        this.velocity.y = 0;
      }
      else if (this.game.left)
      {
        this.velocity.x = -this.stats.speed ;
        this.velocity.y = 0;
      }
      else if (this.game.up)
      {
        this.velocity.y = -this.stats.speed ;
        this.velocity.x = 0;
      }
      else if (this.game.down )
      {
        this.velocity.y = this.stats.speed ;
        this.velocity.x = 0;
      }
      else {
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
      if(this.cooldown <= 0)
      {
        if(this.game.One)
        {
          playerInventory.use("coin");
          this.cooldown = 60;
        }
        if(this.game.Two)
        {
          playerInventory.use("medpac");
          this.cooldown = 60;
        }
      }
      else
      {
        this.cooldown--;
      }
    }
    else
    {
      this.stun--;
    }

    //collision
    // this.userCount = 0;
    this.talking = false;
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
        //saloon NPC
        if (entity instanceof npc && entity.saloon) 
        {
          that.talking = true;
          var stateResponse = 0;
          var str = "";
          str += "Howdy Partner!";
          //npc line
          document.getElementById("chat").innerHTML = str;
          var response1 = "Q) What is this place?";
          var response2 = "E) Have you seen my hat?";
          //the 2 button responses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;

          if (userresponded) {
             var user = response;
             if (user == 1 && userCount == 1){
                stateResponse = 1;
                //console.log(user);
                //console.log(userCount);
                //console.log("Sr" + stateResponse);
             }
              else if (user == 2 && userCount == 1){
                stateResponse = 2;
                //console.log(user);
                //console.log(userCount);
                //console.log("Sr" + stateResponse);
             }
              else if (user == 1 && userCount == 2){
                stateResponse = 3;
                //console.log(user);
                //console.log(userCount);
                //console.log("Sr" + stateResponse);
             }
             else  if (user == 2 && userCount == 2){
                stateResponse = 4;
                //console.log(user);
                //console.log(userCount);
                //console.log("Sr" + stateResponse);
             }
          }
                  switch (stateResponse) {
                  	//if user selected option 1 ("what is this place?")
                      case 1:
                      document.getElementById("chat").innerHTML = "The saloon!";
                      //additional responses from user
                      var response1 = "Q) Can I buy a drink?";
                      document.getElementById("response1").innerHTML = response1;
                      var response2 = "E) Big nice";
                      document.getElementById("response2").innerHTML = response2;
                      break;
                      case 2: 
                        document.getElementById("chat").innerHTML = "Nope";
                        document.getElementById("response1").innerHTML = "";
                        document.getElementById("response2").innerHTML = "";
                        break;
                      case 3: 
                        document.getElementById("chat").innerHTML = "You have to go to the bartender for that";
                        document.getElementById("response1").innerHTML = "";
                        document.getElementById("response2").innerHTML = "";
                        if(that.game.camera.missions.missions["Bank"].state == 0)
                        {
                          that.game.camera.missions.missions["Bank"].state = 1;
                        }
                        break;
                      case 4:
                        document.getElementById("chat").innerHTML = "Okay bye!";
                        document.getElementById("response1").innerHTML = "";
                        document.getElementById("response2").innerHTML = "";
                        break;
                 }
        }

        //saloon bartender 
        if (entity instanceof npc && entity.bartender) 
        {
          that.talking = true;
          var stateResponse = 0;
          var str = "";
          str += "Buy a drink for 2 coins?";
          //npc line
          document.getElementById("chat").innerHTML = str;
          var response1 = "Q) Yes";
          var response2 = "E) No";
          //the 2 button respnses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;

          

          if (userresponded) {
             var user = response;
             //var convo = 1;
              if (user == 1 && userCount == 1 && (playerInventory.check("coin", 2))){
                flag = true;
                console.log(flag);
                stateResponse = 1;
                console.log(user);
                console.log(userCount);
                console.log("Sr" + stateResponse);
             }
             else if (user == 1 && userCount == 1 && !(playerInventory.check("coin", 2)) && !(flag)){
                stateResponse = 2;
                console.log(user);
                console.log(userCount);
                console.log("Sr" + stateResponse);
             }
              else if (user == 2 && userCount == 1){
                stateResponse = 3;
                console.log(user);
                console.log(userCount);
                console.log("Sr" + stateResponse);
             }
          }
                  switch (stateResponse) {
                  	//user selected first button which is ("yes")
                    case 1:
                            document.getElementById("chat").innerHTML = "Drink up! No refunds";
                            document.getElementById("response1").innerHTML = "";
                            document.getElementById("response2").innerHTML = "";
                            // playerInventory.addItem("beer", 1);
                            // playerInventory.removeItem("coin", 2);
                           break;
                    case 2:
                             //if user does not have 2 coins have this response instead
                        	document.getElementById("chat").innerHTML = "Nice try, come back when you have some coin";
                       		document.getElementById("response1").innerHTML = "";
                        	document.getElementById("response2").innerHTML = "";
                       break;
                       //user selected first button which is ("no")
                    case 3:
                        document.getElementById("chat").innerHTML = "Then stop loitering";
                        document.getElementById("response1").innerHTML = "";
                        document.getElementById("response2").innerHTML = "";
                      break;
                 }
        }
        
      }
    });
 

    this.lastX = this.x;
    this.lastY = this.y;
    if(this.stats.drunk > 0)
    {
      this.stats.drunk--;
      this.velocity.x = -this.velocity.x;
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if(this.velocity.x > 0)
    {
      this.facingState = 0;
    }
    if(this.velocity.x < 0)
    {
      this.facingState = 1;
    }
    if(this.velocity.y < 0)
    {
      this.facingState = 2;
    }
    if(this.velocity.y > 0)
    {
      this.facingState = 3;
    }
    that.updateBB();
    this.stats.setX(this.x);
    this.stats.setY(this.y);
    this.stats.setFacing(this.facingState);

    //to clear buttons/npc chat
    if (!this.talking) {
        response = 0;
        document.getElementById("chat").innerHTML = "";
        document.getElementById("response1").innerHTML = "";
        document.getElementById("response2").innerHTML = "";
        userCount = 0;
          if (flag) {
        playerInventory.addItem("beer", 1);
        playerInventory.removeItem("coin", 2);
        flag = false;
    }

    }
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
   // console.log(PARAMS.DEBUG)
    if (PARAMS.DEBUG) 
    {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
  }
  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x + 5, this.y + 20, 30, 35);

  }
  push()
  {
    if(this.stun == 0)
    {
      //this.y = this.lastY;
      //this.x = this.lastX;
      //console.log(this.velocity.y);
      this.velocity.x = -(this.velocity.x);
      this.velocity.y = -(this.velocity.y);
     //console.log(this.velocity.y);
     this.stun = 1;
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
    this.baseDamage = 5;
    this.damage;
    this.armor = 5;
    this.maxHealth = 100;
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.facing;
    this.drunk = 0;
    this.lvl = 1;
    this.exp = 0;
    this.nextLvl = 100;
    console.log(this.health);
    playerInventory.addItem("coin",0);
    playerInventory.addItem("medpac",0);
    this.setDamage(this.baseDamage);
  } 
  takeDamage(amt)
  {
    this.health -= amt;
    this.health =  Math.ceil(this.health);
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
    this.damage = Math.ceil(amt);
  }
  setX(x)
  {
    this.x = x;
  }
  setY(y)
  {
    this.y = y;
  }
  setFacing(face)
  {
    this.faceing = face;
  }
  update()
  {
    if(this.exp >= this.nextLvl)
    {
      this.lvl++;
      this.exp -= this.nextLvl;
      this.nextLvl = (1.25 * this.nextLvl)
      this.setDamage(this.baseDamage * (1 + (this.lvl * .25)));
    }
  }
  draw(ctx)
  {
    ctx.font = "15px Papyrus";
    ctx.fillStyle = "Red";
    ctx.fillText("Level: " + this.lvl, 5, 725);
    ctx.fillText("Exp to next lvl: " + (this.nextLvl - this.exp), 5, 740);
  }
  giveXP(exp)
  {
      this.exp += exp;
  }
}

//INVENTORY

Inventory = function(){
    var self = {
        items:[], //{id:"itemId",amount:1}
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
          self.items[i].amount = 0;
        self.refreshRender();
        return;
      }
    }    
    }

    self.check = function(id, amount) {
      for(var i = 0 ; i < self.items.length; i++){
      if(self.items[i].id === id){
        return self.items[i].amount >= amount;
      }
    }  
    return true;
    }

    //see if item is already in inventory 
    self.hasItem = function(id,amount){
    for(var i = 0 ; i < self.items.length; i++){
      if(self.items[i].id === id){
        return self.items[i].amount > amount;
      }
    }  
    return false;
    }

    //make buttons for items
  self.refreshRender = function(){
    var str = "";
    for(var i = 0 ; i < self.items.length; i++){
      var but = i + 1;
      let item = Item.List[self.items[i].id];
      let onclick = "Item.List['" + item.id + "'].event()";
      str += "<button onclick=\"" + onclick + "\" >" + but + ") " + item.name + " x" + self.items[i].amount + "</button>";
    }

    document.getElementById("inventory").innerHTML = str;
  }
  self.use = function(id)
  {
    Item.List[id].event();  
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
  if(playerInventory.hasItem("medpac",0))
  {
    gameEngine.camera.cowboy.health += 10;
    console.log(this.health);
    playerInventory.removeItem("medpac",1);
  }
});

//beer
Item("beer","Beer",function(){
  if(playerInventory.hasItem("beer",0))
  {
    playerInventory.removeItem("beer",1);
    gameEngine.camera.cowboy.drunk = 600;
  }
});

//right now coins will be dropped if clicked on 
Item("coin","Coin",function(){
  if(playerInventory.hasItem("coin",0))
  {
    playerInventory.removeItem("coin",1);
    dropx = gameEngine.camera.cowboy.x;
    dropy = gameEngine.camera.cowboy.y;
    facing = gameEngine.camera.cowboy.faceing;
    if(facing == 0)
    {
      gameEngine.addEntity(new Coin(gameEngine, dropx + 50, dropy));
    }
    else if(facing == 1)
    {
      gameEngine.addEntity(new Coin(gameEngine, dropx - 30, dropy));
    }
    else if(facing == 2)
    {
      gameEngine.addEntity(new Coin(gameEngine, dropx, dropy -25));
    }
    else if(facing == 3)
    {
      gameEngine.addEntity(new Coin(gameEngine, dropx, dropy + 60));
    }
  }
});
