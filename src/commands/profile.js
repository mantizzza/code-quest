const { loadPlayer, savePlayer } = require('../utils/playerUtils.js');
const { ensureEnemy } = require('../engine/enemySpawner.js');
const { EmbedBuilder } = require('discord.js');
const locations = require('../data/locations/locations.js');
const enemies = require('../data/enemies/enemies.js');

module.exports = {
  name: 'profile',
  description: 'View your profile',
  async execute(message) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);
    if (!profile) {
      return message.channel.send(`❌ You don't have a character yet! Type \`!start\` to begin.`);
    }

    ensureEnemy(profile, locations, enemies);
    savePlayer(userId, profile);

    const stats = profile.stats;

    const embed = new EmbedBuilder()
      .setTitle(`🧬 ${profile.name} 'the great'`)
      .setColor(0x00AE86)
      .addFields(
        { name: 'Prestige', value: `${profile.prestige}`, inline: true },
        { name: 'Level', value: `${profile.level}`, inline: true },
        { name: 'XP', value: `${profile.xp}`, inline: true },
        { name: 'Gold', value: `${profile.gold}`, inline: true },
        { name: 'Altar Level', value: `${profile.altarLevel}`, inline: true },
        { name: 'Explorer Points', value: `${profile.explorerPoints}`, inline: true },
        { name: 'Quests Completed', value: `${profile.questsCompleted}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Health', value: `${profile.combat.currentHP}/${profile.combat.maxHP}`, inline: true },
        { name: 'Current Enemy', value: `${profile.combat.currentEnemy}: ${profile.combat.enemyHP}/${profile.combat.enemyMaxHP}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '🛡️ Stats', value: '\u200B' },
        { name: 'Stamina', value: `${stats.stamina}`, inline: true },
        { name: 'Strength', value: `${stats.strength}`, inline: true },
        { name: 'Agility', value: `${stats.agility}`, inline: true },
        { name: 'Intellect', value: `${stats.intellect}`, inline: true },
        { name: 'Armor', value: `${stats.armor}`, inline: true },
        { name: 'Strength Bonus', value: `${(stats.strengthBonus * 100).toFixed(1)}%`, inline: true },
        { name: 'Spell Damage Bonus', value: `${(stats.spellDamageBonus * 100).toFixed(1)}%`, inline: true },
        { name: 'Crit Chance', value: `${(stats.critChance * 100).toFixed(1)}%`, inline: true },
        { name: 'Crit Damage', value: `${(stats.critDamage * 100).toFixed(1)}%`, inline: true }
      );

    message.channel.send({ embeds: [embed] });
  }
};
