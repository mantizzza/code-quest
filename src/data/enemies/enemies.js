const fs = require('fs');
const path = require('path');

const enemiesDir = __dirname;
const allLocationEnemies = {};

fs.readdirSync(enemiesDir).forEach(file => {
  if (
    file !== 'enemies.js' &&
    file !== 'raidEnemies.js' &&
    file.endsWith('.js')
  ) {
    const enemyData = require(path.join(enemiesDir, file));
    if (enemyData?.location && enemyData?.enemies) {
      allLocationEnemies[enemyData.location] = enemyData.enemies;
    }
  }
});

module.exports = allLocationEnemies;