class InteriorTile {
    constructor(game, x, y, rotate180, tileSprite, spriteWidth) {
        Object.assign(this, { game, x, y, tileSprite, rotate180, spriteWidth });
        this.spritesheet = ASSET_MANAGER.getAsset(tileSprite);

        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = this.spriteWidth;
        this.offscreenCanvas.height = this.spriteWidth;
        var offscreenCtx = this.offscreenCanvas.getContext('2d');
        offscreenCtx.save();
        offscreenCtx.rotate(Math.PI);
        offscreenCtx.drawImage(this.spritesheet, 0, 0, this.spriteWidth, this.spriteWidth, 0, 0, -this.spriteWidth, -this.spriteWidth);
        offscreenCtx.restore();
        this.BB;
    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,this.spriteWidth,this.spriteWidth,this.x,this.y,this.spriteWidth,this.spriteWidth);
    };
};

class CenterHouseFadeLeft extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (14).png", 128);
    };
};

class CenterHouse extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (15).png", 128);
    };
};

class CenterHouseFadeRight extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (16).png", 128);
    };
};

class HouseTopLeftRoundCorner extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (21).png", 128);
    };
};

class HouseTopRightRoundCorner extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (22).png", 128);
    };
};

class HouseTopWall extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (24).png", 128);
    };
};

class HouseLeftWall extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (27).png", 128);
    };
};

class HouseBottomWall extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (31).png", 128);
    };
};

class HouseRightWall extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (29).png", 128);
    };
};

class HouseTopLeftCornerCrossBeam extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (23).png", 128);
    };
};

class HouseTopRightCornerCrossBeam extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (26).png", 128);
    };
}; 

class HouseBottomLeftCornerBeam extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (30).png", 128);
    };
}; 

class HouseBottomRightCornerBeam extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (33).png", 128);
    };
}; 

class Money extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Static Objects/Other/Money (1).png", 128);
    };

    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,this.spriteWidth,this.spriteWidth,this.x,this.y,this.spriteWidth / 2,this.spriteWidth / 2);
    };
};

class ClosedCage extends InteriorTile {
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/Cage_grey_standard_staying_3.png", 128);
    };

    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,250,231,this.x,this.y,this.spriteWidth,this.spriteWidth);
    };
}

class OpenCage extends InteriorTile {
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/Cage_grey_broken_staying_3.png", 128);
    };

    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,250,231,this.x,this.y,this.spriteWidth,this.spriteWidth);
    };
}

class WheelTable extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Static Objects/Other/Wheel 2.png", 128);
    };
    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,136,136,this.x,this.y,this.spriteWidth,this.spriteWidth);
    };
}; 

class LeftWallWoodThing extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Tiles/House/HouseTile (36).png", 128);
    };
}; 

class Crate extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Static Objects/Other/Crate.png", 128);
    };
    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,106,106,this.x,this.y,this.spriteWidth * 3 / 5,this.spriteWidth);
    };
}; 

class Barrel extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Static Objects/Other/Barrel.png", 64);
    };
    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,136,152,this.x,this.y,this.spriteWidth,this.spriteWidth);
    };
}; 
class Chest extends InteriorTile { 
    constructor(game, x, y, rotate180) {
        super(game, x, y, rotate180, "./sprites/png/Separate/128/Animated Objects/Chest/Chest (4).png", 64);
        this.BB = new BoundingBox(this.x,this.y,60,58);
    };
    draw(ctx) {
        ctx.drawImage((this.rotate180) ? this.offscreenCanvas : this.spritesheet,0,0,136,152,this.x,this.y,this.spriteWidth,this.spriteWidth);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
    update()
    {
        var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
         if (entity instanceof Coin && that.game.camera.missions.missions["Bank"].state == 1) 
        {
          entity.removeFromWorld = true;
          var inventory;
          var temp = that.game.entities.length
          for (var i = 0; i < temp; i++) 
          {
            var temp2 = that.game.entities[i];
            if(temp2 instanceof SceneInventory) 
            {
                inventory = temp2;
            }
        }
          inventory.addNewItem("coin");
        }

      }
    });
    }

}; 
