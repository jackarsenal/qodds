const express = require('express');
const { HorseRacingAPI } = require('hkjc-api');
const app = express();
const horseAPI = new HorseRacingAPI();

app.use(express.json()); // Add this middleware

// Test route first
app.get('/', (req, res) => {
  res.json({ status: 'HKJC Odds API working!', endpoint: '/odds' });
});

// Main odds route - FIXED PATH
app.get('/odds', async (req, res) => {
  try {
    let allOdds = {};
    for (let race = 1; race <= 11; race++) {
      console.log(`Fetching Race ${race}...`);
      const odds = await horseAPI.getRaceOdds(race, ['QIN']);
      allOdds[`Race_${race}`] = odds;
    }
    res.json(allOdds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch odds', details: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log('✅ Test: https://your-repl-url.repl.co');
  console.log('✅ Odds: https://your-repl-url.repl.co/odds');
});
