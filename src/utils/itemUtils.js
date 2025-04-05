const allItems = require('../data/items/allItems.js');
const allEquipment = require('../data/items/equipment.js')
const allConsumables = require('../data/items/consumables.js')

function getItemById(id) {
  return allItems[id] || null;
}



function isUsable(item) {
  return item?.flags?.includes('usable');
}

function isEquippable(item) {
  return item?.flags?.includes('equippable');
}

function isConsumable(item) {
  return item?.flags?.includes('consumable');
}

function addItemToInventory(profile, itemId, quantity = 1) {
  if (!profile.inventory) profile.inventory = {};

  if (profile.inventory[itemId]) {
    profile.inventory[itemId] += quantity;
  } else {
    profile.inventory[itemId] = quantity;
  }
}

const rarityEmojis = {
  common: '⚪',
  uncommon: '🟢',
  rare: '🔵',
  epic: '🟣',
  boss: '🔴'
};

const locationEmojis = {
  'Lush Forest': '🌿',
  'Frostpine Expanse': '❄️',
  'Ashen Cradle': '🔥',
  'Skyreach Plateau': '⛰️',
  'global': '🌐'
};

function itemDisplay(drop) {
  const item = getItemData(drop);
  if (!item) return '❓ Unknown Item';

  const rarity = item.rarity?.toLowerCase();
  const rarityEmoji = rarityEmojis[rarity] || '❓';

  const locationFlag = item.flags?.find(f => locationEmojis[f]);
  const locationEmoji = locationEmojis[locationFlag] || '';

  const qty = drop.quantity ?? 1;
  const baseName = `${rarityEmoji}${locationEmoji} ${item.name}`;
  return qty > 1 ? `${qty}x ${baseName}` : baseName;
}


function getItemData(drop) {
  if (drop.type === 'equipment') return allEquipment.find(i => i.id === drop.id);
  if (drop.type === 'consumable') return allConsumables.find(i => i.id === drop.id);
  // Add materials, trinkets, etc. as needed
  return null;
}


module.exports = {
  getItemById,
  isUsable,
  isEquippable,
  isConsumable,
  addItemToInventory,
  itemDisplay
};
