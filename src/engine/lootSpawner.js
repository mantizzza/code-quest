const { allEquipment } = require('../data/items/equipment.js');
//const { allMaterials } = require('../data/materials.js');
const { allConsumables } = require('../data/items/consumables.js');
//const { allTrinkets } = require('../data/trinkets.js'); // Optional future use
const enableMaterials = false;
const enableConsumables = true;
const enableTrinkets = false;

console.log('Loaded consumables:', allConsumables?.length ?? '❌ MISSING');

/**
 * Weighted random selector
 * if no weight is available, just chooses the loot randomly
 */
function weightedRandom(pool) {
    const hasWeights = pool.some(item => typeof item.weight === 'number');
    if (!hasWeights) {
      console.log('🎲 No weights found — using uniform random.');
      return pickRandom(pool);
    }
  
    const totalWeight = pool.reduce((sum, item) => sum + (item.weight ?? 0), 0);
    let randomWeight = Math.random() * totalWeight;
  
    for (const item of pool) {
      const weight = item.weight ?? 0;
      if (randomWeight < weight) {
        console.log(`🎯 Weighted pick: "${item.id}" (weight: ${weight}, rolled: ${randomWeight.toFixed(2)} / ${totalWeight})`);
        return item;
      }
      randomWeight -= weight;
    }
  
    console.warn('⚠️ weightedRandom fell through — returning null.');
    return null;
  }
  
  

/**
 * Helper to randomly pick an item from an array
 */
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// EQUIPMENT LOOT ---------------------------

function isEquipmentDropped(rarity) {
  if (rarity === 'base' && Math.random() < 0.5) return 'base';
  if (rarity === 'elite' && Math.random() < 0.75) return 'elite';
  if (rarity === 'boss' && Math.random() < 1.0) return 'boss';
  if (rarity === 'global' && Math.random() < 0.8) return 'global';
  return 'no';
}

function determineEquipmentRarity(tier) {
  if (tier === 'base') return Math.random() < 0.75 ? 'common' : 'uncommon';
  if (tier === 'elite') return Math.random() < 0.75 ? 'uncommon' : 'rare';
  if (tier === 'boss') return Math.random() < 0.75 ? 'rare' : 'boss';
  if (tier === 'global') return 'global';
  return 'none';
}

function getLootPool(sourceList, requiredFlags) {
    if (!sourceList) {
      console.warn('⚠️ getLootPool called with undefined sourceList.');
      return [];
    }
  
    const pool = sourceList.filter(item =>
      requiredFlags.every(flag => item.flags.includes(flag))
    );
  
    console.log(`🎯 Loot pool filtered with flags [${requiredFlags.join(', ')}]:`, pool.map(i => i.id));
    return pool;
  }
  
  

function getGlobalLootForLevel(enemyLootPool, playerLevel) {
  const filteredPool = enemyLootPool.filter(item => {
    const min = item.minLevel ?? 0;
    const max = item.maxLevel ?? Infinity;
    return playerLevel >= min && playerLevel <= max;
  });
  return filteredPool.length > 0 ? weightedRandom(filteredPool) : null;
}

function getRandomEquipment(profile) {
  const enemy = profile.combat.currentEnemy;
  const tier = isEquipmentDropped(enemy.rarity);
  if (tier === 'no') return null;

  const rarity = determineEquipmentRarity(tier);
  if (rarity === 'none') return null;

  if (rarity === 'boss' && enemy.loot) return enemy.loot;
  if (rarity === 'global' && enemy.loot) {
    return getGlobalLootForLevel(enemy.loot, profile.level);
  }

  const location = profile.location.current;
  const lootPool = getLootPool(allEquipment, [location, rarity]);
  const item = pickRandom(lootPool);
  return item ? { type: 'equipment', id: item.id } : null;
}

// MATERIALS LOOT ---------------------------

function getRandomMaterials(profile) {
  const location = profile.location.current;
  const enemy = profile.combat.currentEnemy;

  const materialPool = getLootPool(allMaterials, [location]);
  const drops = [];

  // Example logic: drop 1–3 materials from the pool, each weighted
  const rolls = Math.floor(Math.random() * 3); // 0 to 2 materials
  for (let i = 0; i < rolls; i++) {
    const item = weightedRandom(materialPool);
    if (item) {
      drops.push({ type: 'material', id: item.id, quantity: item.quantity ?? 1 });
    }
  }

  return drops;
}

// CONSUMABLES LOOT ---------------------------

function getRandomConsumable(profile) {
  const location = profile.location.current;
  const consumablePool = getLootPool(allConsumables, ['global']);

  // Small chance to drop a consumable
  if (Math.random() < 0.15) {
    const item = weightedRandom(consumablePool);
    return item ? { type: 'consumable', id: item.id } : null;
  }

  return null;
}

// TRINKET/RARE DROP LOOT ---------------------------

function getRandomFlavorItem(profile) {
  const location = profile.location.current;
  const trinketPool = getLootPool(allTrinkets, [location]);

  // Very rare drop chance
  if (Math.random() < 0.05) {
    const item = weightedRandom(trinketPool);
    return item ? { type: 'trinket', id: item.id } : null;
  }

  return null;
}

// FINAL WRAPPER FUNCTION ---------------------------

function getLoot(profile) {
    const loot = [];
    console.log('🧪 Generating loot for:', profile.name || profile.id || 'Unknown');
  
    const equipment = getRandomEquipment(profile);
    if (equipment) {
      console.log('🛡️ Equipment dropped:', equipment);
      loot.push(equipment);
    }
  
    if (enableMaterials) {
      console.log('🪨 Materials enabled — rolling...');
      const materials = getRandomMaterials(profile);
      console.log('📦 Material drops:', materials);
      loot.push(...materials);
    }
  
    if (enableConsumables) {
      console.log('🧪 Consumables enabled — rolling...');
      const consumable = getRandomConsumable(profile);
      if (consumable) {
        console.log('🍷 Consumable dropped:', consumable);
        loot.push(consumable);
      }
    }
  
    if (enableTrinkets) {
      console.log('💎 Trinkets enabled — rolling...');
      const trinket = getRandomFlavorItem(profile);
      if (trinket) {
        console.log('🎁 Trinket dropped:', trinket);
        loot.push(trinket);
      }
    }
  
    console.log('🎉 Final loot array:', loot);
    return loot;
  }
  
  
  

module.exports = {
  getLoot,
  getRandomEquipment,
  getRandomMaterials,
  getRandomConsumable,
  getRandomFlavorItem,
  weightedRandom,
  pickRandom,
  getLootPool
};
