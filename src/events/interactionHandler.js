
const { generateProfileEmbed } = require('../embeds/profile.js');
const { loadPlayer } = require('../utils/playerUtils.js');

module.exports = async function handleInteraction(interaction) {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'attack_button') {
    const attackCmd = require('../commands/attack.js');
    await attackCmd.execute(interaction);
  }

  if (interaction.customId === 'profile_button') {
    const userId = interaction.user.id;
    const profile = loadPlayer(userId);
    if (!profile) return interaction.reply({ content: "Profile not found.", ephemeral: true });

    const embed = generateProfileEmbed(profile);
    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
