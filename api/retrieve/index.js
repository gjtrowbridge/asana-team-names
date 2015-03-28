var Q = require('q');
var getTeamDataPromise = require('./get_team_data.js')

var addRetrieveEndpoints = function(express) {
  var router = express.Router();
  var teamData;

  router.get('/', function(req, res) {
    if (teamData) {
      res.status(200).json({
        data: teamData
      });
    } else {
      getTeamDataPromise
      .done(
        function(result) {
          teamData = result;
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
    }

  });

  return router;
};

module.exports = addRetrieveEndpoints;
