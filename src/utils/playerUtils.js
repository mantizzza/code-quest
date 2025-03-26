const fs = require('fs');
const path = require('path');
const playerPath = path.join(__dirname, '..', 'players');

function getProfilePath(userId) {
  return path.join(playerPath, `${userId}.json`);
}

function loadPlayer(userId) {
  const profilePath = getProfilePath(userId);
  if (!fs.existsSync(profilePath)) return null;
  return JSON.parse(fs.readFileSync(profilePath));
}

function savePlayer(userId, profile) {
  const profilePath = getProfilePath(userId);
  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));
}

function createNewProfile(userId, username) {
  return {
    id: userId,
    name: username,
    location: {
      current: 'Lush Forest',
      unlocked: ['Lush Forest']
    },
    prestige: 0,
    level: 1,
    xp: 0,
    gold: 0,
    altarLevel: 0,
    explorerPoints: 0,
    questsCompleted: 0,
    stats: {
      stamina: 10,
      strength: 10,
      strengthBonus: 0,
      agility: 10,
      intellect: 10,
      spellDamageBonus: 0,
      armor: 10,
      critDamage: 0.2,
      critChance: 0.05
    },
    combat: {
      currentHP: 100,
      maxHP: 10 * 5,
      currentEnemy: null,
      enemyHP: 0,
      enemyMaxHP: 0,
      inBattle: false,
      defeatedEnemies: 0
    },
    cooldowns: {
      attack: 0,
      crates: 0,
      vote: 0,
      runes: 0,
      profession1: 0,
      profession2: 0,
      petAttack: 0,
      crateClaim: 0,
      raid: 0,
      duel: 0
    },
    pets: [],
    inventory: [],
  };
}

module.exports = {
  loadPlayer,
  savePlayer,
  createNewProfile
};
