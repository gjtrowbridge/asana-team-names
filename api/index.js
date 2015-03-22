var addRetrieveEndpoints = require('./add_retrieve_endpoints.js');

var addApiEndpoints = function(express) {
  var api = express.Router();

  api.use('/retrieve', addRetrieveEndpoints(express));

  return api;
};

module.exports = addApiEndpoints;
