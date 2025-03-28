
const { loadPlayer } = require('../utils/playerUtils.js');
const { generateProfileEmbed } = require('../embeds/profile.js');

module.exports = {
  name: 'profile',
  description: 'View your character profile',
  async execute(message) {
    const userId = message.author.id;
    const profile = loadPlayer(userId);

    if (!profile) {
      return message.channel.send(`❌ You don't have a character yet. Type \`!start\` to begin.`);
    }

    const xpDisplay = profile.levelXP
      ? `${profile.levelXP.current} / ${profile.levelXP.needed}`
      : `${profile.xp || 0} / ???`;

    const embed = generateProfileEmbed(profile, xpDisplay);
    message.channel.send({ embeds: [embed] });
  }
};
