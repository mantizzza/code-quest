
const { loadPlayer, savePlayer } = require('../utils/playerUtils.js');
const { ensureEnemy } = require('../engine/enemySpawner.js');
const { addXP } = require('../utils/levelUtils.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'attack',
  description: 'Attack the enemy!',
  async execute(interaction) {
    const userId = interaction.user?.id || interaction.author?.id;
    const profile = loadPlayer(userId);

    if (!profile) {
      return interaction.reply({ content: "❌ You don't have a character. Use `!start` to begin.", ephemeral: true });
    }

    if (profile.combat.currentHP <= 0) {
      profile.location.heat = 0;
      savePlayer(userId, profile);
      return interaction.reply({ content: "💀 You are dead and cannot attack! Use `!revive` first.", ephemeral: true });
    }

    ensureEnemy(profile);
    const enemy = profile.combat.currentEnemy;
    if (!enemy) {
      return interaction.reply({ content: "❌ Could not find your current enemy.", ephemeral: true });
    }

    // Ensure fallback agility for enemy
    if (!enemy.stats.agility) {
      enemy.stats.agility = Math.floor(enemy.level * 0.8);
    }

    const isCrit = Math.random() < getCritChance(profile);
    let playerDamage = applyVariance(calculatePlayerDamage(profile, isCrit));
    let enemyDamage = applyVariance(calculateEnemyDamage(enemy));

    const playerAgi = calculateTotalStat(profile, 'agility');
    const enemyAgi = enemy.stats.agility || 1;

    const embed = new EmbedBuilder()
      .setTitle(`⚔️ Combat vs ${enemy.name}`)
      .setColor(isCrit ? 0xff0000 : 0x00aa00)
      .setThumbnail(enemy.image || null);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('attack_button')
        .setLabel('Attack Again')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('profile_button')
        .setLabel('View Profile')
        .setStyle(ButtonStyle.Secondary)
    );

    let combatLog = [];

    if (playerAgi >= enemyAgi) {
      // player attacks first
      profile.combat.enemyHP -= playerDamage;
      if (profile.combat.enemyHP < 0) profile.combat.enemyHP = 0;
      combatLog.push({ name: 'You attack!', value: `${isCrit ? '💥 **Critical!** ' : ''}You hit **${enemy.name}** for **${playerDamage}** damage.` });

      if (profile.combat.enemyHP <= 0) {
        return finishVictory(interaction, profile, enemy, combatLog, embed);
      }

      profile.combat.currentHP -= enemyDamage;
      if (profile.combat.currentHP < 0) profile.combat.currentHP = 0;
      combatLog.push({ name: 'Enemy strikes back!', value: `🩸 ${enemy.name} hits you for **${enemyDamage}** damage.` });

    } else {
      // enemy attacks first
      profile.combat.currentHP -= enemyDamage;
      if (profile.combat.currentHP < 0) profile.combat.currentHP = 0;
      combatLog.push({ name: 'Enemy strikes first!', value: `🩸 ${enemy.name} hits you for **${enemyDamage}** damage.` });

      if (profile.combat.currentHP <= 0) {
        profile.location.heat = 0;
        savePlayer(userId, profile);
        embed.addFields(...combatLog);
        embed.addFields({ name: '💀 You Died', value: 'You were slain before striking back!' });
        return interaction.reply({ embeds: [embed] });
      }

      profile.combat.enemyHP -= playerDamage;
      if (profile.combat.enemyHP < 0) profile.combat.enemyHP = 0;
      combatLog.push({ name: 'You counterattack!', value: `${isCrit ? '💥 **Critical!** ' : ''}You hit **${enemy.name}** for **${playerDamage}** damage.` });

      if (profile.combat.enemyHP <= 0) {
        return finishVictory(interaction, profile, enemy, combatLog, embed);
      }
    }

    combatLog.push(
      { name: 'Your HP', value: `${profile.combat.currentHP}/${profile.combat.maxHP}`, inline: true },
      { name: 'Enemy HP', value: `${profile.combat.enemyHP}/${profile.combat.enemyMaxHP}`, inline: true }
    );

    if (enemy.stats?.traits?.length) {
      embed.addFields({ name: 'Enemy Traits', value: enemy.stats.traits.join(', ') });
    }

    embed.addFields(...combatLog);
    savePlayer(userId, profile);
    return interaction.reply({ embeds: [embed], components: [row] });
  }
};

function finishVictory(interaction, profile, enemy, combatLog, embed) {
  const userId = interaction.user?.id || interaction.author?.id;
  const xpGain = enemy.stats.xpDrop || 10;
  const goldRange = enemy.stats.goldDrop || [3, 5];
  const goldGain = Math.floor(Math.random() * (goldRange[1] - goldRange[0] + 1)) + goldRange[0];

  const { leveledUp, newLevel } = addXP(profile, xpGain);
  profile.gold += goldGain;
  profile.combat.defeatedEnemies += 1;
  profile.combat.currentEnemy = null;
  profile.combat.enemyHP = 0;
  profile.combat.enemyMaxHP = 0;
  profile.combat.inBattle = false;
  profile.location.heat = (profile.location.heat || 0) + 1;

  combatLog.push(
    { name: '🏆 Victory!<:veryNiceMantizzza:1355249551614804131>', value: `You defeated **${enemy.name}** and earned **${xpGain} XP** and **${goldGain} gold**.` },
    { name: '📈 XP Progress', value: `${profile.levelXP.current} / ${profile.levelXP.needed} XP` },
    { name: 'Your HP', value: `${profile.combat.currentHP}/${profile.combat.maxHP}`, inline: true },
    { name: 'Enemy HP', value: `0/${enemy.stats.hp || 1}`, inline: true }
  );

  embed.addFields(...combatLog);
  savePlayer(userId, profile);
  return interaction.reply({ embeds: [embed] });
}

function applyVariance(value, variance = 0.1) {
  const range = value * variance;
  return Math.max(1, Math.floor(value + (Math.random() * range * 2 - range)));
}

function calculatePlayerDamage(profile, isCrit = false) {
  const base = calculateTotalStat(profile, 'strength');
  const critMult = isCrit ? (1 + (profile.stats.buffs.critDamageBonus || 0.5)) : 1;
  return Math.floor(base * 1.2 * critMult);
}

function getCritChance(profile) {
  const base = 0.05;
  const bonus = profile.stats.buffs.critChanceBonus || 0;
  return base + bonus;
}

function calculateEnemyDamage(enemy) {
  return Math.floor(enemy.stats.attack || 3);
}

function calculateTotalStat(profile, statName) {
  const base = profile.stats.base[statName] || 0;
  const gear = profile.stats.gear[statName] || 0;
  const level = profile.level || 1;
  const mult = profile.stats.buffs[`${statName}Mult`] || 1;

  const statVars = {
    strength: 1,
    stamina: 1,
    agility: 1,
    intellect: 1
  };

  const scale = statVars[statName] || 1;
  return Math.floor((base + (level - 1) * scale + gear) * mult);
}
