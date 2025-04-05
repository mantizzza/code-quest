const { MessageFlags, Component } = require('discord.js');
const { loadPlayer, savePlayer } = require('../utils/playerUtils.js');
const { reply } = require('../utils/replyHelper.js');
const buttons = require('../components/buttons.js');


module.exports = {
  name: 'revive',
  description: 'Revive yourself after death.',
  async execute(input) {
    const userId = input.user?.id || input.author?.id;
    const profile = loadPlayer(userId);

    if (!profile) {
      return reply(input, {
        content: "❌ You don't have a character. Use \`!start\` to begin.",
        ephemeral: true
      });
    }

    if (profile.combat.currentHP > 0) {
      return reply(input, {
        content: "❗ You are not dead... yet 😉",
        components: buttons.noRevive,
        ephemeral: true
      });
      
    }

    profile.combat.currentHP = profile.combat.maxHP;
    savePlayer(userId, profile);

    return reply(input, {
      content: "✅ You’ve been revived!",
      components: buttons.noRevive,
      ephemeral: true
    });
    
  }
}
