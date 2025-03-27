const fs = require('fs');
const path = require('path');
const { baseStats } = require('../data/playerData/baseStats');

const playersDir = path.join(__dirname, '..', 'players');

// Ensure the directory exists
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
  return JSON.parse(fs.readFileSync(filePath));
}

function createNewProfile(userId, username) {
  const profile = {
    id: userId,
    name: username,
    level: 1,
    xp: 0,
    gold: 0,
    prestige: 0,

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
      currentHP: 100, // placeholder until calculated
      maxHP: 100,     // placeholder until calculated
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

module.exports = { 
  createNewProfile,
  getPlayerPath,
  savePlayer,
  loadPlayer
 };
