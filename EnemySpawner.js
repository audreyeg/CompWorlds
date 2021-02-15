class EnemySpawner
{
    constructor(game)
    {
        this.game = game;
        this.maxEnemies = 5;
        this.currentEnemies = 0;
        this.spawnTime = 0 //300 + Math.floor(Math.random() * 300);
    }
    update()
    {
        if(this.spawnTime == 0)
        {
            if(this.currentEnemies < this.maxEnemies)
            {
                this.x = Math.floor(Math.random() * 1000);
                this.y = 400 + Math.floor(Math.random() * 300);
                this.game.entities.push( new overWorldCoyote(this.game,this.x,this.y));
                this.currentEnemies++;
                console.log(this.x + " " + this.y + " Spawn" );
            }
            this.spawnTime = 300 + Math.floor(Math.random() * 300);
        }
        this.spawnTime--;
    }
    draw(ctx)
    {
    }
}