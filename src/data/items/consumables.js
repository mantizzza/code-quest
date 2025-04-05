const consumables = {
    'heal-pot': {
      id: 'heal-pot',  
      name: 'Health Potion',
      type: 'consumable',
      description: 'Restores health.',
      effect: 'heal',
      value: 25,
      flags: ['usable', 'consumable', 'global'],
      weight: 5,
      icon: '<:curse4:1355760732456620223>'
    },

    'heat-preserver': {
        id: 'heat-preserver',
        name: 'Heat Preserver',
        type: 'consumable',
        description: 'Prevents your heat from dropping after your next death.',
        effect: 'preserveHeat',
        value: 1,
        flags: ['usable', 'consumable', 'global'],
        weight: 1,
        icon: '<:curse1:1355760778728308736>'
    },

    'str-pot': {
        id: 'str-pot',
        name: 'Strength Potion',
        type: 'consumable',
        description: 'Increases Strength by 25%.',
        effect: 'buffStr',
        value: 25,
        flags: ['usable', 'consumable', 'global'],
        weight: 3,
        icon: '<:curse6:1355760762823508079>'
    },

    'agi-pot': {
        id: 'agi-pot',
        name: 'Speed Potion',
        type: 'consumable',
        description: 'Increases agility by 25%.',
        effect: 'buffAgi',
        value: 25,
        flags: ['usable', 'consumable', 'global'],
        weight: 3,
        icon: '<:curse9:1355760809287880734>'
    },

    'arm-pot': {
        id: 'arm-pot',
        name: 'Armor Potion',
        type: 'consumable',
        description: 'Increases armor by 25%.',
        effect: 'buffArmor',
        value: 25,
        flags: ['usable', 'consumable', 'global'],
        weight: 3,
        icon: '<:curse2:1355760791583723550>'
    },

    'power-pot': {
        id: 'power-pot',
        name: 'Power Potion',
        type: 'consumable',
        description: 'Increases strength, agility, and armor by 25%.',
        effect: 'buffStats',
        value: 25,
        flags: ['usable', 'consumable', 'global'],
        weight: 1,
        icon: '<:curse5mod2:1355760746134507732>'
    },
    
};

module.exports = {
    ...consumables,
    allConsumables: Object.values(consumables),
  };