const { generateStats } = require('../../utils/scaling');

module.exports = {
  location: 'Global',
  enemies: {
    LootGoblin: {
      event: (playerLevel = 1) => ({
        name: 'Loot Goblin',
        level: playerLevel,
        stats: generateStats(playerLevel, 'event', ['loaded', 'swift']),
        loot: ['Gold Pouch' , 'Treasure Map'],
        image: "https://cdn.discordapp.com/attachments/1355442332186574961/1355452870476173363/loot_goblin_2.png?ex=67e8fb5b&is=67e7a9db&hm=cc844e9fbaed996eb35450c089d7ba7d4dd333e09ac39bcdc528c856bbb1c872&"
      })
    }
  }
};
