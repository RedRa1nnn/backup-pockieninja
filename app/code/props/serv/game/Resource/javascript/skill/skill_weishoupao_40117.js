﻿importPackage(com.d2.serv.game.Public);
importPackage(com.d2.serv.game.FightModule);

//尾兽炮
function OnUser(fightsystem, self, target, skill, fv,timer)
{
    var BaseMPCost = (200+20*(self.Level-1)*(1+(20+self.Level-1+LogicTool.ToInt(self.Level/3+1)*8+(LogicTool.ToInt((self.Level-1)/10)*7+14)/3*8)/12*0.01))/30;
    var MPCost = LogicTool.ToInt(BaseMPCost * 2);
    var ThunderDamage = 0;
	var TargetCostHP = 0;
    switch(skill.GetLevel())
    {
        case 1: 
        {
            ThunderDamage = 0.8;
            break;
        }
        default: ;
    }
    //检查自己的套子(静电结界)用于抵消伤害
    var BuffVesselDestroy = fightsystem.GetBuff(self, 11839);
    if(BuffVesselDestroy != null)
    {
        MPCost = MPCost*2;
    }
    var BuffSeal = fightsystem.GetBuff(self, 11812);
    if(BuffSeal != null)
    {
        var skill = fightsystem.ChangeSkill(skill,1,fv);
        return fightsystem.UserSkill(self,target,skill,timer,fv);
    }
    if(self.MP < MPCost)
    {
        var skill = fightsystem.ChangeSkill(skill,1,fv);
        return fightsystem.UserSkill(self,target,skill,timer,fv);
    }
    var InitBuff = fightsystem.GetBuff(target,8888);
    if(InitBuff == null)
    {
        var skill = fightsystem.ChangeSkill(skill,1,fv);
        return fightsystem.UserSkill(self,target,skill,timer,fv);
    }  
    else
    {     
        var IsMelt = 0;
        var BuffSunSet = fightsystem.GetBuff(self, 11822);
        if(BuffSunSet != null)
        {
            if(LogicTool.RandInt(0, 99) < BuffSunSet.SaveData)
            {
                IsMelt = 1;
            }
        }
		var TargetCostHP = target.HP;
		if(TargetCostHP < 200)
		{
			var AttackDamage = 200+ThunderDamage*target.HP;
		}
		else
		{
        var AttackDamage = ThunderDamage*target.HP;
		}
        //检查套子
            var BackDamage = 0;
            var BuffWarmBlooded = fightsystem.GetBuff(self,11814);
            if(BuffWarmBlooded != null)
            {
                BackDamage = AttackDamage*0.2;
            }
            var BuffPeg = fightsystem.GetBuff(target,11840);
            fightsystem.Attack(self,target,AttackDamage,BackDamage,fv,timer);
            if((fv.IsHit == 1)&&(BuffPeg == null))
            {                       
                var BuffDizzy = fightsystem.GetBuff(target,11813);
                if(BuffDizzy != null)   
                {
                    fightsystem.RemoveBuff(target,11813,timer,fv);
                }
                if(InitBuff.SaveData%1000/100 < 4)
                {
                    var BuffFreeze = fightsystem.GetBuff(target,11802);
                    if(BuffFreeze == null)
                    {
                        //检查重复幻觉状态
                        var BuffParalysis = fightsystem.GetBuff(target,11836);
                        if(BuffParalysis != null)
                        {          
                            fightsystem.RemoveBuff(target,11836,timer,fv);
                        }
                        fightsystem.AddBuff(target,11836,timer,fv);
                        InitBuff.SaveData += 100;
                    }
                }       
            }
        self.MP -= MPCost;
        fv.DecMP = MPCost;
        if(IsMelt != 0)
            fv.IsNeglectDef = 1;  
        var BuffDrain = fightsystem.GetBuff(self, 11836);
        if(BuffDrain != null)
        {
            fightsystem.RemoveBuff(self,11836,timer,fv);
        }
        return UserSkillReturn.SKILL_SUCCESS;
    }
}