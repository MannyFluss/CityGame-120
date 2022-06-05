class PlayEconomy extends Phaser.GameObjects.GameObject
{
    constructor(scene, startingCash=0)
    {
        super(scene)
        
        scene.add.existing(scene);
        this.currentMoney = 0;
        this.disastersEndured = 0;
        this.timeSpent = 0;
        
        this.earnMoney(startingCash);

        this.particles = scene.add.particles('money');
        this.moneyEmitter = this.particles.createEmitter({
            scale : 1,
            alpha : {start : 1, end : .25},
            life : 5 * 1000,
            speed : {min : 75, max : 100},
            angle : {min : 250, max : 290},
        }).stop();


        this.timer = scene.time.addEvent({
            delay: 1000,                // ms
            callback: ()=>{this.timeSpent += 1;},
            loop: true
        });

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
        this.moneyEmitter.emitParticle(amount,building.x,building.y - 40);
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
        money = this.currentMoney * moneyMultiplier;
        this.currentMoney = 0;
    }
}