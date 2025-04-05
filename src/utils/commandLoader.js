const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');
const { loadProfile, hasAccess } = require('../utils/playerUtils');

function walkSync(dir, fileList = [], isDev = false) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    //if (file.name === 'devCommands' && !isDev) continue;

    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      walkSync(fullPath, fileList, isDev);
    } else if (file.name.endsWith('.js')) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}




function loadCommands(client, baseCommandPath, isDev = false) {
  const commandFiles = walkSync(baseCommandPath, [], isDev);
  client.commands = new Collection();

  for (const file of commandFiles) {
    const command = require(file);
    if (!command.name || typeof command.execute !== 'function') {
      console.warn(`⚠️ Skipping invalid command file: ${file}`);
      continue;
    }

    client.commands.set(command.name, command);
    // handles aliases?
      client.commands.set(command.name, command);
      if (command.aliases) {
  command.aliases.forEach(alias => client.commands.set(alias, command));
}

  }

  console.log(`✅ Loaded ${client.commands.size} commands`);
}

module.exports = loadCommands;
