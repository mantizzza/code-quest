const { getEnemyFromLocation } = require('../utils/spawning.js');


function ensureEnemy(profile) {
  if (!profile.combat.currentEnemy || profile.combat.enemyHP <= 0) {
    const enemy = getEnemyFromLocation(profile);
    console.log("🔍 Attempting to spawn enemy:", enemy);
    if (!enemy) return profile;

    profile.combat.currentEnemy = enemy;
    profile.combat.enemyHP = enemy.stats.maxHP;
    profile.combat.enemyMaxHP = enemy.stats.maxHP;
    profile.combat.inBattle = true;
  }

  return profile;
}


module.exports = { ensureEnemy };