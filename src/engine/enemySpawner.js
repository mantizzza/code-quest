const { getRandomEnemyFromLocation } = require('../utils/spawning');

function ensureEnemy(profile) {
  const location = profile.location.current;
  const level = profile.level;
  const heat = profile.location.heat || 0;

  // Only spawn if no enemy or previous one is dead
  if (!profile.combat.currentEnemy || profile.combat.enemyHP <= 0) {
    const enemy = getRandomEnemyFromLocation(location, level, heat);

    if (!enemy) {
      console.error("❌ No valid enemy found for", location, "lvl", level, "heat", heat);
      return profile;
    }

    profile.combat.currentEnemy = enemy.name;
    profile.combat.enemyHP = enemy.maxHP;
    profile.combat.enemyMaxHP = enemy.maxHP;
    profile.combat.enemyRarity = enemy.rarity; // NEW: store rarity
    profile.combat.inBattle = true;
  }

  return profile;
}

module.exports = { ensureEnemy };
