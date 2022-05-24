class PlayEconomy extends Phaser.GameObjects.GameObject
{
    constructor(scene,x,y)
    {
        super(scene,x,y)
        
        scene.add.existing(scene);
        this.currentMoney = 0;
        this.earnMoney(sceneInitMoney);
    }
    
    earnMoney(amount=0,buildingSendingMoney=undefined)
    {

        this.currentMoney += amount
    }

    spendMoney(amount=0)
    {
        this.currentMoney -= amount;
    }
    checkSpendMoney(amount=0)
    {
        if (this.currentMoney >= amount)
        {
            return true;
        }
        return false;
    }

    sceneEnd()
    {
        money += this.currentMoney;
        this.currentMoney = 0;
    }
}