const { loadPlayer, savePlayer } = require('../../utils/playerUtils');

module.exports = {
  name: 'godmode',
  description: 'Edit your stats/level for testing. Usage: !godmode level 10 strength 20',
  devOnly : true,
  async execute(message, args) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);
    if (!profile) return message.channel.send("❌ You don't have a character yet.");

    for (let i = 0; i < args.length; i += 2) {
      const key = args[i].toLowerCase();
      const value = parseInt(args[i + 1]);

      if (isNaN(value)) continue;

      switch (key) {
        case 'level':
          profile.level = value;
          break;
        case 'gold':
          profile.gold = value;
          break;
        case 'xp':
          profile.xp = value;
          break;
        case 'strength':
        case 'stamina':
        case 'agility':
        case 'intellect':
        case 'armor':
          profile.stats.base[key] = value;
          break;
        default:
          // Ignore unknown keys
          break;
      }
    }

    savePlayer(userId, profile);
    message.channel.send(`💻 Godmode activated. Your profile has been updated.`);
  }
};