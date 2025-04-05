const { loadPlayer } = require('../utils/playerUtils');
const { getItemById } = require('../utils/itemUtils.js')

module.exports = {
  name: 'inventory',
  aliases: ['inv', 'bag', 'items'],
  description: 'Show all items in your inventory',
  async execute(message) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);
    if (!profile) return message.channel.send("❌ You don't have a character yet.");

    const rawInventory = profile.inventory || {};
const items = Object.entries(rawInventory).map(([id, quantity]) => ({
  id,
  quantity
}));

if (items.length === 0) {
  return message.channel.send("🧺 Your inventory is empty.");
}


    // Group items by type
    const categorized = {
      consumable: [],
      equipment: [],
      other: [],
    };

    for (const item of items) {
      const fullItem = getItemById(item.id);
      if (!fullItem) {
        console.warn('Missing item:', item.id);
        continue;
      }
    
      const enrichedItem = {
        ...fullItem,
        quantity: item.quantity,
      };
    
      if (fullItem.type === 'consumable') {
        categorized.consumable.push(enrichedItem);
      } else if (fullItem.type === 'equipment') {
        categorized.equipment.push(enrichedItem);
      } else {
        categorized.other.push(enrichedItem);
      }
    }
    

    for (const itemId in profile.inventory) {
      const item = getItemById(itemId);
      if (!item) {
        console.warn('Missing item:', itemId);
      }
    }
    

    let invText = '';
    for (const [category, list] of Object.entries(categorized)) {
      if (list.length === 0) continue;

      invText += `**${category.charAt(0).toUpperCase() + category.slice(1)}**\n`;
      for (const item of list) {
        invText += `• ${item.name} ×${item.quantity ?? 1} - *${item.description || 'No description'}*\n`;
      }
      invText += '\n';
    }

    return message.channel.send({ content: `📦 **Inventory**\n${invText.trim()}` });
  }
};
