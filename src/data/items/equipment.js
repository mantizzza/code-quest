const equipment = {
  //town related gear (stuff you can buy and or craft)
  'iron-pants': {
    id: 'iron-pants',
    name: 'Iron Pants',
    type: 'equipment',
    slot: 'legs',
    stats: { armor: 2 },
    description: 'Basic leg protection. Not fashionable.',
    flags: ['equippable' , 'basic'],
    icon: '🩳'
  },

  'iron-helmet': {
    id: 'iron-helmet',
    name: 'Iron Helmet',
    type: 'equipment',
    slot: 'head',
    stats: { armor: 2 },
    description: 'Basic head protection. Not fashionable.',
    flags: ['equippable' , 'basic'],
    icon: ''
  },

  'iron-chest': {
    id: 'iron-chest',
    name: 'Iron Chest',
    type: 'equipment',
    slot: 'chest',
    stats: { armor: 2 },
    description: 'Basic chest protection. Not fashionable.',
    flags: ['equippable' , 'basic'],
    icon: ''
  },

  'iron-boots': {
    id: 'iron-boots',
    name: 'Iron Boots',
    type: 'equipment',
    slot: 'feet',
    stats: { armor: 2 },
    description: 'Basic foot protection. Not fashionable.',
    flags: ['equippable' , 'basic'],
    icon: ''
  },

  'iron-sword': {
    id: 'iron-sword',
    name: 'Iron Sword',
    type: 'equipment',
    slot: 'weapon',
    stats: { strength: 2 },
    description: 'Definitely a sword.',
    flags: ['equippable' , 'basic'],
    icon: ':sword:'
  },

  'epic-stabs': {
    id: 'epic-stabs',
    name: 'Sword of Epic Stabs',
    type: 'equipment',
    slot: 'weapon',
    stats: { strength: 69, agility: 69, hitChance: 69 },
    description: 'A stabber of epic proportions.',
    flags: ['equippable' , 'epic', 'global'],
    icon: ':sword:'
  },

  //Lush Forest Gear
    // Common Gear
    'sproutwood-dagger': {
      id: 'sproutwood-dagger',
      name: 'Sproutwood Dagger',
      type: 'equipment',
      slot: 'weapon',
      stats: { strength: 5, agility: 2, hit_chance: 3 },
      description: "A quick and light dagger, perfect for swift strikes in the forest's underbrush. The lightweight nature of the wood allows for rapid attacks.",
      flags: ['equippable', 'common', 'Lush Forest'],
      icon: ''
    },
  
    'mossback-tunic': {
      id: 'mossback-tunic',
      name: 'Mossback Tunic',
      type: 'equipment',
      slot: 'chest',
      stats: { armor: 3, stamina: 2 },
      description: "A tunic woven from moss-covered bark, offering modest armor and enhancing stamina for enduring longer fights.",
      flags: ['equippable', 'common', 'Lush Forest'],
      icon: ''
    },
  
    'fernleaf-boots': {
      id: 'fernleaf-boots',
      name: 'Fernleaf Boots',
      type: 'equipment',
      slot: 'feet',
      stats: { armor: 2, agility: 3 },
      description: "Boots made from flexible ferns, designed to allow for quick movement and evasion in the dense underbrush of the forest.",
      flags: ['equippable', 'common', 'Lush Forest'],
      icon: ''
    },
  
    'bramble-pants': {
      id: 'bramble-pants',
      name: 'Bramble Pants',
      type: 'equipment',
      slot: 'legs',
      stats: { armor: 2, stamina: 2 },
      description: "Sturdy pants made from intertwined brambles, offering protection while allowing the wearer to move freely through the forest.",
      flags: ['equippable', 'common', 'Lush Forest'],
      icon: ''
    },
  
    'woodland-hood': {
      id: 'woodland-hood',
      name: 'Woodland Hood',
      type: 'equipment',
      slot: 'head',
      stats: { armor: 2, agility: 1 },
      description: "A hood made from woven vines and leaves, providing light armor while enhancing agility to dodge incoming attacks.",
      flags: ['equippable', 'common', 'Lush Forest'],
      icon: ''
    },
  
    // Uncommon Gear
    'vinewhip-sword': {
      id: 'vinewhip-sword',
      name: 'Vinewhip Sword',
      type: 'equipment',
      slot: 'weapon',
      stats: { strength: 8, agility: 4, critical_chance: 5 },
      description: "A long sword wrapped in thick vines, flexible yet strong, ideal for quick and powerful strikes with added chance for critical hits.",
      flags: ['equippable', 'uncommon', 'Lush Forest'],
      icon: ':sword:'
    },
  
    'barkhide-vest': {
      id: 'barkhide-vest',
      name: 'Barkhide Vest',
      type: 'equipment',
      slot: 'chest',
      stats: { armor: 5, stamina: 3, evasion: 2 },
      description: "A vest crafted from resilient bark, giving extra protection and agility to avoid enemy attacks more easily.",
      flags: ['equippable', 'uncommon', 'Lush Forest'],
      icon: ''
    },
  
    'wildstep-sandals': {
      id: 'wildstep-sandals',
      name: 'Wildstep Sandals',
      type: 'equipment',
      slot: 'feet',
      stats: { armor: 3, agility: 5 },
      description: "Lightweight sandals crafted from natural forest materials, increasing agility and allowing for swift movement across varied terrain.",
      flags: ['equippable', 'uncommon', 'Lush Forest'],
      icon: ''
    },
  
    'thornwoven-bracers': {
      id: 'thornwoven-bracers',
      name: 'Thornwoven Bracers',
      type: 'equipment',
      slot: 'legs',
      stats: { strength: 4, agility: 3, hit_chance: 2 },
      description: "Bracers woven with thorns, enhancing both offensive and defensive capabilities, boosting agility and attack accuracy.",
      flags: ['equippable', 'uncommon', 'Lush Forest'],
      icon: ''
    },
  
    'camouflaged-crown': {
      id: 'camouflaged-crown',
      name: 'Camouflaged Crown',
      type: 'equipment',
      slot: 'head',
      stats: { armor: 3, critical_chance: 2 },
      description: "A crown made from leaves and vines, blending perfectly with the forest environment and improving the wearer’s ability to land critical hits.",
      flags: ['equippable', 'uncommon', 'Lush Forest'],
      icon: ''
    },
  
    // Rare Gear
    'howlingwood-bow': {
      id: 'howlingwood-bow',
      name: 'Howlingwood Bow',
      type: 'equipment',
      slot: 'weapon',
      stats: { strength: 12, agility: 6, critical_damage: 8 },
      description: "A finely crafted bow made from the ancient Howling Tree, perfect for precise shots with enhanced critical damage.",
      flags: ['equippable', 'rare', 'Lush Forest'],
      icon: ':bow_and_arrow:'
    },
  
    'stoneskin-breastplate': {
      id: 'stoneskin-breastplate',
      name: 'Stoneskin Breastplate',
      type: 'equipment',
      slot: 'chest',
      stats: { armor: 8, stamina: 4, evasion: 5 },
      description: "A breastplate made from a mixture of stone and wood, offering significant protection and the ability to evade some attacks.",
      flags: ['equippable', 'rare', 'Lush Forest'],
      icon: ''
    },
  
    'leafbound-greaves': {
      id: 'leafbound-greaves',
      name: 'Leafbound Greaves',
      type: 'equipment',
      slot: 'legs',
      stats: { armor: 6, agility: 5 },
      description: "Greaves made from enchanted leaves, designed to offer excellent armor while enhancing speed and movement.",
      flags: ['equippable', 'rare', 'Lush Forest'],
      icon: ''
    },
  
    'creeping-tendril-gloves': {
      id: 'creeping-tendril-gloves',
      name: 'Creeping Tendril Gloves',
      type: 'equipment',
      slot: 'weapon',
      stats: { strength: 7, agility: 3, critical_chance: 2 },
      description: "Gloves infused with the essence of creeping vines, improving the wearer’s grip, strength, and critical hit potential.",
      flags: ['equippable', 'rare', 'Lush Forest'],
      icon: ''
    },
  
    'ancient-grove-circlet': {
      id: 'ancient-grove-circlet',
      name: 'Ancient Grove Circlet',
      type: 'equipment',
      slot: 'head',
      stats: { armor: 5, hit_chance: 3 },
      description: "A circlet forged from the wood of ancient trees, granting both armor and improved accuracy in battle.",
      flags: ['equippable', 'rare', 'Lush Forest'],
      icon: ''
    },
  
    // Boss Set Gear
    'wyrmwood-greatsword': {
      id: 'wyrmwood-greatsword',
      name: 'Wyrmwood Greatsword',
      type: 'equipment',
      slot: 'weapon',
      stats: { strength: 20, agility: 8, critical_chance: 10, hit_chance: 10 },
      description: "A massive, powerful sword made from the sacred Wyrmwood Tree, designed for devastating strikes with high critical hit potential and a high chance to land hits.",
      flags: ['equippable', 'boss', 'Lush Forest'],
      icon: ':sword:'
    },
  
    'elderwood-plate': {
      id: 'elderwood-plate',
      name: 'Elderwood Plate',
      type: 'equipment',
      slot: 'chest',
      stats: { armor: 12, stamina: 6, evasion: 5, health_regeneration: 4 },
      description: "A chest plate crafted from the oldest trees in the forest, offering unparalleled protection and a natural regeneration of health after every battle.",
      flags: ['equippable', 'boss', 'Lush Forest'],
      icon: ''
    },
  
    'foreststride-boots': {
      id: 'foreststride-boots',
      name: 'Foreststride Boots',
      type: 'equipment',
      slot: 'feet',
      stats: { armor: 10, agility: 7, movement_speed: 5 },
      description: "Boots forged from the very essence of the forest, giving exceptional armor, speed, and allowing for rapid movement across terrain.",
      flags: ['equippable', 'boss', 'Lush Forest'],
      icon: ''
    },
  
    'thornmantle-leggings': {
      id: 'thornmantle-leggings',
      name: 'Thornmantle Leggings',
      type: 'equipment',
      slot: 'legs',
      stats: { strength: 10, agility: 5, critical_damage: 6 },
      description: "Leggings made from thorn-covered vines, designed to enhance strength, agility, and critical hit damage when in combat.",
      flags: ['equippable', 'boss', 'Lush Forest'],
      icon: ''
    },
  
    'sylvan-crown': {
      id: 'sylvan-crown',
      name: 'Sylvan Crown',
      type: 'equipment',
      slot: 'head',
      stats: { armor: 8, evasion: 5, critical_chance: 4 },
      description: "A crown crafted from the heart of the forest, providing supreme protection, the ability to dodge attacks, and enhancing your chances to land critical hits.",
      flags: ['equippable', 'boss', 'Lush Forest'],
      icon: ''
    }
  };
  
  module.exports = {
    ...equipment,
    allEquipment: Object.values(equipment),
  };