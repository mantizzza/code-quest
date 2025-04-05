
const { loadPlayer } = require('../utils/playerUtils');
const { generateProfileEmbed } = require('../embeds/profile.js');
const { aliases } = require('./inventory.js');

module.exports = {
  name: 'profile',
  aliases: ['stats', 'prof'],
  description: 'View your character profile',
  async execute(message) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);

    if (!profile) {
      return message.channel.send(`❌ You don't have a character yet. Type \`!start\` to begin.`);
    }

    const embed = generateProfileEmbed(profile);
message.channel.send({ embeds: [embed] });

  }
};
