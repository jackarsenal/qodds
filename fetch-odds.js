const { HorseRacingAPI } = require('hkjc-api');
const fs = require('fs');

const horseAPI = new HorseRacingAPI();

async function getAllOdds() {
  try {
    let allOdds = {};
    
    for (let race = 1; race <= 11; race++) {
      console.log(`Fetching Race ${race}...`);
      try {
        const odds = await horseAPI.getRaceOdds(race, ['QIN']);
        allOdds[`Race_${race}`] = odds;
      } catch (e) {
        console.log(`Race ${race} not available:`, e.message);
      }
    }
    
    // Save to odds.json
    fs.writeFileSync('odds.json', JSON.stringify(allOdds, null, 2));
    console.log('✅ Odds updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getAllOdds();
