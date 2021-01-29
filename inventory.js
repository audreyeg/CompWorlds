class SceneInventory
{
    constructor(game,owner)
    {
        this.game = game;
        this.owner = owner;
        this.items = [];
    }
    addNewItem(item)
    {
        var itemToAdd = item;
        var exists = this.items.indexOf(itemToAdd);
        if(exists == -1)
        {
            this.items.push(itemToAdd);
            this.items.push(1);
            console.log("New Item Added " + itemToAdd);
        }
        else
        {
            this.items[exists + 1] += 1;
            console.log("Item Added "  + itemToAdd);
        }
    }
    removeAnItem(item)
    {
        var exists = this.items.indexOf(item);
        if(exists == -1)
        {
            console.log("Do not have item");
        }
        else
        {
            this.items[exists + 1]--;
            console.log("item Removed " + item);
            if(this.items[exists + 1] == 0)
            {
                this.items.splice(exists,2);

            }
        }

    }
    checkItem(item)
    {
        return this.items[this.items.indexOf(item) + 1];
    }
    update(ctx)
    {}
    draw()
    {}
}