const { EmbedBuilder } = require('discord.js');

function calculateTotalStat(profile, statName, statVar = 1) {
  const base = profile.stats.base[statName] || 0;
  const gear = profile.stats.gear[statName] || 0;
  const level = profile.level || 1;
  const mult = profile.stats.buffs[`${statName}Mult`] || 1;
  return {
    base,
    gear,
    level,
    mult,
    total: Math.floor((base + (level - 1) * statVar + gear) * mult)
  };
}

function generateProfileEmbed(profile, xpDisplayOverride = null) {
  const embed = new EmbedBuilder()
    .setTitle(`${profile.name}'s Profile`)
    .setColor(0x0099ff)
    .addFields(
      { name: 'Prestige', value: `${profile.prestige || 0}`, inline: true },
      { name: 'Level', value: `${profile.level}`, inline: true },
      { name: 'XP', value: xpDisplayOverride || `${profile.levelXP?.current || 0} / ${profile.levelXP?.needed || '?'}`, inline: true },
      { name: 'Gold', value: `${profile.gold}`, inline: true },
      { name: 'Location', value: `${profile.location?.current || 'Unknown'}`, inline: true },
      { name: 'Heat', value: `${profile.location?.heat || 0}`, inline: true },
      { name: 'Health', value: `${profile.combat.currentHP}/${profile.combat.maxHP}`, inline: true },
      { name: 'Current Enemy', value: `${profile.combat.currentEnemy?.name || 'None'} (${profile.combat.enemyHP}/${profile.combat.enemyMaxHP})`, inline: true }
    );

  const statDisplay = [];
  const buffDisplay = [];

  const playerStatVars = {
    strength: 1,
    stamina: 1,
    agility: 1,
    intellect: 1,
    armor: 1
  };

  Object.keys(playerStatVars).forEach(stat => {
    const { base, gear, mult, total } = calculateTotalStat(profile, stat, playerStatVars[stat]);
    const display = `**${capitalize(stat)}**: (${base} + :tophat: ${gear}) × :sparkles: ${mult.toFixed(2)} = **${total}**`;
    statDisplay.push(display);
  });

  const critChance = Math.round((profile.stats.buffs.critChanceBonus || 0) * 100);
  const critDamage = Math.round((profile.stats.buffs.critDamageBonus || 0.5) * 100);
  buffDisplay.push(`Crit Chance: +${critChance}%`);
  buffDisplay.push(`Crit Damage: +${critDamage}%`);

  embed.addFields(
    { name: '📊 Stats', value: statDisplay.join('\n') },
    { name: '🎯 Buffs', value: buffDisplay.join('\n') }
  );

  return embed;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { generateProfileEmbed };