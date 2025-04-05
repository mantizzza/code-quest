const { allEquipment } = require('../data/equipment.js');

// Helper to randomly pick an item from an array
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Determines if equipment is dropped based on enemy rarity
function isEquipmentDropped(enemyRarity) {
  if (enemyRarity === 'base' && Math.random() < 0.5) return 'base';
  if (enemyRarity === 'elite' && Math.random() < 0.75) return 'elite';
  if (enemyRarity === 'boss' && Math.random() < 0.9) return 'boss';
  return 'no';
}

// Determines the rarity of the item being dropped
function determineEquipmentRarity(lootDropped) {
  if (lootDropped === 'base') {
    return Math.random() < 0.75 ? 'common' : 'uncommon';
  }
  if (lootDropped === 'elite') {
    return Math.random() < 0.75 ? 'uncommon' : 'rare';
  }
  if (lootDropped === 'boss') {
    return Math.random() < 0.75 ? 'rare' : 'boss';
  }
  return 'none';
}

// Filters the equipment pool by flags
function getLootPool(requiredFlags) {
  return allEquipment.filter(item =>
    requiredFlags.every(flag => item.flags.includes(flag))
  );
}

// Master function to determine what loot (if any) the enemy drops
function getRandomLoot(profile) {
  const enemy = profile.combat.currentEnemy;
  const enemyRarity = enemy.rarity;
  const location = profile.location;

  const lootDropped = isEquipmentDropped(enemyRarity);
  if (lootDropped === 'no') return null;

  const equipmentRarity = determineEquipmentRarity(lootDropped);
  if (equipmentRarity === 'none') return null;

  // Boss override: drop the boss-specific loot directly
  if (equipmentRarity === 'boss' && enemy.loot) {
    return enemy.loot;
  }

  const lootPool = getLootPool([location, equipmentRarity]);
  return pickRandom(lootPool);
}

module.exports = {
  getRandomLoot,
  isEquipmentDropped,
  determineEquipmentRarity,
  getLootPool,
  pickRandom
};
