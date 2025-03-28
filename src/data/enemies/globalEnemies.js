const { generateStats } = require('../../utils/scaling');

module.exports = {
  location: 'Global',
  enemies: {
    LootGoblin: {
      event: (playerLevel = 1) => ({
        name: 'Loot Goblin',
        level: playerLevel,
        rarity: 'event',
        stats: generateStats(playerLevel),
        traits: ['loaded', 'swift'],
        loot: ['Gold Pouch', 'Treasure Map']
      })
    }
  }
};
