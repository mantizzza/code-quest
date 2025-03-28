
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

  // Patch old profiles to support levelXP
  if (!profile.levelXP) {
    profile.levelXP = {
      current: profile.xp || 0,
      needed: getXPForLevel(profile.level || 1)
    };
  }
   // 🧠 Auto-flag devs
   if (DEV_IDS.includes(userId)) {
    profile.isDev = true;
  }

  return profile;
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
      currentHP: 100,
      maxHP: 100,
      currentEnemy: null,
      enemyHP: 0,
      enemyMaxHP: 0,
      enemyRarity: null,
      inBattle: false,
      defeatedEnemies: 0
    },

    pets: [],
    inventory: []
  };



  const savePath = path.join(__dirname, '../players', `${userId}.json`);
  fs.writeFileSync(savePath, JSON.stringify(profile, null, 2));
  return profile;
}

function hasAccess(profile, type) {
  if (!profile) return false;

  switch (type) {
    case 'dev':
      return profile.isDev === true;
    case 'mod':
      return profile.isMod === true || profile.isDev === true; // devs get mod powers too
    case 'player':
      return true;
    default:
      return false;
  }
}

module.exports = { 
  createNewProfile,
  getPlayerPath,
  savePlayer,
  loadPlayer,
  hasAccess
};
