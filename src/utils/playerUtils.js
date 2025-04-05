const { getItemById } = require('./itemUtils');
const fs = require('fs');
const path = require('path');
const { baseStats } = require('../data/playerData/baseStats');
const { getXPForLevel } = require('../utils/levelUtils');
const DEV_IDS = ['490673873885331461'];

const playersDir = path.join(__dirname, '..', 'players');
if (!fs.existsSync(playersDir)) {
  fs.mkdirSync(playersDir, { recursive: true });
}

function getPlayerPath(userId) {
  return path.join(playersDir, `${userId}.json`);
}

function savePlayer(userId, data) {
  fs.writeFileSync(getPlayerPath(userId), JSON.stringify(data, null, 2));
}

function loadPlayer(userId) {
  const filePath = getPlayerPath(userId);
  if (!fs.existsSync(filePath)) return null;

  const profile = JSON.parse(fs.readFileSync(filePath));
  if (!profile.levelXP) {
    profile.levelXP = {
      current: profile.xp || 0,
      needed: getXPForLevel(profile.level || 1)
    };
  }

  if (DEV_IDS.includes(userId)) {
    profile.isDev = true;
  }

  // Update max HP on load
    profile.combat.maxHP = getMaxHP(profile);
    if (profile.combat.currentHP > profile.combat.maxHP) {
      profile.combat.currentHP = profile.combat.maxHP;
    }

  return profile;
}

function getEffectiveStat(profile, stat) {
  return profile.godStats?.stats?.base?.[stat] ?? profile.stats.base?.[stat] ?? 0;
}

function getEffectiveBuff(profile, stat) {
  return profile.godStats?.stats?.buffs?.[stat] ?? profile.stats.buffs?.[stat] ?? 1;
}

function getEffectiveLevel(profile) {
  return profile.godStats?.level ?? profile.level ?? 1;
}

function getGearStats(profile) {
  const totals = {
    strength: 0,
    stamina: 0,
    agility: 0,
    intellect: 0,
    armor: 0,
    // add others if needed
  };

  if (profile.equipped) {
    for (const itemId of Object.values(profile.equipped)) {
      const item = getItemById(itemId);
      if (item?.stats) {
        for (const [key, value] of Object.entries(item.stats)) {
          if (totals[key] != null) {
            totals[key] += value;
          }
        }
      }
    }
  }

  return totals;
}

function calculateTotalStat(profile, statName, statVar = 1) {
  const base = getEffectiveStat(profile, statName);
  const level = getEffectiveLevel(profile);
  const mult = getEffectiveBuff(profile, `${statName}Mult`);

  // Add gear stats from stats.gear
  let gear = profile.stats.gear?.[statName] ?? 0;

  // Add equipped gear stats (from profile.equipped)
  if (profile.equipped) {
    for (const itemId of Object.values(profile.equipped)) {
      const item = getItemById(itemId);
      if (item?.stats?.[statName]) {
        gear += item.stats[statName];
      }
    }
  }

  return Math.floor((base + (level - 1) * statVar + gear) * mult);
}

function getMaxHP(profile) {
  const totalStamina = calculateTotalStat(profile, 'stamina', 1);
  return totalStamina * 10;
}

function createNewProfile(userId, username) {
  const profile = {
    id: userId,
    name: username,
    level: 1,
    xp: 0,
    gold: 0,
    prestige: 0,
    isDev: DEV_IDS.includes(userId),
    isMod: false,
    levelXP: {
      current: 0,
      needed: getXPForLevel(1)
    },
    location: {
      current: 'Lush Forest',
      unlocked: ['Lush Forest'],
      heat: 0
    },
    stats: {
      base: { ...baseStats },
      gear: {
        stamina: 0,
        strength: 0,
        agility: 0,
        intellect: 0,
        armor: 0
      },
      buffs: {
        strengthMult: 1,
        critChanceBonus: 0.05,
        critDamageBonus: 0.5
      }
    },
    combat: {
      currentHP: '',
      maxHP: '',
      currentEnemy: null,
      enemyHP: 0,
      enemyMaxHP: 0,
      enemyRarity: null,
      inBattle: false,
      defeatedEnemies: 0
    },
    pets: [],
    inventory: {
      'heal-pot': 3,
      'power-pot': 3,
      'iron-pants': 1,
      'iron-boots': 1
    },
    equipped: {
      head: null,
      chest: null,
      legs: null,
      feet: null,
      weapon: null
    }
  };

  const maxHP = getMaxHP(profile);
  profile.combat.currentHP = maxHP;
  profile.combat.maxHP = maxHP;

  savePlayer(userId, profile);
  return profile;
}

function hasAccess(profile, type) {
  if (!profile) return false;
  switch (type) {
    case 'dev': return profile.isDev === true;
    case 'mod': return profile.isMod === true || profile.isDev === true;
    case 'player': return true;
    default: return false;
  }
}

function giveItem(profile, itemId, qty = 1) {
  if (!profile.inventory) profile.inventory = {};
  profile.inventory[itemId] = (profile.inventory[itemId] || 0) + qty;
}

function removeItem(profile, itemId, qty = 1) {
  if (!profile.inventory?.[itemId]) return false;
  profile.inventory[itemId] -= qty;
  if (profile.inventory[itemId] <= 0) delete profile.inventory[itemId];
  return true;
}

module.exports = {
  createNewProfile,
  getPlayerPath,
  savePlayer,
  loadPlayer,
  hasAccess,
  calculateTotalStat,
  getMaxHP,
  getEffectiveLevel,
  getEffectiveStat,
  getEffectiveBuff,
  giveItem,
  removeItem,
  getGearStats
};
