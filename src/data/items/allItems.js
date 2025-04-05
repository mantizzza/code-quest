const consumables = require('./consumables.js');
const equipment = require('./equipment.js');

module.exports = {
  ...consumables,
  ...equipment
  // Add more categories as needed
};
