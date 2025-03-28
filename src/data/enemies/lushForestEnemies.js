const { generateStats } = require('../../utils/scaling.js');

module.exports = {
  location: 'Lush Forest',
  enemies: {
    WildHog: {
      base: {
        name: "Wild Hog",
        level: 7,
        rarity: 'base',
        stats: generateStats(7),
        loot: ["Boar Hide", "Tusks"]
      },
      elite: {
        name: "Snarlhide",
        level: 9,
        rarity: 'elite',
        stats: generateStats(9, 'elite', 'spiky'),
        loot: ["Hardened Tusk", "Snarling Hide"]
      },
      boss: {
        name: "Rootrot, the Festering Boar",
        level: 11,
        rarity: 'boss',
        stats: generateStats(11, 'boss', null, ['spiky', 'diseaseAura']),
        loot: ["Festering Heart", "Boar King's Crown"]
      }
    },

    Sapspitter: {
      base: {
        name: "Sapspitter",
        level: 5,
        rarity: 'base',
        stats: generateStats(5),
        loot: ["Sticky Resin", "Sapling Fang"]
      },
      elite: {
        name: "Thornspitter",
        level: 7,
        rarity: 'elite',
        stats: generateStats(5, 'elite', 'poisonedSpit'),
        loot: ["Venom Gland", "Thorned Scales"]
      },
      boss: {
        name: "Vilethorn, the Sapfang Tyrant",
        level: 9,
        rarity: 'boss',
        stats: generateStats(7, 'boss', null, ['poisonedSpit', 'toxicCloud']),
        loot: ["Sapfang Crown", "Toxic Core"]
      }
    },

    Barkbiter: {
      base: {
        name: "Barkbiter",
        level: 1,
        rarity: 'base',
        stats: generateStats(4),
        loot: ["Gnawed Bark", "Chewed Vines"]
      },
      elite: {
        name: "Grovesnarl",
        level: 3,
        rarity: 'elite',
        stats: generateStats(6, 'elite', 'woodArmor'),
        loot: ["Splintered Husk", "Snarled Root"]
      },
      boss: {
        name: "Trunktusk, the Forest Maw",
        level: 5,
        rarity: 'boss',
        stats: generateStats(8, 'boss', null, ['woodArmor', 'biteFrenzy']),
        loot: ["Forest Maw Core", "Warden's Bark"]
      }
    },

    Thornscratcher: {
      base: {
        name: "Thornscratcher",
        level: 3,
        rarity: 'base',
        stats: generateStats(3),
        loot: ["Bristled Feather", "Sharp Quill"]
      },
      elite: {
        name: "Shriekplume",
        level: 5,
        rarity: 'elite',
        stats: generateStats(5, 'elite', 'piercingCry'),
        loot: ["Echo Quill", "Plumed Talon"]
      },
      boss: {
        name: "Needlenight, the Thorned Warden",
        level: 7,
        rarity: 'boss',
        stats: generateStats(7, 'boss', null, ['piercingCry', 'poisonBarbs']),
        loot: ["Thorned Crest", "Blackwing Spikes"]
      }
    },

    TimberCub: {
      base: {
        name: "Timber Cub",
        level: 9,
        rarity: 'base',
        stats: generateStats(4),
        loot: ["Cub Claw", "Mossy Hide"]
      },
      elite: {
        name: "Grimwood Cub",
        level: 11,
        rarity: 'elite',
        stats: generateStats(6, 'elite', 'toughHide'),
        loot: ["Grim Pelt", "Chipped Fang"]
      },
      boss: {
        name: "Mawroot, the Verdant Terror",
        level: 13,
        rarity: 'boss',
        stats: generateStats(8, 'boss', null, ['toughHide', 'maulRush']),
        loot: ["Verdant Emblem", "Mawroot Talon"]
      }
    }
  }
};
