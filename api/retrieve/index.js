var scrapeTeamData = require('./scrape_team_data.js');
var mongoData = require('../mongo/index.js');

// Start the process of scraping/storing the team data
// when the server starts up
scrapeTeamData()
.done(
  mongoData.storeTeamData,
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
