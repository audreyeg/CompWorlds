class CowBoy {
  constructor(game, x, y, stats) {
    Object.assign(this, { game, x, y, stats });

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
    this.dead = false;
    this.gravity = 9.8 / 60;
    this.velocity = { x: 0, y: 0 };
    this.onGround = false;
    this.attacking = false;
    this.turn;
    this.defending = false;

    this.updateBB();

    //cowboy's animations
    this.animations = [];

    //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop

    //idle + facing right
    this.animations.push(new Animator(this.spritesheet, 9, 9, 62, 90, 2, .5, 2, false, true));
    //move right + facing right
    this.animations.push(new Animator(this.spritesheet, 94, 2, 44, 66, 7, 0.15, 2.5, false, true));
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
      this.animations[2].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    }
    //dead 
    else if (this.state == 2) {
      this.animations[3].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
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
  heal() {
    if (playerInventory.hasItem("medpac", 0)) {
      playerInventory.use("medpac");
      if (this.health > 50) {
        this.health = 50;
      }
    }
  }
  killed() {
    this.state = 2;
    this.BB = new BoundingBox(this.x, this.y, 62 * 2, 90);
    this.y += 90;
  }
}


class OverWorldPlayer {
  constructor(game, x, y, stats, camera = null) {
    Object.assign(this, { game, x, y, stats, camera });
    this.stats = stats;
    this.x = x;
    this.y = y;
    this.game = game;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Player.png");
    this.horizontalWalking = new Animator(this.spritesheet, 5, 88, 18, 25, 3, .33, 3, false, true, camera);
    this.horizontalWalkingLeft = new Animator(this.spritesheet, 5, 31, 18, 25, 3, .33, 3, true, true, camera);
    this.upWalking = new Animator(this.spritesheet, 5, 59, 18, 27, 3, .33, 4, false, true, camera);
    this.downWalking = new Animator(this.spritesheet, 6, 3, 18, 27, 3, .33, 1, false, true, camera);
    this.updateBB();
    this.facingState = 0; //0 = right, 1 = left 2 = up 3 = down
    this.velocity = { x: 0, y: 0 };
    this.SCALE = 2;
    this.lastX;
    this.lastY;
    this.stun = 0;
    this.cooldown = 0;
    this.dismount = 0;
    this.talking = false;
    this.active = true;
    this.curIn;
    this.lastIn;

  }
  update() {
    if (this.stun == 0) {
      if (this.talking && this.cooldown <= 0) {
        if (this.game.response1) {
          var btn = document.getElementById("response1").click();
          this.cooldown = 60;
        }
        else if (this.game.response2) {
          var btn = document.getElementById("response2").click();
          this.cooldown = 60;
        }
      }
      if (this.game.right) {
        this.velocity.x = this.stats.speed;
        this.velocity.y = 0;
        this.curIn = "right";
      }
      else if (this.game.left) {
        this.velocity.x = -this.stats.speed;
        this.velocity.y = 0;
        this.curIn = "left";
      }
      else if (this.game.up) {
        this.velocity.y = -this.stats.speed;
        this.velocity.x = 0;
        this.curIn = "up";
      }
      else if (this.game.down) {
        this.velocity.y = this.stats.speed;
        this.velocity.x = 0;
        this.curIn = "down";
      }
      else {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.curIn = "";
      }
      if (this.cooldown <= 0) {
        if (this.game.One) {
          playerInventory.use("coin");
          this.cooldown = 60;
        }
        if (this.game.Two) {
          playerInventory.use("medpac");
          this.cooldown = 60;
        }
        if (this.game.Three) {
          playerInventory.use("beer");
          this.cooldown = 60;
        }
      }
      else {
        this.cooldown--;
      }
      if (this.velocity.x > 0) {
        this.facingState = 0;
      }
      if (this.velocity.x < 0) {
        this.facingState = 1;
      }
      if (this.velocity.y < 0) {
        this.facingState = 2;
      }
      if (this.velocity.y > 0) {
        this.facingState = 3;
      }
    }
    else {
      this.stun--;
    }

    //COLLISIONS 
    //variable that determines when user is talking to npcs or not 
    this.talking = false;
    var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        if(entity instanceof Boundry ||entity instanceof  DrawBoundry)
        {
          if((gameEngine.left || gameEngine.right || gameEngine.up || gameEngine.down) && that.curIn == that.lastIn)
          {
            that.velocity.x = 0;
            that.velocity.y = 0;
          }
          else
          {
            that.x = that.lastX;
            that.y = that.lastY;
          }
        }
        if(entity instanceof Explodable && entity.interactable && playerInventory.hasItem("dynamite", 0))
        {
          that.talking = true;
          changeChat("Press Space To Place Dynamite!");
          if(that.game.interact) 
          {
            playerInventory.removeItem("dynamite", 1)
            that.game.entities.push(new Dynamite(gameEngine, that.x,that.y - 10, that.camera));
            entity.timer = 300;
            entity.interactable = false;
          }
        }
        if(entity instanceof Horse)
        {
          that.talking = true;
          if(that.active)
          {
            changeChat("Press Space To Mount Horse!");
          }
          if(that.game.interact && that.dismount == 0)
          {
            that.camera.setEntityToFollow(entity, 700, 384);
            entity.active = true;
            entity.mounting = 20;
            that.active = false;
          }
        }
        if(entity instanceof overWorldCoyote)
        {
          that.game.camera.createFightSceneWithEnemy(new coyote(gameEngine,486,450,entity,entity.lvl));
          document.getElementById("townAudio").pause();
          document.getElementById("fightAudio").play();
          entity.spawner.currentEnemies--;
          entity.removeFromWorld = true;
          entity.BB = null;
        }
        if(entity instanceof overWorldBandit)
        {
          gameEngine.camera.createFightSceneWithEnemy(new Bandit(gameEngine,600,450,entity,entity.lvl));
          document.getElementById("townAudio").pause();
          document.getElementById("fightAudio").play();
          entity.spawner.currentEnemies--;
          entity.removeFromWorld = true;
          entity.BB = null;
        }
        if(entity instanceof overWorldBoss)
        {
          gameEngine.camera.createFightSceneWithEnemy(new Boss(gameEngine,600,450,entity,entity.lvl));
          document.getElementById("townAudio").pause();
          document.getElementById("fightAudio").play();
          entity.removeFromWorld = true;
          entity.BB = null;
        }
        if (entity instanceof Heal) {
          playerInventory.addItem("medpac", 1);
          entity.removeFromWorld = true;
        }
        if (entity instanceof Coin) {
          playerInventory.addItem("coin", 1);
          entity.removeFromWorld = true;
        }
        if (entity instanceof Ring) {
          if (that.game.camera.missions.missions["FindRing"].state == 1) {
            playerInventory.addItem("ring", 1);
            entity.removeFromWorld = true;
            ringFound = true;
          }
        }
         if (entity instanceof MoneyCave) {
          if (that.game.camera.missions.missions["FindMoney"].state == 1) {
            playerInventory.addItem("moneybag", 1);
            entity.removeFromWorld = true;
            moneyFound = true;
          }
        }

        if (entity instanceof npc && entity.rake) {
          that.talking = true;
          changeChat("Bandits everywhere... Coyotes everywhere... Yet happiness nowhere to be found.")
        }
         if (entity instanceof npc && entity.shovel) {
          that.talking = true;
          changeChat("What the hell are you looking at?")
        }
         if (entity instanceof npc && entity.girl) {
          that.talking = true;
          changeChat("It's a big world out there. I've only ever seen a small part of it.")
        }

        //saloon NPC
        if (entity instanceof npc && entity.saloon) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          changeChat("Howdy Partner!");
          if (that.game.camera.missions.missions["FindRing"].state == 1) {
          	changeChat("Look around town for my ring!")
          	changeChat1("");
          	changeChat2("");
          }
          else if (that.game.camera.missions.missions["FindRing"].state == 2) {
            changeChat1("I found your ring!");
            changeChat2("");

          }
          else if (that.game.camera.missions.missions["FindRing"].state == 3) {
          	changeChat1("Can I buy a medpac?");
          	changeChat2("Just stopping by");
          }
          else {
            changeChat1("I heard bandits were terrozing the town.");
            changeChat2("");
          }

          //gets from index file the response (1 or 2) that user selected based on which button was pushed
          var user = response;
          //set the state to determine dialogue options
          //LEVEL 1 of conversation
          if (user == 1 && userCount == 1 && (that.game.camera.missions.missions["FindRing"].state == 2)) {
            stateResponse = 5;
          }
          else if (user == 1 && userCount == 1 && (that.game.camera.missions.missions["FindRing"].state == 3) && (playerInventory.check("coin", 10))) {
          	buyMedpac = true;
          	stateResponse = 6;
          }
	  else if (user == 1 && userCount == 1 && (that.game.camera.missions.missions["FindRing"].state == 3) && !(playerInventory.check("coin", 10))) {
            stateResponse = 7;
          }
          else if (user == 2 && userCount == 1 && (that.game.camera.missions.missions["FindRing"].state == 3)) {
          	stateResponse = 4;
          }
          else if (user == 1 && userCount == 1) {
            stateResponse = 1;
          }
          else if (user == 1 && userCount == 2) {
            stateResponse = 3;
          }
          else if (user == 2 && userCount == 2) {
            stateResponse = 2;
          }
          else if (user == 2 && userCount == 1) {
            stateResponse = 4;
          }
          switch (stateResponse) {
            case 1:
              changeChat("Yes! In fact, they stole my very precious ring! Are you interested in getting it back for me?");
              changeChat1("No");
              changeChat2("How can I help?");
              break;
            //if user selected option 2 ("Have you seen my hat?")
            case 2:
              changeChat("My ring is somewhere in town. The sherrif chased them of and they dropped it nearby. I just can't seem to find it. If you see it, bring it to me.");
              changeChat1("");
              changeChat2("");
              if (that.game.camera.missions.missions["FindRing"].state == 0) {
                that.game.camera.missions.missions["FindRing"].state = 1;
              }
              break;
            case 3:
              changeChat("*sobbing*");
              changeChat1("");
              changeChat2("");
              break;
            case 4:
              changeChat("Okay bye!");
              changeChat1("");
              changeChat2("");
              break;
            //user has found ring 
            case 5:
              changeChat("Thank you for finding my ring! Here's 50 coins as a reward. Come back anytime if you want to buy medpacs, 1 for 10 coins.");
              changeChat1("");
              changeChat2("");
              playerInventory.removeItem("ring", 1);
              giveCoin = true;
              endMission = true;
              break;
             case 6:
             	changeChat("1 medpac for 10 coins coming up!");
             	changeChat1("");
             	changeChat2("");
             break;
	     case 7:
              changeChat("What part of 10 coins do you not understand?");
              changeChat1("");
              changeChat2("");
	      break;
          }
        }

        //saloon bartender 
        if (entity instanceof npc && entity.bartender) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          changeChat("Buy a drink for 2 coins?");
          changeChat1("Yes");
          changeChat2("No");
          //gets from index file the response (1 or 2) that user selected based on which button was pushed
          var user = response;
          //set the state to determine dialogue options
          //LEVEL 1 of conversation
          //additional check to make sure user can afford beer
          if (user == 1 && userCount == 1 && (playerInventory.check("coin", 2))) {
            //meaning user has purchased a beer 
            flag = true;
            stateResponse = 1;
          }
          //if user tries to buy beer but doesn't have enough money
          else if (user == 1 && userCount == 1 && !(playerInventory.check("coin", 2)) && !(flag)) {
            stateResponse = 2;
          }
          else if (user == 2 && userCount == 1) {
            stateResponse = 3;
          }
          switch (stateResponse) {
            //LEVEL 1 of conversation
            //if user selected option 1 ("Yes") and can afford beer 
            case 1:
              changeChat("Drink up! No refunds.");
              changeChat1("");
              changeChat2("");
              break;
            case 2:
              //if user does not have 2 coins have this response instead
              changeChat("Nice try, come back when you have some coin");
              changeChat1("");
              changeChat2("");
              break;
            //user selected second button which is ("no")
            case 3:
              changeChat("Then stop loitering");
              changeChat1("");
              changeChat2("");
              break;
          }
        }
        //sherrif npc
        if (entity instanceof npc && entity.cop) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          if (that.game.camera.missions.missions["KillCoyote"].state == 3) {
          	changeChat("Still so many coyotes out there...");
          	changeChat1("");
          	changeChat2("");
          }
          else {
          changeChat("Need something?");
          //checks to see state of mission (2 means it has been completed)
          if (that.game.camera.missions.missions["KillCoyote"].state == 2) {
            changeChat1("I killed that coyote for you");
            changeChat2("");
          }
          //if user hasn't completed mission yet (state 0 or 1)
          else {
            changeChat1("Yes");
            changeChat2("No");
          }
      }
          //gets from index file the response (1 or 2) that user selected based on which button was pushed
          var user = response;
          //set the state to determine dialogue options
          //LEVEL 1 of conversation
          //additional check to see check on state of mission that sheriff npc gives
          //state 1 means the mission is currently active
          if (user == 1 && userCount == 1 && that.game.camera.missions.missions["KillCoyote"].state == 1) {
            stateResponse = 5;
          }
          //state 2 means the mission has been completed
          else if (user == 1 && userCount == 1 && that.game.camera.missions.missions["KillCoyote"].state == 2) {
            stateResponse = 4;
          }
          else if (user == 1 && userCount == 1 && that.game.camera.missions.missions["KillCoyote"].state == 3) {
            stateResponse = 4;
          }
          else if (user == 1 && userCount == 1) {
            stateResponse = 1;
          }
          //LEVEL 2 of conversation
          else if (user == 1 && userCount == 2) {
            stateResponse = 2;
          }
          else if ((user == 2 && userCount == 1) || (user == 2 && userCount == 2)) {
            stateResponse = 3;
          }
          switch (stateResponse) {
            //user selected first button which is ("Yes")
            case 1:
              changeChat("Well... If you'd like a mission I have one for you.");
              changeChat1("Yes, that's why I'm here.");
              changeChat2("No, I don't feel like it.");
              break;
            //user selected first buttion which is ("Yes, that's why I'm here.")
            case 2:
              changeChat("Go kill one of those coyotes for me then come back here when you've done it.");
              changeChat1("");
              changeChat2("");
              //user has been given mission so it goes from state 0 (pre-mission) to state 1 (mission active)

              if (that.game.camera.missions.missions["KillCoyote"].state == 0) {
                that.game.camera.missions.missions["KillCoyote"].state = 1;
              }

              break;
            //user selected second option which is ("No") in level 1 or ("No, I don't feel like it.") in level 2
            case 3:
              changeChat("I ought to lock you up.");
              changeChat1("");
              changeChat2("");
              break;
            //user has completed the mission (state 2)
            case 4:
              changeChat("Thanks, now I get the day off... By the way, I found these armor plates, you can have them.");
              changeChat1("");
              changeChat2("");
              giveArmor = true;
              that.game.camera.missions.missions["KillCoyote"].state = 3;
              break;
            //user is in state 1 (mission has been given but has not been completed)
            case 5:
              changeChat("Aren't you supposed to be killing a coyote for me.");
              changeChat1("");
              changeChat2("");
              break;
          }
        }
        //guide npc
        if (entity instanceof npc && entity.guide) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          changeChat("Welcome newcomer! The Wild West can be a daunting place, come to me if you need guidance.");
          //user response options
          changeChat1("I'm okay for now");
          changeChat2("What should I do?");
          //gets from index file the response (1 or 2) that user selected based on which button was pushed
          var user = response;
          //set the state to determine dialogue options
          //LEVEL 1 of conversation
          if (user == 1) {
            stateResponse = 1;
          }
          else if (user == 2 && userCount == 1) {
            stateResponse = 2;
          }
          else if (user == 2 && userCount == 2) {
            stateResponse = 3;
          }
          switch (stateResponse) {
            //LEVEL 1 of conversation
            //if user selected option 1 ("I'm okay for now.")
            case 1:
              changeChat("Run along then cowboy!");
              changeChat1("");
              changeChat2("");
              break;
            //if user selected option 1 ("What should I do?")
            case 2:
              changeChat("Bandits have been messing with all the town folk. If you ask around, I'm sure they would like your help.");
              changeChat1("Thanks!");
              changeChat2("Who should I ask?");

              break;
            //LEVEL 2 of conversation
            //if user selected option 2 ("Who should I ask?")
            case 3:
              changeChat("There's the bartender and the girl in the saloon, the sheriff in the jail and the banker in the bank!");
              changeChat1("");
              changeChat2("");
              break;
          }
        }

        //banker npc
        if (entity instanceof npc && entity.banker) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          changeChat("1..2...3... AH! When did you get here?");

           if (that.game.camera.missions.missions["FindMoney"].state == 1) {
          	changeChat("Well! Aren't you going to go find my money?!?!")
          	changeChat1("");
          	changeChat2("");
          }
          else if (that.game.camera.missions.missions["FindMoney"].state == 2) {
            changeChat1("I found your money bag in the cave.");
            changeChat2("");
          }
          else if (that.game.camera.missions.missions["FindMoney"].state == 3) {
          	changeChat("I don't care what the bandits take, as long as it's not stolen from me.");
          	changeChat1("");
          	changeChat2("");
          }
          else {
          	changeChat1("Literally just now. ");
          	changeChat2("You seem jumpy.");
     	 }	
          //gets from index file the response (1 or 2) that user selected based on which button was pushed
          var user = response;
          //set the state to determine dialogue options
          //LEVEL 1 of conversation

          if (user == 1 && userCount == 1 && (that.game.camera.missions.missions["FindMoney"].state == 2)) {
            stateResponse = 5;
          }
          else if (user == 1 && userCount == 1) {
            stateResponse = 1;
          }
          else if (user == 2 && userCount == 1) {
            stateResponse = 2;
          }
          else if (user == 1 && userCount == 2) {
          	stateResponse = 3;
          }
          else if (user == 2 && userCount == 2) {
          	stateResponse = 4;
          }
          switch (stateResponse) {
            //LEVEL 1 of conversation
            //if user selected option 1 ("Literally just now.")
            case 1:
              changeChat("You should really announce yourself, instead of speaking up.");
              changeChat1("");
              changeChat2("");
              break;
            //if user selected option 1 ("What are you doing?")
            case 2:
              changeChat("Well of course I'm jumpy! There are bandits amuck, and I'm missing a money bag!");
              changeChat1("Do you think a bandit stole it?");
              changeChat2("Welp, sounds like a personal problem.");
              break;
            case 3:
              changeChat("Of course a bandit stole it! I'll bet it's sitting in that cave right now...");
              changeChat1("");
              changeChat2("");
              if (that.game.camera.missions.missions["FindMoney"].state == 0) {
                that.game.camera.missions.missions["FindMoney"].state = 1;
              }
              break;
            case 4:
              changeChat("Sad but true.");
              changeChat1("");
              changeChat2("");
              break;
        	case 5:
              changeChat("So nice to see my money safe and sound... and you too, I guess. Here is 10 coins, generous I know.");
              changeChat1("");
              changeChat2("");
              playerInventory.removeItem("moneybag", 1);
              giveCoin = true;
              endMission = true;
              break;
          }
        }

      }
    });

    if(this.velocity.x != 0 || this.velocity.y != 0)
    {
      this.lastX = this.x;
      this.lastY = this.y;
      if(this.game.right)
      {
        this.lastIn = "right";
      }
      else if(this.game.left)
      {
        this.lastIn = "left";
      }
      else if(this.game.up)
      {
        this.lastIn = "up";
      }
      if(this.game.down)
      {
        this.lastIn = "down";
      }
    }
    if (this.stats.drunk > 0) {
      this.stats.drunk--;
      this.velocity.x = -this.velocity.x;
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x > this.game.camera.scenes[this.game.camera.currentScene].xMax) {
      this.x = this.game.camera.scenes[this.game.camera.currentScene].xMax;
    }
    if (this.x < this.game.camera.scenes[this.game.camera.currentScene].xMin) {
      this.x = this.game.camera.scenes[this.game.camera.currentScene].xMin;
    }
    if (this.y > this.game.camera.scenes[this.game.camera.currentScene].yMax) {
      this.y = this.game.camera.scenes[this.game.camera.currentScene].yMax;
    }
    if (this.y < this.game.camera.scenes[this.game.camera.currentScene].yMin) {
      this.y = this.game.camera.scenes[this.game.camera.currentScene].yMin;
    }
    that.updateBB();
    this.stats.setX(this.x);
    this.stats.setY(this.y);
    this.stats.setFacing(this.facingState);

    //to clear buttons/npc chat once user has moved away from npc 
    if (!this.talking) {
      //reset response to 0
      response = 0;
      //empty dialogue/responses 
      changeChat("");
      changeChat1("");
      changeChat2("");
      //reset user count to 0 (to start conversations over)
      userCount = 0;
      //flag is currently only being used for beer purchase
      if (flag) {
        playerInventory.addItem("beer", 1);
        playerInventory.removeItem("coin", 2);
        flag = false;
      }
     if (buyMedpac) {
        playerInventory.addItem("medpac", 1);
        playerInventory.removeItem("coin", 10);
        buyMedpac = false;
      }
	  if (that.game.camera.missions.missions["FindRing"].state == 2 && (endMission)) {
                that.game.camera.missions.missions["FindRing"].state = 3;
                endMission = false;
        }
      if (that.game.camera.missions.missions["FindMoney"].state == 2 && (endMission)) {
                that.game.camera.missions.missions["FindMoney"].state = 3;
                endMission = false;
        }
      if (that.game.camera.missions.missions["FindRing"].state == 3 && (giveCoin)) {
      	  	playerInventory.addItem("coin", 50);
      	  	giveCoin = false;
      }
      if (that.game.camera.missions.missions["FindMoney"].state == 3 && (giveCoin)) {
      	  	playerInventory.addItem("coin", 10);
      	  	giveCoin = false;
      }
      if (that.game.camera.missions.missions["KillCoyote"].state == 3 && (giveArmor)) {
            playerInventory.addItem("armor", 2);
            giveArmor = false;
      }
    }
    if(this.dismount > 0)
    {
      this.dismount--;
    }

  }


  draw(ctx) {
    if(this.active)
    {
      var xPos = this.x;
      var yPos = this.y;
      if(this.camera != null)
      {      
        var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
        var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
        xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
        yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
      }
      if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 0) {
        ctx.drawImage(this.spritesheet, 26, 88, 20, 28, xPos, yPos, 20 * this.SCALE, 28 * this.SCALE);
      }
      else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 1) {
        ctx.drawImage(this.spritesheet, 26, 31, 20, 28, xPos, yPos, 20 * this.SCALE, 28 * this.SCALE);
      }
      else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 2) {
        ctx.drawImage(this.spritesheet, 25, 60, 20, 28,  xPos, yPos, 20 * this.SCALE, 28 * this.SCALE);
      }
      else if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 3) {
        ctx.drawImage(this.spritesheet, 24, 5, 20, 26,  xPos, yPos, 20 * this.SCALE, 26 * this.SCALE);
      }

      else if (this.facingState == 0) {
        this.horizontalWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
      }
      else if (this.facingState == 1) {
          this.horizontalWalkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
        }
      else if (this.facingState == 2) {
        this.upWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
      }
      else if (this.facingState == 3) {
        this.downWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
      }
      // console.log(PARAMS.DEBUG)
      if (PARAMS.DEBUG) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
    }
  }
  updateBB() {
    if (this.camera == null) {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(this.x + 5, this.y + 20, 30, 35);
    } else {
      var tileWidth = this.camera.pixelScale * this.camera.linearScale[0];
      var tileHeight = this.camera.pixelScale * this.camera.linearScale[1];
      var xPos = (this.x - this.camera.x) * tileWidth * Math.cos(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.sin(this.camera.angle);
      var yPos = (this.x - this.camera.x) * tileWidth * Math.sin(this.camera.angle) - (this.camera.y - this.y) * tileHeight * Math.cos(this.camera.angle);
      this.BB = new BoundingBox(xPos + 5, yPos + 20, 30, 35);
    }

  }
  push(amt) {
    this.x -= (this.velocity.x * amt);
    this.y -= (this.velocity.y * amt);
  }
}
class Character {
  constructor(game) {
    Object.assign(this, { game });
    this.game = game;
    this.baseDamage = 5;
    this.damage;
    this.armor = 5;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.x = 0;
    this.y = 0;
    this.speed = 3 * 5;
    this.facing;
    this.drunk = 0;
    this.lvl = 0;
    this.exp = 0;
    this.nextLvl = 50;
    this.specialMeter = 0;
    playerInventory.addItem("coin", 0);
    playerInventory.addItem("medpac", 0);
    playerInventory.addItem("beer", 0);
    playerInventory.addItem("armor", 1);
    playerInventory.addItem("dynamite", 1);
    this.setDamage(this.baseDamage);
  }
  takeDamage(amt) {
    this.health -= amt;
    this.health = Math.ceil(this.health);
    if (this.health <= 0) {
      this.health = 0;
    }
  }
  heal() {
    if (playerInventory.hasItem("medpac")) {
      playerInventory.use("medpac");
      if (this.health >= this.maxHealth) {
        this.health = this.maxHealth; ''
      }
    }
  }
  increaseMaxHP(amt) {
    this.maxHealth += amt;
  }
  setArmor(amt) {
    this.armor = amt;
  }
  setDamage(amt) {
    this.damage = Math.ceil(amt);
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  setFacing(face) {
    this.faceing = face;
  }
  update() {
    if (this.exp >= this.nextLvl) {
      this.lvl++;
      this.exp -= this.nextLvl;
      this.nextLvl = Math.floor(1.25 * this.nextLvl);
      this.setDamage(this.baseDamage * (1 + (this.lvl * .25)));
      this.health = this.maxHealth;
    }
    if(this.health > this.maxHealth)
    {
      this.health = this.maxHealth;
    }
  }
  draw(ctx) {
    ctx.fillStyle = "Red";
    ctx.font = "15px Papyrus";
    ctx.fillText("Level: " + this.lvl, 5, 725);
    ctx.fillText("Exp to next lvl: " + (this.nextLvl - this.exp), 5, 740);
    ctx.fillText("Health: " + this.health, 5, 755);
    if (this.drunk != 0) {
      document.getElementById("chat").innerHTML = "Effects of beer will wear off in " + this.drunk;
    }
  }
  giveXP(exp) {
    this.exp += Math.ceil(exp);
  }
}

//INVENTORY

Inventory = function () {
  var self = {
    items: [], //{id:"itemId",amount:1}
  }

  //add item to inentory 
  self.addItem = function (id, amount) {
    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].id === id) {
        self.items[i].amount += amount;
        self.refreshRender();
        return;
      }
    }
    self.items.push({ id: id, amount: amount });
    self.refreshRender();
  }

  //remove item from inventory 
  self.removeItem = function (id, amount) {
    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].id === id) {
        self.items[i].amount -= amount;
        if (self.items[i].amount <= 0)
          self.items[i].amount = 0;
        self.refreshRender();
        return;
      }
    }
  }

  self.check = function (id, amount) {
    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].id === id) {
        return self.items[i].amount >= amount;
      }
    }
    return true;
  }

  //see if item is already in inventory 
  self.hasItem = function (id, amount) {
    for (var i = 0; i < self.items.length; i++) {
      if (self.items[i].id === id) {
        return self.items[i].amount > amount;
      }
    }
    return false;
  }

  //make buttons for items
  self.refreshRender = function () {
    var str = "";
    var count = 1;
    for (var i = 0; i < self.items.length; i++) {
      let item = Item.List[self.items[i].id];
      if(!item.key)
      {
        var but = count;
        count++
        let item = Item.List[self.items[i].id];
        let onclick = "Item.List['" + item.id + "'].event()";
        str += "<button onclick=\"" + onclick + "\" >" + but + ") " + item.name + " x" + self.items[i].amount + "</button>";
      }

	}

    document.getElementById("inventory").innerHTML = str;
  }
  self.use = function (id) {
    Item.List[id].event();
  }


  return self;
}

