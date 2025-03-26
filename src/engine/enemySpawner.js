const enemies = require('../data/enemies/enemies.js');
const locations = require('../data/locations/locations.js');

//Choose enemy for player based on location
function ensureEnemy(profile, locationsData, enemiesData) {
    const currentLocation = profile.location.current;
    const locationInfo = locationsData[currentLocation];
  
    if (!locationsData[currentLocation]) {
      console.error("🚨 Invalid location:", currentLocation);
      console.error("🧭 Available locations:", Object.keys(locationsData));
    }
    
    // If there's no enemy or the last one died, pick a new one
    if (!profile.combat.currentEnemy || profile.combat.enemyHP <= 0) {
      const enemyName = locationInfo.enemies[Math.floor(Math.random() * locationInfo.enemies.length)];
      const enemyStats = enemiesData[enemyName];
  
      profile.combat.currentEnemy = enemyName;
      profile.combat.enemyHP = enemyStats.maxHP;
      profile.combat.enemyMaxHP = enemyStats.maxHP;
      profile.combat.inBattle = true;
    }
  
    return profile;
  }

  module.exports = { ensureEnemy };