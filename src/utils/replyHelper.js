
const { MessageFlags } = require('discord.js');

async function reply(input, data) {
  if (data.ephemeral) {
    // Replace with proper flags
    data.flags = MessageFlags.Ephemeral;
    delete data.ephemeral;
  }

  if (input.reply) {
    return input.reply(data);
  } else if (input.channel) {
    return input.channel.send(data.content);
  }
}

module.exports = {reply}