class EnemySpawner
{
    constructor(game,xMin,xWidth,yMin,yWidth,maxE,enemy)
    {
        this.game = game;
        this.xMin = xMin;
        this.xWidth = xWidth;
        this.yMin = yMin;
        this.yWidth = yWidth;
        this.maxEnemies = maxE;
        this.currentEnemies = 0;
        this.spawnTime = 0 //300 + Math.floor(Math.random() * 300);
        this.enemy = enemy;
    }
    update()
    {
        if(this.spawnTime == 0)
        {
            if(this.currentEnemies < this.maxEnemies)
            {
                this.currentEnemies++;
                this.x = this.xMin + Math.floor(Math.random() * this.xWidth);
                this.y = this.yMin + Math.floor(Math.random() * this.yWidth);
                if(this.enemy == 1)
                {
                    this.game.entities.push(new overWorldCoyote(this.game,this.x,this.y));
                }
                if(this.enmemy == 2)
                {
                    
                }
            }
            this.spawnTime = 300 + Math.floor(Math.random() * 300);
        }
        this.spawnTime--;
    }
    draw(ctx)
    {
    }
    changeEnemy(newEnemy)
    {
        this.enemy = newEnemy;
    }
}