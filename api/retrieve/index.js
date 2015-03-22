var Q = require('q');
var getTeamDataPromise = require('./get_team_data.js')

var addRetrieveEndpoints = function(express) {
  var router = express.Router();

  router.get('/', function(req, res) {
    getTeamDataPromise
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
    )

  });

  return router;
};

module.exports = addRetrieveEndpoints;
