var React = require('react');
var Person = require('../person/Person.jsx');
var LoadingScreen = require('../loading_screen/LoadingScreen.jsx');

var Page = React.createClass({
  retrieveTeamData: function() {
    console.log('retrievings');
  },
  getInitialState: function() {
    return {
      loaded: false
    };
  },
  render: function() {
    this.retrieveTeamData();
    var mainScreen;
    if (this.state.loaded) {
      mainScreen = <Person />
    } else {
      mainScreen = <LoadingScreen />
    }
    return (
      <div className="col-2-4">
        <h1>Asanames</h1>
        {mainScreen}
      </div>
    );
  }
});

module.exports = Page;

