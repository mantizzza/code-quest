const SCALING = {
    stamVar: 15,
    atkVar: 3,
    agiVar: 2,
    armVar: 1,
    xpVar: 9,
    goldVar: [3, 5],
    eliteMult: 1.5,
    bossMult: 2,
    eventMult: 1.75,

    hpMods: {
      glass: 0.75,
      beefy: 1.3,
      armored: 1.2
    },

    armMods: {
      thickSkin: 1.33,
      thinSkin: .66
    },
  
    goldMods: {
      loaded: 3
    },

    agiMods: {
      swift: 2,
      sluggish: 0.75
    }
  };
  
  function generateStats(level, rarity = 'base', traits = []) {
    let rarityMult =
      rarity === 'event' ? SCALING.eventMult :
      rarity === 'elite' ? SCALING.eliteMult :
      rarity === 'boss' ? SCALING.bossMult : 1;
  
    let hpMult = rarityMult;
    let goldMult = rarityMult;
    let atkMult = rarityMult;
    let agiMult = rarityMult;
    let armMult = rarityMult;
    //checks if traits were imported properly
    //console.log('traits:', traits);

    const allTraits = traits || [];
  
    allTraits.forEach(t => {
      if (SCALING.hpMods[t]) hpMult *= SCALING.hpMods[t];
      if (SCALING.goldMods[t]) goldMult *= SCALING.goldMods[t];
      // You can add atkMods, xpMods, etc. later
    });

    //checks what goldMult is now
    //console.log('goldMult:', goldMult);
  
    return {
      level,
      maxHP: Math.round(15 + level * SCALING.stamVar * hpMult),
      attack: parseFloat((level * SCALING.atkVar * atkMult).toFixed(1)),
      agility: Math.round(level * SCALING.agiVar * agiMult),
      armor: Math.round(level * SCALING.armVar * armMult),
      critChance: 0.05 + (rarity === 'elite' ? 0.02 : rarity === 'boss' ? 0.04 : 0),
      goldDrop: [
        Math.floor(level * SCALING.goldVar[0] * goldMult),
        Math.floor(level * SCALING.goldVar[1] * goldMult)
      ],
      xpDrop: Math.floor(level * SCALING.xpVar * rarityMult),
      traits
    };
  }
  
  module.exports = {
    SCALING,
    generateStats
  };
  