const https = require('https');
const fs = require('fs');

// Fetch odds data from HKJC
function fetchOdds(date, venue, race) {
  return new Promise((resolve, reject) => {
    const url = `https://bet.hkjc.com/ch/racing/wpq/${date}/${venue}/${race}`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getAllOdds() {
  const today = new Date().toISOString().split('T')[0]; // Today's date
  const venue = 'HV'; // Happy Valley
  let allOdds = {};
  
  try {
    for (let race = 1; race <= 11; race++) {
      console.log(`Fetching Race ${race}...`);
      try {
        const odds = await fetchOdds(today, venue, race);
        allOdds[`Race_${race}`] = odds;
      } catch (e) {
        console.log(`Race ${race} not available`);
      }
    }
    
    // Save to odds.json
    fs.writeFileSync('odds.json', JSON.stringify(allOdds, null, 2));
    console.log('✅ Odds updated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

getAllOdds();
