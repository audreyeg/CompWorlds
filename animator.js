class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, camera=null, flipHorizontally = false) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop, camera, flipHorizontally  });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

        this.drawables = [];  // Holds a drawable for each frame of the animation, accessible by index
    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        if (this.drawables[frame] == undefined) {
            this.drawables[frame] = new DynamicDrawable(this.camera, this.xStart + frame * (this.width + this.framePadding), this.yStart,
            this.width, this.height, this.width * scale, this.height * scale, this.spritesheet);
        }
      
        
        // Don't ask me, ask Sam
        if (this.camera == null) {
            // console.log("this.xStart + frame * (this.width + this.framePadding)");
            // console.log(this.xStart + frame * (this.width + this.framePadding));
            // console.log("this.width");
            // console.log(this.width);
            ctx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
                this.width, this.height,
                x, y,
                this.width * scale,
                this.height * scale);
        } else {
            this.drawables[frame].draw(ctx, x, y);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};