const { MessageFlags } = require('discord.js');
const { generateProfileEmbed } = require('../embeds/profile.js');
const { loadPlayer } = require('../utils/playerUtils.js');

module.exports = async function handleInteraction(interaction) {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'attack') {
    const attackCmd = require('../commands/attack.js');
    await attackCmd.execute(interaction);
  }

  else if (interaction.customId === 'profile') {
    const userId = interaction.user.id;
    const profile = loadPlayer(userId);
    if (!profile) return interaction.reply(
      { content: "Profile not found.",
         flags: MessageFlags.Ephemeral });

    const embed = generateProfileEmbed(profile);
    return interaction.reply({
       embeds: [embed],
       flags: MessageFlags.Ephemeral });
  }

  else if (interaction.customId === 'revive') {
         const reviveCmd = require('../commands/revive.js');
         await reviveCmd.execute(interaction)
         
  };
};
