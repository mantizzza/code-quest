const allEnemies = require('../data/enemies/enemies');

// 🔥 Determines what rarity of enemy should spawn based on the current heat level
function getEnemyRarity(heat = 1) {
  if (heat >= 5 && Math.random() < parseFloat(0.02 * heat).toFixed(2)) return 'boss';
  if (heat >= 3 && Math.random() < parseFloat(0.05 * heat).toFixed(2)) return 'elite';
  if (heat >= 0 && Math.random() < parseFloat(0.01 * heat + 0.01).toFixed(2)) return 'event'; // Ensures minimum 1% chance
  return 'base';
}

// 🧠 Pulls all enemies from the current location *plus* any global enemies
// Then filters out only those of the correct rarity and level range
function getEligibleEnemies(location, playerLevel, heat, rarityToSpawn = 'base') {
  const locationEnemiesObj = allEnemies[location] || {};
  const globalEnemiesObj = allEnemies["Global"] || {};

  const locationEnemies = Object.values(locationEnemiesObj);
  const globalEnemies = Object.values(globalEnemiesObj);
  const locationData = [...locationEnemies, ...globalEnemies];

  const eligible = [];

  console.log(`🎯 Checking rarity: ${rarityToSpawn}`);

  for (const family of locationData) {
    const template = family[rarityToSpawn];
    if (!template) continue;

    const enemy = typeof template === 'function' ? template(playerLevel) : template;
    const levelDifference = Math.abs(enemy.level - playerLevel);
    const skipLevelCheck = rarityToSpawn === 'event';

    console.log(`🔎 Found ${enemy.name} | Level: ${enemy.level} | Player Level: ${playerLevel} | Diff: ${levelDifference}`);

    if (skipLevelCheck || levelDifference <= 3) {
      eligible.push(enemy);
    }
  }

  console.log("✅ Eligible enemies:", eligible.map(e => e.name));
  return eligible;
}

// 🎯 Final selection logic that picks a random eligible enemy (with fallback to event rarity)
function getEnemyFromLocation(profile) {
  const location = profile.location.current;
  const playerLevel = profile.level;
  const heat = profile.location.heat || 0;

  const rarity = getEnemyRarity(heat);
  let candidates = getEligibleEnemies(location, playerLevel, heat, rarity);

  if (candidates.length === 0 && rarity !== 'event') {
    console.log(`⚠️ No ${rarity} enemies found. Trying event enemies...`);
    candidates = getEligibleEnemies(location, playerLevel, heat, 'event');
  }

  if (candidates.length === 0) {
    console.log(`❌ No eligible enemies found at all.`);
    return null;
  }

  const selected = candidates[Math.floor(Math.random() * candidates.length)];
  console.log(`🔍 Attempting to spawn enemy: ${selected.name}`);
  return selected;
}

module.exports = { getEnemyFromLocation, getEnemyRarity };
