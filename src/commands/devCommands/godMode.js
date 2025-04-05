
const { loadPlayer, savePlayer } = require('../../utils/playerUtils');
const { allEnemies } = require('../../data/enemies/enemies');
const stringSimilarity = require('string-similarity');

const STAT_ALIASES = {
  str: 'strength',
  stam: 'stamina',
  agi: 'agility',
  int: 'intellect',
  arm: 'armor',
  cc: 'critChanceBonus',
  cd: 'critDamageBonus',
  hp: 'currentHP',
  health: 'currentHP',
  enemy: 'currentEnemy',
  loc: 'location'
};

const MULT_KEYS = ['strengthMult', 'critChanceBonus', 'critDamageBonus'];
const BASE_KEYS = ['strength', 'stamina', 'agility', 'intellect', 'armor'];

module.exports = {
  name: 'godmode',
  description: 'Dev command to override stats, location, etc. Use !godmode reset to undo.',
  devOnly: true,

  async execute(message, args) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);
    if (!profile) return message.channel.send('❌ You don’t have a character yet.');

    if (args[0]?.toLowerCase() === 'reset') {
      delete profile.godStats;
      savePlayer(userId, profile);
      return message.channel.send('💨 Godmode overrides cleared.');
    }

    if (!profile.godStats) profile.godStats = {};

    for (let i = 0; i < args.length; i += 2) {
      const rawKey = args[i]?.toLowerCase();
      const value = isNaN(args[i + 1]) ? args[i + 1] : Number(args[i + 1]);
      const key = STAT_ALIASES[rawKey] || rawKey;

      if (!key || value === undefined) continue;

      if (['level', 'xp', 'gold', 'prestige'].includes(key)) {
        profile.godStats[key] = value;
        continue;
      }

      if (key === 'location') {
        profile.godStats.location = value;
        continue;
      }

      if (key === 'heat') {
        profile.godStats.location = profile.godStats.location || {};
        profile.godStats.location.heat = value;
        continue;
      }

      if (BASE_KEYS.includes(key)) {
        profile.godStats.stats = profile.godStats.stats || {};
        profile.godStats.stats.base = profile.godStats.stats.base || {};
        profile.godStats.stats.base[key] = value;
        continue;
      }

      if (MULT_KEYS.includes(key)) {
        profile.godStats.stats = profile.godStats.stats || {};
        profile.godStats.stats.buffs = profile.godStats.stats.buffs || {};
        profile.godStats.stats.buffs[key] = value;
        continue;
      }

      if (key === 'currentHP') {
        profile.godStats.combat = profile.godStats.combat || {};
        profile.godStats.combat.currentHP = value;
        continue;
      }

      if (key === 'currentEnemy') {
        const enemyNames = allEnemies.map(e => e.name);
        const match = stringSimilarity.findBestMatch(String(value).toLowerCase(), enemyNames);
        const best = allEnemies.find(e => e.name === match.bestMatch.target);
        if (best) {
          profile.godStats.combat = profile.godStats.combat || {};
          profile.godStats.combat.currentEnemy = best;
          profile.godStats.combat.enemyHP = best.stats.hp || best.stats.maxHP || 1;
          profile.godStats.combat.enemyMaxHP = best.stats.maxHP || best.stats.hp || 1;
          profile.godStats.combat.inBattle = true;
        }
        continue;
      }
    }

    savePlayer(userId, profile);
    return message.channel.send('💻 Godmode activated. Your profile has been updated.');
  }
};
