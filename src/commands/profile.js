const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

function calculateTotalStat(profile, statName, statVar = 1) {
  const base = profile.stats.base[statName] || 0;
  const gear = profile.stats.gear[statName] || 0;
  const level = profile.level || 1;
  const mult = profile.stats.buffs[`${statName}Mult`] || 1;
  return Math.floor((base + level * statVar + gear) * mult);
}

function generateProfileEmbed(profile) {
  const embed = new EmbedBuilder()
    .setTitle(`🧬 ${profile.name}'s Profile`)
    .setColor(0x00AE86)
    .addFields(
      { name: 'Prestige', value: `${profile.prestige}`, inline: true },
      { name: 'Level', value: `${profile.level}`, inline: true },
      { name: 'XP', value: `${profile.xp}`, inline: true },
      { name: 'Gold', value: `${profile.gold}`, inline: true },
      { name: 'Location', value: profile.location.current, inline: true },
      { name: '\u200B', value: '\u200B' },

      { name: 'Health', value: `${profile.combat.currentHP}/${profile.combat.maxHP}`, inline: true },
      { name: 'Current Enemy', value: profile.combat.currentEnemy ? `${profile.combat.currentEnemy} (${profile.combat.enemyHP}/${profile.combat.enemyMaxHP})` : 'None' },

      { name: '\u200B', value: '\u200B' },
      { name: '🛡️ Stats', value: '\u200B' },

      { name: 'Stamina', value: `${calculateTotalStat(profile, 'stamina')}`, inline: true },
      { name: 'Strength', value: `${calculateTotalStat(profile, 'strength')}`, inline: true },
      { name: 'Agility', value: `${calculateTotalStat(profile, 'agility')}`, inline: true },
      { name: 'Intellect', value: `${calculateTotalStat(profile, 'intellect')}`, inline: true },
      { name: 'Armor', value: `${calculateTotalStat(profile, 'armor')}`, inline: true },
      { name: 'Crit Chance', value: `${(profile.stats.buffs.critChanceBonus * 100).toFixed(1)}%`, inline: true },
      { name: 'Crit Damage', value: `${(profile.stats.buffs.critDamageBonus * 100).toFixed(1)}%`, inline: true }
    )
    .setFooter({ text: `Type !start to begin if you haven't already.` });

  return embed;
}

module.exports = { generateProfileEmbed };
