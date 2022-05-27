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
        let flag = false;
        if (buildingSendingMoney!=undefined)
        {
            let buildings = buildingSendingMoney.getSurroundoundingBuildings();
            for(let i=0;i<buildings.length;i++)
            {
                if (buildings[i]==null || buildings[i]==undefined){continue;}
                if (buildings[i].tag == 'park')
                {
                    flag = true;
                    break;
                }
            }

        }
        if (flag){amount+=1;}
        //console.log('aura')

        this.emit('onMoneyMade',amount);
        this.currentMoney += amount
    }
    getCurrMoney()
    {
        return this.currentMoney;
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