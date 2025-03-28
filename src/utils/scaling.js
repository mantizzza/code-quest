const SCALING = {
    stamVar: 5,
    atkVar: 2,
    agiVar: 3,
    xpVar: 4,
    goldVar: [3, 5],
    eliteMult: 1.25,
    bossMult: 1.5,
  
    hpMods: {
      glass: 0.75,
      beefy: 1.3,
      armored: 1.2
    },
  
    goldMods: {
      loaded: 10
    },

    agiMods: {
      swift: 1.8,
      sluggish: 0.75
    }
  };
  
  function generateStats(level, rarity = 'base', trait = null, traits = []) {
    let rarityMult =
      rarity === 'elite' ? SCALING.eliteMult :
      rarity === 'boss' ? SCALING.bossMult : 1;
  
    let hpMult = rarityMult;
    let goldMult = rarityMult;
    let atkMult = rarityMult;
    let agiMult = rarityMult;
  
    const allTraits = trait ? [trait] : [];
    if (traits && traits.length) allTraits.push(...traits);
  
    allTraits.forEach(t => {
      if (SCALING.hpMods[t]) hpMult *= SCALING.hpMods[t];
      if (SCALING.goldMods[t]) goldMult *= SCALING.goldMods[t];
      // You can add atkMods, xpMods, etc. later
    });
  
    return {
      level,
      maxHP: Math.round(level * SCALING.stamVar * hpMult),
      attack: parseFloat((level * SCALING.atkVar * atkMult).toFixed(1)),
      agility: Math.round(level * SCALING.agiVar * agiMult),
      critChance: 0.05 + (rarity === 'elite' ? 0.02 : rarity === 'boss' ? 0.04 : 0),
      goldDrop: [
        Math.floor(level * SCALING.goldVar[0] * goldMult),
        Math.floor(level * SCALING.goldVar[1] * goldMult)
      ],
      xpDrop: Math.floor(level * SCALING.xpVar * rarityMult),
      trait,
      traits
    };
  }
  
  module.exports = {
    SCALING,
    generateStats
  };
  