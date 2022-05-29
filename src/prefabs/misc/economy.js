class PlayEconomy extends Phaser.GameObjects.GameObject
{
    constructor(scene)
    {
        super(scene)
        
        scene.add.existing(scene);
        this.currentMoney = 0;
        this.earnMoney(sceneInitMoney);

        this.particles = scene.add.particles('money');
        
        this.moneyEmitter = this.particles.createEmitter({
            alpha : {start : 1, end : .25},
            duration : 3 * 1000,
            speed : {min : 75, max : 100},
            angle : {min : 250, max : 290},
        }).stop();
        
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
        //set animation here
        if (buildingSendingMoney != undefined)
        {
            this.emitParticles(amount, buildingSendingMoney);
        }
        this.currentMoney += amount
        this.emit('onMoneyChanged',this.currentMoney);
    }
    emitParticles(amount,building)
    {
        this.particles.setDepth(building.depth+1);
        this.moneyEmitter.emitParticle(amount,building.x,building.y - 20);
    }
    getCurrMoney()
    {
        return this.currentMoney;
    }
    spendMoney(amount=0)
    {
        this.currentMoney -= amount;
        this.emit('onMoneyChanged',this.currentMoney);
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