﻿importPackage(com.d2.serv.game.Public);
importPackage(com.d2.serv.game.FightModule);

//灵压狂暴
function OnUser(fightsystem, self, target, skill, fv,timer)
{
	var MPDrain = 0;
    switch(skill.GetLevel())
    {
        case 1: 
        {
            AtkMulModify = 200;
			CritModify = 3;
			break;
        }      
        default: ;
    }
    var BuffMark = fightsystem.GetBuff(self, 11883);
    if(BuffMark != null)
    {
        return UserSkillReturn.SKILL_LOSE;
    }
    else 
    {
        fightsystem.AddBuff(self, 11883, timer, fv, AtkMulModify, CritModify);
		return UserSkillReturn.SKILL_SUCCESS;
    }
}