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
  constructor(game, x, y, stats, camera=null) {
    Object.assign(this, { game, x, y, stats, camera });
    this.stats = stats;
    this.x = x;
    this.y = y;
    this.game = game;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/npc.png");
    this.horizontalWalking = new Animator(this.spritesheet, 2, 88, 20, 31, 3, .33, 1, false, true, camera);
    this.horizontalWalkingLeft = new Animator(this.spritesheet, 2, 88, 20, 31, 3, .33, 1, false, true, camera);
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
    this.talking = false;

  }
  update() {
    if (this.stun == 0) {
      if (this.talking && this.cooldown <= 0) {
        if (this.game.response1) {
          console.log("hi1");
          var btn = document.getElementById("response1").click();
          this.cooldown = 60;
        }
        else if (this.game.response2) {
          console.log("hi1");
          var btn = document.getElementById("response2").click();
          this.cooldown = 60;
        }
      }
      if (this.game.right) {
        this.velocity.x = this.stats.speed;
        this.velocity.y = 0;
      }
      else if (this.game.left) {
        this.velocity.x = -this.stats.speed;
        this.velocity.y = 0;
      }
      else if (this.game.up) {
        this.velocity.y = -this.stats.speed;
        this.velocity.x = 0;
      }
      else if (this.game.down) {
        this.velocity.y = this.stats.speed;
        this.velocity.x = 0;
      }
      else {
        this.velocity.x = 0;
        this.velocity.y = 0;
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
        if (entity instanceof Heal) {
          playerInventory.addItem("medpac", 1);
          entity.removeFromWorld = true;
        }
        if (entity instanceof Coin) {
          playerInventory.addItem("coin", 1);
          entity.removeFromWorld = true;
        }

        //saloon NPC
        if (entity instanceof npc && entity.saloon) {
          //user is now in conversation
          that.talking = true;
          //this will determine which dialogue options to show in switch statement
          var stateResponse = 0;
          //npc line
          document.getElementById("chat").innerHTML = "Howdy Partner!";
          //user response options
          var response1 = "Q) What is this place?";
          var response2 = "E) Have you seen my hat?";
          //the 2 button responses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;

          //gets from index file the response (1 or 2) that user selected based on which button was pushed
            var user = response;
            //set the state to determine dialogue options
            //LEVEL 1 of conversation
            if (user == 1 && userCount == 1) {
              stateResponse = 1;
            }
            else if (user == 2 && userCount == 1) {
              stateResponse = 2;
            }
            //LEVEL 2 of conversation
            else if (user == 1 && userCount == 2) {
              stateResponse = 3;
            }
            else if (user == 2 && userCount == 2) {
              stateResponse = 4;
            }
          switch (stateResponse) {
            //LEVEL 1 of conversation
            //if user selected option 1 ("what is this place?")
            case 1:
              document.getElementById("chat").innerHTML = "The saloon!";
              //additional responses from user
              var response1 = "Q) Can I buy a drink?";
              var response2 = "E) Big nice";
              document.getElementById("response1").innerHTML = response1;
              document.getElementById("response2").innerHTML = response2;
              break;
              //if user selected option 2 ("Have you seen my hat?")
            case 2:
               //npc response
              document.getElementById("chat").innerHTML = "Nope";
              //no additional responses from user are given for this conversation line
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              break;
              //LEVEL 2 of conversation
                //if user selected option 1 ("Can I buy a drink?")
            case 3:
            //npc response
              document.getElementById("chat").innerHTML = "You have to go to the bartender for that";
                 //no additional responses from user are given for this conversation line
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              //mission started (IGNORE FOR CHAT)
              if (that.game.camera.missions.missions["Bank"].state == 0) {
                that.game.camera.missions.missions["Bank"].state = 1;
              }
              break;
              //if user selected option 2 ("Big nice.")
            case 4:
               //npc response
              document.getElementById("chat").innerHTML = "Okay bye!";
              document.getElementById("chat").innerHTML = "Nope";
              //no additional responses from user are given for this conversation line
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
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
          document.getElementById("chat").innerHTML = "Buy a drink for 2 coins?";
          //user response options
          var response1 = "Q) Yes";
          var response2 = "E) No";
          //the 2 button respnses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;

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
              document.getElementById("chat").innerHTML = "Drink up! No refunds";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              break;
            case 2:
              //if user does not have 2 coins have this response instead
              document.getElementById("chat").innerHTML = "Nice try, come back when you have some coin";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              break;
            //user selected second button which is ("no")
            case 3:
              document.getElementById("chat").innerHTML = "Then stop loitering";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
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
          document.getElementById("chat").innerHTML = "Need something?";
          //checks to see state of mission (2 means it has been completed)
          if (that.game.camera.missions.missions["KillCoyote"].state == 2) {
            var response1 = "Q) I killed that coyote for you";
            var response2 = "";
          }
          //if user hasn't completed mission yet (state 0 or 1)
          else {
            var response1 = "Q) Yes";
            var response2 = "E) No";
          }
          //the 2 button respnses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;

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
              document.getElementById("chat").innerHTML = "Well... If you'd like a mission I have one for you.";
              var response1 = "Q) Yes, that's why I'm here.";
              var response2 = "E) No, I don't feel like it";
              document.getElementById("response1").innerHTML = response1;
              document.getElementById("response2").innerHTML = response2;
              break;
             //user selected first buttion which is ("Yes, that's why I'm here.")
            case 2:
              document.getElementById("chat").innerHTML = "Go kill one of those coyotes for me then come back here when you've done it.";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              //user has been given mission so it goes from state 0 (pre-mission) to state 1 (mission active)

              if (that.game.camera.missions.missions["KillCoyote"].state == 0) {
                that.game.camera.missions.missions["KillCoyote"].state = 1;
              }

              break;
              //user selected second option which is ("No") in level 1 or ("No, I don't feel like it.") in level 2
            case 3:
              document.getElementById("chat").innerHTML = "I ought you lock you up.";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              break;
              //user has completed the mission (state 2)
            case 4:
              document.getElementById("chat").innerHTML = "Thanks, now I get the day off.";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              that.game.camera.missions.missions["KillCoyote"].state == 3;
              break;
              //user is in state 1 (mission has been given but has not been completed)
            case 5:
              document.getElementById("chat").innerHTML = "Arent you supposed to be killing a coyote for me.";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
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
          document.getElementById("chat").innerHTML = "1..2...3... AH! When did you get here?";
          //user response options
          var response1 = "Q) Literally just now. ";
          var response2 = "E) What are you doing?";
          //the 2 button respnses user can have 
          document.getElementById("response1").innerHTML = response1;
          document.getElementById("response2").innerHTML = response2;
           //gets from index file the response (1 or 2) that user selected based on which button was pushed
            var user = response;
            //set the state to determine dialogue options
            //LEVEL 1 of conversation
            if (user == 1 && userCount == 1) {
              stateResponse = 1;
            }
            else if (user == 2 && userCount == 1) {
              stateResponse = 2;
            }
            else if (userCount >= 2) {
              document.getElementById("chat").innerHTML = "";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
            }
          switch (stateResponse) {
        //LEVEL 1 of conversation
            //if user selected option 1 ("Literally just now.")
            case 1:
              document.getElementById("chat").innerHTML = "You should really announce yourself, instead of sneaking up.";
              var response1 = "Q) Sorry";
              var response2 = "E) ...";
              document.getElementById("response1").innerHTML = response1;
              document.getElementById("response2").innerHTML = response2;
              break;
            //if user selected option 1 ("What are you doing?")
            case 2:
              document.getElementById("chat").innerHTML = "Counting my coins of course.";
              document.getElementById("response1").innerHTML = "";
              document.getElementById("response2").innerHTML = "";
              break;
          }
        }

      }
    });


    this.lastX = this.x;
    this.lastY = this.y;
    if (this.stats.drunk > 0) {
      this.stats.drunk--;
      this.velocity.x = -this.velocity.x;
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if(this.x > this.game.camera.scenes[this.game.camera.currentScene].xMax)
    {
      this.x = this.game.camera.scenes[this.game.camera.currentScene].xMax;
    }
    if(this.x < this.game.camera.scenes[this.game.camera.currentScene].xMin)
    {
      this.x = this.game.camera.scenes[this.game.camera.currentScene].xMin;
    }
    if(this.y > this.game.camera.scenes[this.game.camera.currentScene].yMax)
    {
      this.y = this.game.camera.scenes[this.game.camera.currentScene].yMax;
    }
    if(this.y < this.game.camera.scenes[this.game.camera.currentScene].yMin)
    {
      this.y = this.game.camera.scenes[this.game.camera.currentScene].yMin;
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
    that.updateBB();
    this.stats.setX(this.x);
    this.stats.setY(this.y);
    this.stats.setFacing(this.facingState);

    //to clear buttons/npc chat once user has moved away from npc 
    if (!this.talking) {
      //reset response to 0
      response = 0;
      //empty dialogue/responses 
      document.getElementById("chat").innerHTML = "";
      document.getElementById("response1").innerHTML = "";
      document.getElementById("response2").innerHTML = "";
      //reset user count to 0 (to start conversations over)
      userCount = 0;
      //flag is currently only being used for beer purchase
      if (flag) {
        playerInventory.addItem("beer", 1);
        playerInventory.removeItem("coin", 2);
        flag = false;
      }

    }


  }

  draw(ctx) {
    if (this.velocity.x == 0 && this.velocity.y == 0 && this.facingState == 0) {
      // ctx.drawImage(this.spritesheet, 2, 88, 20, 31, this.x, this.y, 20 * this.SCALE, 31 * this.SCALE);
      this.horizontalWalking.drawFrame(0, ctx, this.x, this.y, this.SCALE);
    }
    else if (this.facingState == 0) {
      this.horizontalWalking.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
    }
    else if (this.facingState == 1) {
      if (this.camera == null) {
        ctx.save();
        ctx.scale(-1, 1);
        this.horizontalWalking.drawFrame(this.game.clockTick, ctx, -this.x - (20 * this.SCALE), this.y, this.SCALE);
        ctx.restore();
      } else {
        // Cry
        this.horizontalWalkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.SCALE);
      }

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
    this.health = 50;
    this.baseDamage = 5;
    this.damage;
    this.armor = 5;
    this.maxHealth = 100;
    this.x = 0;
    this.y = 0;
    this.speed = 3 * 5;
    this.facing;
    this.drunk = 0;
    this.lvl = 0;
    this.exp = 0;
    this.nextLvl = 50;
       playerInventory.addItem("coin", 0);
    playerInventory.addItem("medpac", 0);
    this.setDamage(this.baseDamage);
  }
  takeDamage(amt) {
    this.health -= amt;
    this.health = Math.ceil(this.health);
    if (this.health <= 0) {
      this.health = 0;
    }
  }
  heal(amt) {
    this.health += amt;
    if (this.health >= this.maxHealth) {
      this.health = this.maxHealth; ''
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
    }
  }
  draw(ctx) {
    ctx.fillStyle = "Red";
    ctx.font = "15px Papyrus";
    ctx.fillText("Level: " + this.lvl, 5, 725);
    ctx.fillText("Exp to next lvl: " + (this.nextLvl - this.exp), 5, 740);
    ctx.fillText("Health: " + this.health, 5, 755);
    if (this.drunk != 0) {
      document.getElementById("chat").innerHTML = "<br>Effects of beer will wear off in " + this.drunk;
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
    for (var i = 0; i < self.items.length; i++) {
      var but = i + 1;
      let item = Item.List[self.items[i].id];
      let onclick = "Item.List['" + item.id + "'].event()";
      str += "<button onclick=\"" + onclick + "\" >" + but + ") " + item.name + " x" + self.items[i].amount + "</button>";
    }

    document.getElementById("inventory").innerHTML = str;
  }
  self.use = function (id) {
    Item.List[id].event();
  }


  return self;
}

//define inventory items and how they're used
Item = function (id, name, event) {
  var self = {
    id: id,
    name: name,
    event: event,
  }
  Item.List[self.id] = self;
  return self;
}
Item.List = {};

//health pacs will increase health and be removed upon use 
Item("medpac", "MedPac", function () {
  if (playerInventory.hasItem("medpac", 0)) {
    gameEngine.camera.cowboy.health += 10;
    playerInventory.removeItem("medpac", 1);
  }
});

//beer
Item("beer", "Beer", function () {
  if (playerInventory.hasItem("beer", 0)) {
    playerInventory.removeItem("beer", 1);
    gameEngine.camera.cowboy.drunk = 600;
  }
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
