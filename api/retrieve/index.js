var scrapeTeamData = require('./scrape_team_data.js');
var mongoData = require('../mongo/index.js');

// Start the process of scraping/storing the team data
// when the server starts up
console.log('Scraping team data for storage...');
scrapeTeamData()
.then(function(teamData) {
  console.log('Team data scraped successfully!  Storing...');
  return mongoData.storeTeamData(teamData)
})
.done(
  function() {
    console.log('Team data stored successfully!');
  },
  function(err) {
    throw err;
  }
);

var addRetrieveEndpoints = function(express) {
  var router = express.Router();

  router.get('/', function(req, res) {
    mongoData.getTeamData()
    .done(
      function(teamData) {
        res.status(200).json({
          data: teamData
        });
      },
      function(err) {
        res.status(500).json({
          err: err,
          message: 'Something went wrong!'
        });
      }
    );
  });

  return router;
};

module.exports = addRetrieveEndpoints;
