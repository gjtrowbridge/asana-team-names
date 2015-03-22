var Q = require('q');
var cheerio = require('cheerio');
var request = require('request');

var teamDataUrl = 'http://www.asana.com/team';
var retrieving = false;

var addRetrieveEndpoints = function(express) {
  var router = express.Router();

  router.post('/', function(req, res) {
    if (!retrieving) {
      retrieving = true;

      request(teamDataUrl, function(err, response, html) {
        if (err) {
          throw err;
        } else {
          res.send(html);
        }
      });
    }
  });

  return router;
};

module.exports = addRetrieveEndpoints;
