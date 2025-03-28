require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const loadCommands = require('./utils/commandLoader');
const { loadPlayer, hasAccess } = require('./utils/playerUtils');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


loadCommands(client, path.join(__dirname, 'commands'), process.env.DEV_MODE === 'true');


const prefix = '!';

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  const profile = loadPlayer(message.author.id);
  if (!profile) {
    return message.reply("⚠️ You don't have a profile yet. Try using `!reset` or another command first.");
  }

  // 🔐 Check access using profile flags
  if (command.devOnly && !hasAccess(profile, 'dev')) {
    return message.reply("🛑 This command is restricted to developers.");
  }

  if (command.modOnly && !hasAccess(profile, 'mod')) {
    return message.reply("🚫 This command is restricted to moderators.");
  }

  try {
    await command.execute(message, args, profile); // Optionally pass profile to commands
  } catch (err) {
    console.error("🔥 Command error:", err);
    message.channel.send('⚠️ Something went wrong executing that command.');
  }
});


//Handles button clicks
const handleInteraction = require('./events/interactionHandler.js');
client.on('interactionCreate', handleInteraction);

client.once('ready', async() => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`🆔 Bot ID: ${client.user.id}`);
   
  // Force update username and avatar (if you just changed it on the portal)
    try {
      await client.user.setUsername('mantizzza quest');
      // Optional: if you've uploaded a new icon:
      // await client.user.setAvatar('./assets/botIcon.png');
      console.log("🔄 Bot username synced with Discord Developer Portal.");
    } catch (err) {
      console.warn("⚠️ Failed to update bot username/icon. Maybe rate-limited?");
    }
});


client.login(token);
