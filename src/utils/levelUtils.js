
function getXPForLevel(level) {
  // XP required increases non-linearly
  return Math.floor(50 * Math.pow(level, 1.5));
}

function addXP(profile, amount) {
  if (!profile.levelXP) {
    profile.levelXP = {
      current: 0,
      needed: getXPForLevel(profile.level)
    };
  }

  profile.levelXP.current += amount;
  let leveledUp = false;

  while (profile.levelXP.current >= profile.levelXP.needed) {
    profile.levelXP.current -= profile.levelXP.needed;
    profile.level += 1;
    leveledUp = true;
    profile.levelXP.needed = getXPForLevel(profile.level);
  }

  return { leveledUp, newLevel: profile.level };
}

module.exports = {
  getXPForLevel,
  addXP
};
