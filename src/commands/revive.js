const { loadPlayer, savePlayer } = require('../utils/playerUtils.js');

module.exports = {
  name: 'revive',
  description: 'Revive yourself after death.',
  async execute(message) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);

    if (!profile) {
      return message.channel.send(`❌ You don't have a character. Use \`!start\` to begin.`);
    }

    if (profile.combat.currentHP > 0) {
      return message.channel.send(`❗ You're already alive! No need to revive.`);
    }

    profile.combat.currentHP = profile.combat.maxHP;
    savePlayer(userId, profile);

    message.channel.send(`✨ You have been revived to full health: **${profile.combat.currentHP}/${profile.combat.maxHP}**.`);
  }
};
