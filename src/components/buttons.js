// components/buttons.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function getButtons({ showAttack = true, showRevive = false, showProfile = true } = {}) {
  const row = new ActionRowBuilder();

  if (showAttack) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId('attack')
        .setLabel('⚔️ Attack')
        .setStyle(ButtonStyle.Primary)
    );
  }

  if (showRevive) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId('revive')
        .setLabel('❤️ Revive')
        .setStyle(ButtonStyle.Success)
    );
  }

  if (showProfile) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId('profile')
        .setLabel('📊 Profile')
        .setStyle(ButtonStyle.Secondary)
    );
  }

  return [row];
}


const buttons = getButtons({ showAttack: true, showRevive: true, showProfile: true });
const noRevive = getButtons({ showAttack: true, showRevive: false, showProfile: true });
const noAttack = getButtons({ showAttack: false, showRevive: true, showProfile: true });

module.exports = {
  getButtons,
  buttons,
  noRevive,
  noAttack,

};
