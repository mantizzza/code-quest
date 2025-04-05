const { EmbedBuilder } = require('discord.js');
const { calculateTotalStat, getMaxHP, getGearStats } = require('../utils/playerUtils');


function generateProfileEmbed(profile) {
  const stats = ['strength', 'stamina', 'agility', 'intellect', 'armor'];
  const statIcons = {
    strength: '💪',
    stamina: '❤️',
    agility: '⚡',
    intellect: '🧠',
    armor: '🛡️'
  };

  const critChance = ((profile.stats.buffs?.critChanceBonus ?? 0.05) * 100).toFixed(1);
  const critDamage = ((profile.stats.buffs?.critDamageBonus ?? 0.5) * 100).toFixed(0);
  const maxHP = getMaxHP(profile);

  const embed = new EmbedBuilder()
    .setTitle(`${profile.name}'s Profile`)
    .addFields(
      { name: '🧪 Level / XP', value: `Lv. ${profile.level} | ${profile.levelXP.current} / ${profile.levelXP.needed}`, inline: true },
      { name: '💰 Gold', value: `${profile.gold}`, inline: true },
      { name: '🔥 Heat', value: `${profile.location.heat}`, inline: true },
      { name: '📍 Location', value: `${profile.location.current}`, inline: true },
      { name: '🏆 Prestige', value: `${profile.prestige}`, inline: true },
      { name: '❤️ HP', value: `${profile.combat.currentHP} / ${maxHP}`, inline: true },
      { name: '🎯 Crit Chance', value: `${critChance}%`, inline: true },
      { name: '💥 Crit Damage', value: `${critDamage}%`, inline: true }
    );

  if (profile.combat.currentEnemy) {
    embed.addFields({
      name: '⚔️ Current Enemy',
      value: `${profile.combat.currentEnemy.name} (${profile.combat.enemyHP} / ${profile.combat.enemyMaxHP}) [${profile.combat.currentEnemy.rarity || 'Normal'}]`
    });
  }
  const gearStats = getGearStats(profile);
  

  const statDisplay = stats.map(stat => {
    const base = profile.stats.base[stat] || 0;
    const gear = gearStats[stat] || 0; 
    const mult = profile.stats.buffs?.[`${stat}Mult`] ?? 1;
    const total = calculateTotalStat(profile, stat);
    return `${statIcons[stat]} **${stat.charAt(0).toUpperCase() + stat.slice(1)}**: ${total} (Base: ${base}, Gear: ${gear}, ×${mult})`;
  });

  embed.addFields({ name: '📊 Stats', value: statDisplay.join('\n') });

  return embed;
}

module.exports = { generateProfileEmbed };
