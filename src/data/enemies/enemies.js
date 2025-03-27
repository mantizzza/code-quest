const { generateStats } = require('../../utils/scaling');

module.exports = {
  LushForest: {
    WildHog: {
      base: {
        name: "Wild Hog",
        ...generateStats(4)
      },
      elite: {
        name: "Snarlhide",
        ...generateStats(6, 'elite', 'spiky')
      },
      boss: {
        name: "Rootrot, the Festering Boar",
        ...generateStats(8, 'boss', null, ['spiky', 'diseaseAura'])
      }
    }
  }
};