//define inventory items and how they're used
Item = function (id, name, event,key = false) {
  var self = {
    id: id,
    name: name,
    event: event,
    key: key,
  }
  Item.List[self.id] = self;
  return self;
}
Item.List = {};

//health pacs will increase health and be removed upon use 
Item("medpac", "MedPac", function () {
  if (playerInventory.hasItem("medpac", 0) && gameEngine.camera.cowboy.health < gameEngine.camera.cowboy.maxHealth) {
    gameEngine.camera.cowboy.health += 25;
    playerInventory.removeItem("medpac", 1);
  }
});

Item("ring", "Ring", function () {
  if (playerInventory.hasItem("ring", 0)) {
    playerInventory.removeItem("ring", 1);
  }
}, true);

Item("moneybag", "Money Bag", function () {
  if (playerInventory.hasItem("moneybag", 0)) {
    playerInventory.removeItem("moneybag", 1);
  }
}, true);
Item("dynamite", "Dynamite", function () {
  if (playerInventory.hasItem("dynamite", 0)) {
    playerInventory.removeItem("dynamite", 1);
  }
}, true);

//beer
Item("beer", "Beer", function () {
  if (playerInventory.hasItem("beer", 0)) {
    playerInventory.removeItem("beer", 1);
    gameEngine.camera.cowboy.drunk = 600;
  }
});

Item("armor", "Armor Plate", function () {
});

//right now coins will be dropped if clicked on 
Item("coin", "Coin", function () {
  if (playerInventory.hasItem("coin", 0) && gameEngine.camera.fight == false) {
    playerInventory.removeItem("coin", 1);
    dropx = gameEngine.camera.cowboy.x;
    dropy = gameEngine.camera.cowboy.y;
    facing = gameEngine.camera.cowboy.faceing;
    if (facing == 0) {
      gameEngine.addEntity(new Coin(gameEngine, dropx + 50, dropy));
    }
    else if (facing == 1) {
      gameEngine.addEntity(new Coin(gameEngine, dropx - 30, dropy));
    }
    else if (facing == 2) {
      gameEngine.addEntity(new Coin(gameEngine, dropx, dropy - 25));
    }
    else if (facing == 3) {
      gameEngine.addEntity(new Coin(gameEngine, dropx, dropy + 60));
    }
  }
});
