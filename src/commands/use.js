const { loadPlayer, savePlayer } = require('../utils/playerUtils');
const { getItemById, isConsumable, isEquippable } = require('../utils/itemUtils');

module.exports = {
  name: 'use',
  description: 'Use an item from your inventory. Example: !use healing potion',
  async execute(message, args) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);
    if (!profile) return message.channel.send("❌ You don't have a character yet.");

    const input = args.join(' ').toLowerCase();
    if (!input) {
      return message.channel.send('⚠️ Please specify an item to use.\nExample: `!use healing potion`');
    }

    const inventoryEntries = Object.entries(profile.inventory || {});
    const match = inventoryEntries.find(([id]) => getItemById(id)?.name?.toLowerCase().includes(input));

    if (!match) {
      return message.channel.send("⚠️ Couldn't find that item in your inventory.");
    }

    const [itemId, quantity] = match;
    const item = getItemById(itemId);
    if (!item) return message.channel.send("⚠️ Item data is missing.");

    // Handle consumables
    if (isConsumable(item)) {
      // Example: applying effects
      if (item.effect === 'heal') {
        const healAmount = item.value || 20;
        profile.combat.currentHP = Math.min(profile.combat.currentHP + healAmount, profile.combat.maxHP);
        message.channel.send(`❤️ You used **${item.name}** and healed for **${healAmount} HP**.`);
      }
      // Add other effect logic here

      // Decrease quantity or remove item
      profile.inventory[itemId] -= 1;
      if (profile.inventory[itemId] <= 0) {
        delete profile.inventory[itemId];
      }
    }

    // Handle equipment
else if (isEquippable(item)) {
  if (!profile.equipped) profile.equipped = {};
  const slot = item.slot;
  if (!slot) return message.channel.send(`⚠️ This equipment doesn't have a defined slot.`);

  // Swap currently equipped gear into inventory
  const equipped = profile.equipped?.[slot];
  if (equipped) {
    profile.inventory[equipped] = (profile.inventory[equipped] || 0) + 1;
  }

  // Equip new item and remove from inventory
  profile.equipped[slot] = itemId;
  profile.inventory[itemId] -= 1;
  if (profile.inventory[itemId] <= 0) {
    delete profile.inventory[itemId];
  }

  message.channel.send(`🛡️ You equipped **${item.name}** in your **${slot}** slot.`);
}


    else {
      return message.channel.send("⚠️ This item can't be used.");
    }

    savePlayer(userId, profile);
  }
};
